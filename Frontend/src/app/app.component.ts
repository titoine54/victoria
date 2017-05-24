import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    $(document).ready(function () {
      $(".dropdown-button").dropdown({ belowOrigin: true, alignment: 'right', constrainWidth: false });
      $('.collapsible').collapsible();
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }

  title = 'app works!';
}
