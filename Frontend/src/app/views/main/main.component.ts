import { Component, ViewChild } from '@angular/core';
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { GlobalVariablesService } from "app/services/global-variables.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent {

  @ViewChild(NoteModalComponent) noteModal: NoteModalComponent

  constructor(public global: GlobalVariablesService) { }

}
