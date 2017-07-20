import { Component, OnInit, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalVariablesService } from "app/services/global-variables.service";
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Dict } from "app/classes/dict.interface";
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  isDevEnv: boolean = !environment.production;
  useBlackIcon: boolean = false;
  selectOptions: string[] = ['Trimestre e17', 'Trimestre a16', 'Trimestre h17'];

  constructor(public global: GlobalVariablesService, private router: Router) { }

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

  /** Toggle search bar */
  toggleSearchBar() {
    this.global.showSearchBar = !this.global.showSearchBar;
    if (!this.global.showSearchBar) {
      this.global.searchValue = '';
    }
  }

  ngAfterViewInit(): void {
    $('.button-collapse').sideNav({
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens
    });
  }
}
