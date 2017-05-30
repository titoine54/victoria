import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from "app/services/global-variables.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private global: GlobalVariablesService) { }

  ngOnInit() {
  }

}
