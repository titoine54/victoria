import { Component, OnInit, ViewChild } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { Competence } from "app/classes/competence";
import { GlobalVariablesService } from "app/services/global-variables.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {

  @ViewChild(NoteModalComponent)
  private noteModal: NoteModalComponent;

  constructor(private global: GlobalVariablesService) { }

  ngOnInit() { }

}
