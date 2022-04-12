import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent {

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
    private fb: FormBuilder,
    private router: Router,
    private contactService: ContactsService,
  ) { }

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
    const parentControl = this.contactForm.controls[parent] as FormArray;
    return parentControl.controls[controlIndex].hasError(errorName);
  };

  submitForm() {
    if (!this.contactForm.valid) return;

    const contact = {...this.contactForm.value};

    contact.phones = contact.phones.map((phone: string) => Number(phone.replace(/\D/g, '').substring(0, 10)));

    this.contactService.addContact(contact).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/');
    });
  }

}
