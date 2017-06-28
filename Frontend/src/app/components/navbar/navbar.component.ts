import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { GlobalVariablesService } from "app/services/global-variables.service";
import { SettingsModalComponent } from "app/components/settings-modal/settings-modal.component";
import { environment } from '../../../environments/environment';
import { Dict } from "app/classes/dict.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDevEnv: boolean = !environment.production;
  useBlackIcon: boolean = false;
  selectOptions: string[] = ['Trimestre e17', 'Trimestre a16', 'Trimestre h17'];

  constructor(public global: GlobalVariablesService) { }

  @ViewChild(SettingsModalComponent) settingsModal: SettingsModalComponent

  @HostListener('window:resize') onResize() {
    var header = document.getElementById('navBar').parentElement.parentElement;
    this.useBlackIcon = (header.offsetHeight > 100);
  }

  /** Select a new trimestre to show
   * @param {Dict<string>} trimestre The trimestre to fetch data from
   */
  selectTrimestre(trimestre: Dict<string>) {
    console.log(trimestre);
  }
}
