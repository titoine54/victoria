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

class VisibleError extends Error {
  constructor(m: string) {
    super(m);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();

  constructor(private apiService: ApiService, public global: GlobalVariablesService) {
    (async () => {
      try {
        await this.loadUserData();
        await this.loadUserNotes();
        await this.loadNotesStats();
      }
      catch(err) {
        console.log(err);
        if (err instanceof VisibleError)
          this.global.errorMessage = err.message;
      }
    })();
  }

  async loadUserData() {
    try {
      let data = await this.apiService.getUserData().toPromise();
      this.global.user = new User(data.cip, data.firstName, data.lastName, data.email);
    }
    catch(err) {
      throw new Error('Une erreur s\'est produite lors du téléchargement des donnees de l\'utilisateur.');
    }
  }

  async loadUserNotes() {
    try {
      let data = await this.apiService.getNotes().toPromise();

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
    }
    catch(err) {
      this.global.apList = [];
      throw new VisibleError('Une erreur s\'est produite lors du téléchargement des notes.');
    }
  }

  async loadNotesStats() {
    try {
      let data = await this.apiService.getStats().toPromise();

      if (data.statistiques != undefined) {
        var stats: Statistiques[] = data.statistiques;
        for (let stat of stats) {
          let evals = this.global.evaluations.filter((ev) => ev.evaluationId == stat.evaluationId);
          if (evals.length == 0)
            continue;

          let aps = evals[0].associatedAps;
          let notes = aps[stat.apCode].filter((note) => note.competenceNumero == stat.competenceNumero);
          if (notes.length == 0)
            continue;

          let note = notes[0];
          note.moyenne = stat.moyenne;
          note.ecartType = stat.ecartType;
        }
      }
      this.global.evaluations = [...this.global.evaluations];
    }
    catch(err) {
      this.global.apList = [];
      throw new VisibleError('Une erreur s\'est produite lors du téléchargement des notes.');
    }
  }
}
