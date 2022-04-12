import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(
    private contactService: ContactsService,
  ) {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data as Contact[];
      this.contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
    })
  }

  ngOnInit(): void {
  }

}
