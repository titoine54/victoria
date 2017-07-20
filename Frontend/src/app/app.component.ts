import { Component } from '@angular/core';
import { ApiService } from "app/services/api.service";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { environment } from '../environments/environment';
import { User } from "app/classes/user";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Dict } from "app/classes/dict.interface";
import { Statistiques } from "app/classes/statistiques.interface";
import { Nouvelle } from "app/classes/nouvelle";
declare var Materialize: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();

  constructor(private apiService: ApiService, public global: GlobalVariablesService) {
    apiService.getUserData().subscribe(
      (data: any) => {
        global.user = new User(data.cip, data.firstName, data.lastName, data.email);
        this.loadUserNotes();
      },
      err => Materialize.toast('Une erreur s\'est produite lors du téléchargement des donnees de l\'utilisateur.', 4000));
  }

  loadUserNotes() {
    this.apiService.getNotes().subscribe(
      (data: any) => {
        this.global.apList = [];
        this.global.evaluations = [];
        this.global.nouvelles = [];

        for (let ap of data.aps) {
          this.global.apList.push(new Ap(ap.apCode, ap.titre, ap.competences, ap.description, ap.credit));
        }

        for (let e of data.evaluations) {
          this.global.evaluations.push(new Evaluation(e.nom, e.activites, e.evaluationId, e.estNouveau, e.individuel));
        }

        if (data.notifications) {
          for (let n of data.notifications) {
            this.global.nouvelles.push(new Nouvelle(n.notificationID, n.evaluationID, n.evaluationNom, n.descriptionNotification));
            var associatedEvaluation = this.global.evaluations.find(e => e.evaluationId == n.evaluationID);
            if (associatedEvaluation) {
              associatedEvaluation.estNouveau = true;
            }
          }
        }

        this.loadNotesStats();
      },
      err => {
        this.global.apList = [];
        Materialize.toast('Une erreur s\'est produite lors du téléchargement des notes.', 4000);
      });
  }

  loadNotesStats() {
    this.apiService.getStats().subscribe(
      (data: any) => {
        if (data.statistiques != undefined) {
          var stats: Statistiques[] = data.statistiques;
          for (let stat of stats) {
            loop:
            for (let evaluation of this.global.evaluations) {
              if (evaluation.evaluationId == stat.evaluationId) {
                for (var apCode in evaluation.associatedAps) {
                  if (apCode == stat.apCode) {
                    for (let note of evaluation.associatedAps[apCode]) {
                      if (note.competenceNumero == stat.competenceNumero) {
                        note.moyenne = stat.moyenne;
                        note.ecartType = stat.ecartType;
                        break loop;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.global.evaluations = [...this.global.evaluations];
      },
      err => {
        this.global.apList = [];
        Materialize.toast('Une erreur s\'est produite lors du téléchargement des notes.', 4000);
      });
  }
}
