import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { Ap } from "app/classes/ap";
import { GlobalVariablesService } from "app/services/global-variables/global-variables.service";
import { Evaluation } from "app/classes/evaluation";

@Component({
  selector: 'app-ap-competences',
  templateUrl: './ap-competences.component.html',
  styleUrls: ['./ap-competences.component.css']
})
export class ApCompetencesComponent {

  @Input() ap: Ap;

  @Output() onRequestNoteModal = new EventEmitter<Evaluation>();

  constructor(private global: GlobalVariablesService) { }

}
