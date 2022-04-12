import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './material.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AvatarInitialsComponent } from './avatar-initials/avatar-initials.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AvatarInitialsComponent,
    ContactInfoComponent,
    TitlebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
