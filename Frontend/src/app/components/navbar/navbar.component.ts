import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalVariablesService } from "app/services/global-variables.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  useBlackIcon: boolean = false;
  
  constructor(public global: GlobalVariablesService) { }

  @HostListener('window:resize')onResize() {
    var header = document.getElementById('navBar').parentElement.parentElement;
    this.useBlackIcon = (header.offsetHeight > 100);
  }
}
