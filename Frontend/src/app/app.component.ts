import { Component } from '@angular/core';
import { ApiService } from "app/services/api.service";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { User } from "app/classes/user";
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
        debugger
        //global.user = new User();
        this.loadUserNotes();
      },
      err => { console.log(err); Materialize.toast('Impossible de télécharger les données de l\'utilisateur', 4000)});
  }

  loadUserNotes() {
    this.apiService.getNotes().subscribe(
      (data: any) => {
        debugger
        //global.user = new User();
      },
      err => Materialize.toast('Impossible de télécharger les notes de l\'utilisateur', 4000));
  }
}
