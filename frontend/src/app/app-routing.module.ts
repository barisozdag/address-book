import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact/add', component: ContactAddComponent },
  { path: 'contact/:id', component: ContactInfoComponent },
  { path: 'contact/edit/:id', component: ContactEditComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
