import { Component } from '@angular/core';
import { ApiService } from "app/services/api.service";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { environment } from '../environments/environment';
import { User } from "app/classes/user";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Dict } from "app/classes/dict.interface";
declare var Materialize: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();

  constructor(private apiService: ApiService, public global: GlobalVariablesService) {
    apiService.getUserData().subscribe(
      (data: any) => {
        global.user = new User(data.cip, data.firstName, data.lastName, data.email, data.settings);
        this.loadUserNotes();
      },
      err => {
        if (environment.production) {
          Materialize.toast('Impossible de télécharger les données de l\'utilisateur', 4000);
        } else {
          this.openWebsiteForLogin();
        }
      });
  }

  loadUserNotes() {
    this.apiService.getNotes().subscribe(
      (data: any) => {
        this.global.apList = [];
        this.global.evaluations = [];
        for (let ap of data.aps) {
          this.global.apList.push(new Ap(ap.apCode, ap.titre, ap.competences, ap.description, ap.credit));
        }

        for (let e of data.evaluations) {
          var associatedAps: Dict<Note[]> = {};
          for (let a of e.activites) {
            var apCode = Object.keys(a)[0];
            associatedAps[apCode] = a[apCode];
          }
          this.global.evaluations.push(new Evaluation(e.nom, associatedAps));
        }
      },
      err => Materialize.toast('Impossible de télécharger les notes de l\'utilisateur', 4000));
  }

  openWebsiteForLogin() {
    Materialize.toast('Veuillez vous connecter sur le site afin d\'activer la communication.', 10000);
    var url = 'https://s6ie1704.gel.usherbrooke.ca';
    var icon = '<i class="material-icons">launch</i>';
    Materialize.toast(`<a href="${url}" target="_blank">${icon}Cliquez ici pour vous connecter</a>, puis revenez sur cette onglet.`, 10000);
  }
}
