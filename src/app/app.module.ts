import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { FocusDirective } from './note/focus.directive';
import { HomeComponent } from './home/home.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { ClockComponent } from './clock/clock.component';
import { ContactFormTdComponent } from './contact-form-td/contact-form-td.component';
import { ContactFormRComponent } from './contact-form-r/contact-form-r.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    FocusDirective,
    HomeComponent,
    AllNotesComponent,
    NotFoundComponent,
    EditNoteComponent,
    ClockComponent,
    ContactFormTdComponent,
    ContactFormRComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
