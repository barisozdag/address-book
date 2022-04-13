import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactsService } from '../contacts.service';
import Utils from '../utils';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  contact: Contact | undefined;
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contactService.getContact(id).subscribe((data: Contact) => {
        this.contact = data;
      });
    }
  }

  ngOnInit(): void {
  }

  formatPhone(phoneNumber: string) {
    return Utils.formatPhone(phoneNumber);
  }

}
