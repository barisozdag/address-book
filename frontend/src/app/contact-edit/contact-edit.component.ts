import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactsService } from '../contacts.service';
import { SearchService } from '../search.service';
import Utils from '../utils';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent {

  contactForm: UntypedFormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    address: [null, [Validators.required, Validators.minLength(5)]],
    phones: this.fb.array([
      this.fb.control(null, [Validators.required]),
    ]),
    mail: [null, [
      Validators.email,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]]
  });

  contact?: Contact;
  nameValue$ = new Subject<string>();
  nameControl: UntypedFormControl;

  get phones() {
    return this.contactForm.get('phones') as UntypedFormArray;
  }

  constructor(
    public fb: UntypedFormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private contactService: ContactsService,
    private searchService: SearchService,
    private snackbar: MatSnackBar,
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contactService.getContact(id).subscribe((contact) => {
        this.contact = contact;
        for (let i = 1; i < contact.phones.length; i++) {
          this.addPhone();
          contact.phones[i] = Utils.formatPhone(contact.phones[i].toString());
        }
        this.contactForm.patchValue(contact);
      });
    }

    this.nameControl = this.contactForm.get('name') as UntypedFormControl;
    this.nameControl.valueChanges
      .subscribe((value) => {
        if (this.contact?.name === value) return;
        this.nameValue$.next(value);
      });

    this.searchService.check(this.nameValue$)
      .subscribe((result: Object) => {
        const r = result as { found: boolean };
        if (r.found)
          this.nameControl.setErrors({ notUnique: true });
      });
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  del() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete?')) return;

    this.contactService.deleteContact(id)
      .subscribe({
        next: (res: Contact) => {
          this.snackbar.open(
            `Contact: '${res.name}' deleted succesfully`,
            undefined,
            {
              duration: 3000,
              verticalPosition: 'top',
            }
          );
        },
        error: (err) => {
          this.snackbar.open(
            `Error: '${err}'`,
            undefined,
            {
              duration: 3000,
              verticalPosition: 'top',
            }
          );
        },
        complete: () => {
          this.router.navigateByUrl('/');
        }
      });
  }

  public handleError = (controlName: string, errorName: string) => {
    const dotIndex = controlName.indexOf('.');

    if (dotIndex < 0)
      return this.contactForm.controls[controlName].hasError(errorName);

    const parent = controlName.substring(0, dotIndex);
    const controlIndex = Number(controlName.substring(dotIndex + 1));
    const parentControl = this.contactForm.controls[parent] as UntypedFormArray;
    return parentControl.controls[controlIndex].hasError(errorName);
  };

  submitForm() {
    if (!this.contactForm.valid) return;

    const id = this.actRoute.snapshot.paramMap.get('id');
    if (!id) return;

    if (!window.confirm('Are you sure you want to update?')) return;

    const contact = {...this.contactForm.value};

    contact.phones = contact.phones.map((phone: string) => phone.replace(/\D/g, '').substring(0, 10));

    this.contactService.updateContact(id, contact)
      .subscribe({
        next: (res) => {
          if (res.errors !== undefined) {
            res.errors.forEach((error: string) => {
              this.snackbar.open(
                `Error: '${error}'`,
                undefined,
                {
                  duration: 3000,
                  verticalPosition: 'top',
                }
              );
            })
          } else {
            this.snackbar.open(
              `Contact '${res.name}' successfully updated`,
              undefined,
              {
                duration: 3000,
                verticalPosition: 'top',
              }
            );
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => {
          this.snackbar.open(
            `Error: '${err}'`,
            undefined,
            {
              duration: 3000,
              verticalPosition: 'top',
            }
          );
        }
      });
  }

}
