import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from "app/classes/evaluation";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { EvaluationNotesService } from "app/services/evaluation-notes.service";
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements AfterViewChecked {
  @ViewChild(NoteModalComponent)

  noteModal: NoteModalComponent
  evaluationTitle: string;

  constructor(private global: GlobalVariablesService, private notesService: EvaluationNotesService, private route: ActivatedRoute, private router: Router) {}

  ngAfterViewChecked() {
    this.evaluationTitle = undefined;
    var url = location.pathname;

    if (url.indexOf('note/') != -1) {
      this.evaluationTitle = (url.split('note/').pop().trim().replace(/%20/g, " "));
      this.noteModal.show(this.evaluationTitle);
    }
  }

  updateCollapsible() {
    if (this.global.searchValue != '') {
      setTimeout(function () {
        $(".collapsible-header").addClass("active");
        $(".collapsible").collapsible({ accordion: false });
      }, 1500);
    }
  }
}
