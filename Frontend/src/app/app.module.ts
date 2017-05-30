import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from "angular2-materialize";
import { AppComponent } from './app.component';
import { GetApTotalPipe } from "app/pipes/get-ap-total/get-ap-total.pipe";
import { MainComponent } from "app/views/main/main.component";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { PageNotFoundComponent } from "app/views/page-not-found/page-not-found.component";
import { NavbarComponent } from "app/components/navbar/navbar.component";
import { GradesComponent } from "app/views/grades/grades.component";
import { ApCompetencesComponent } from "app/components/ap-competences/ap-competences.component";
import { GlobalVariablesService } from "app/services/global-variables/global-variables.service";
import { KeysPipe } from "app/pipes/keys/keys.pipe";

const appRoutes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: MainComponent },
  { path: 'grades', component: GradesComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NoteModalComponent,
    NavbarComponent,
    PageNotFoundComponent,
    GradesComponent,
    GetApTotalPipe,
    ApCompetencesComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GlobalVariablesService, NoteModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
