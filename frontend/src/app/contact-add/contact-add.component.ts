import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  nameValue$ = new Subject<string>();
  nameControl: FormControl;

  get phones() {
    return this.contactForm.get('phones') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contactService: ContactsService,
    private searchService: SearchService,
  ) {
    this.nameControl = this.contactForm.get('name') as FormControl;
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
