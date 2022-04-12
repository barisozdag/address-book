import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact/add', component: ContactAddComponent },
  { path: 'contact/:id', component: ContactInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
