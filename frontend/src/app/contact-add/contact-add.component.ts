import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ContactsService } from '../contacts.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent {

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
  nameValue$ = new Subject<string>();
  nameControl: UntypedFormControl;

  get phones() {
    return this.contactForm.get('phones') as UntypedFormArray;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private contactService: ContactsService,
    private searchService: SearchService,
    private snackbar: MatSnackBar,
  ) {
    this.nameControl = this.contactForm.get('name') as UntypedFormControl;
    this.nameControl.valueChanges
      .subscribe((value) => {
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

    const contact = {...this.contactForm.value};

    contact.phones = contact.phones.map((phone: string) => phone.replace(/\D/g, '').substring(0, 10));

    this.contactService.addContact(contact).subscribe((res) => {
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
        });
      } else {
        this.snackbar.open(
          `Contact '${contact.name}' successfully added`,
          undefined,
          {
            duration: 3000,
            verticalPosition: 'top',
          }
        );
        this.router.navigateByUrl('/');
      }
    });
  }

}
