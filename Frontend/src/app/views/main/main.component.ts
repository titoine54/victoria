import { Component, ViewChild } from '@angular/core';
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { GlobalVariablesService } from "app/services/global-variables.service";
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent {
  searchValue: string = '';
  @ViewChild(NoteModalComponent) noteModal: NoteModalComponent

  constructor(public global: GlobalVariablesService) { }

  updateCollapsible() {
    if (this.searchValue != '') {
      setTimeout(function () {
        $(".collapsible-header").addClass("active");
        $(".collapsible").collapsible({ accordion: false });
      }, 1500);
    }
  }
}
