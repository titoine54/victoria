import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from "angular2-materialize";
import { AppComponent } from './app.component';
import { GetCompetenceTotalPipe } from "app/pipes/get-competence-total/get-competence-total.pipe";
import { MainComponent } from "app/views/main/main.component";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { PageNotFoundComponent } from "app/views/page-not-found/page-not-found.component";
import { NavbarComponent } from "app/components/navbar/navbar.component";
import { ApCompetencesComponent } from "app/components/ap-competences/ap-competences.component";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { KeysPipe } from "app/pipes/keys/keys.pipe";
import { CompetenceTooltipInfoPipe } from "app/pipes/competence-tooltip-info/competence-tooltip-info.pipe";
import { ApiService } from "app/services/api.service";
import { HasNewEvaluationPipe } from "app/pipes/has-new-evaluation/has-new-evaluation.pipe";
import { LoadingComponent } from "app/components/loading/loading.component";
import { WithApStatsPipe } from "app/pipes/with-ap-stats/with-ap-stats.pipe";
import { FilterApsPipe } from "app/pipes/filter-aps/filter-aps.pipe";

const appRoutes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: MainComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NoteModalComponent,
    NavbarComponent,
    PageNotFoundComponent,
    GetCompetenceTotalPipe,
    ApCompetencesComponent,
    KeysPipe,
    CompetenceTooltipInfoPipe,
    HasNewEvaluationPipe,
    LoadingComponent,
    WithApStatsPipe,
    FilterApsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService, GlobalVariablesService, NoteModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }