import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { GlobalVariablesService } from "app/services/global-variables.service";
import { SettingsModalComponent } from "app/components/settings-modal/settings-modal.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  useBlackIcon: boolean = false;

  constructor(public global: GlobalVariablesService) { }

  @ViewChild(SettingsModalComponent) settingsModal: SettingsModalComponent

  @HostListener('window:resize') onResize() {
    var header = document.getElementById('navBar').parentElement.parentElement;
    this.useBlackIcon = (header.offsetHeight > 100);
  }

}
