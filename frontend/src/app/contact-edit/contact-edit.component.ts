import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/models/contact';
import { ContactsService } from '../contacts.service';
import Utils from '../utils';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent {

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    phones: this.fb.array([
      this.fb.control('', [Validators.required]),
    ]),
    mail: ['', [
      Validators.email,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]]
  });

  get phones() {
    return this.contactForm.get('phones') as FormArray;
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private contactService: ContactsService,
    private snackbar: MatSnackBar,
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contactService.getContact(id).subscribe((contact) => {
        for (let i = 1; i < contact.phones.length; i++) {
          this.addPhone();
          contact.phones[i] = Utils.formatPhone(contact.phones[i].toString());
        }
        this.contactForm.patchValue(contact);
      });
    }
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

    this.contactService.deleteContact('kasdjf')
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
    const parentControl = this.contactForm.controls[parent] as FormArray;
    return parentControl.controls[controlIndex].hasError(errorName);
  };

  submitForm() {
    if (!this.contactForm.valid) return;

    const id = this.actRoute.snapshot.paramMap.get('id');
    if (!id) return;

    if (!window.confirm('Are you sure you want to update?')) return;

    const contact = {...this.contactForm.value};

    contact.phones = contact.phones.map((phone: number | string) => {
      if (typeof phone === 'number')
        phone = phone.toString();
      return Number(phone.replace(/\D/g, '').substring(0, 10));
    });

    this.contactService.updateContact(id, contact)
      .subscribe({
        next: (res: Contact) => {
          this.snackbar.open(
            `Contact: '${res.name}' updated succesfully`,
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

}
