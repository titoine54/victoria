import { Router } from '@angular/router';
import { GlobalVariablesService } from "app/services/global-variables.service";
import { MobileService } from "app/services/mobile.service";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";

@Component({
  selector: 'app-ap-competences',
  templateUrl: './ap-competences.component.html',
  styleUrls: ['./ap-competences.component.scss']
})
export class ApCompetencesComponent {
  gridLayout: string = 's12'; // Layout used for the placement of each competence

  private _ap;
  @Input()
  set ap(ap: Ap) {
    this.gridLayout = this.getBestGridLayout(ap.competences.length);
    this._ap = ap;
  }
  get ap(): Ap { return this._ap }

  @Output() onRequestNoteModal = new EventEmitter<Evaluation>();

  /** Get the best grid layout from the number of elements to show
   * @param {number} length The number of elements
   * @return {string} The best layout
   */
  getBestGridLayout(length: number) {
    var layout = 's12 ';
    layout += (length == 1 ? 'm12' : length == 2 ? 'm6' : length == 3 ? 'm4' : 'm6');
    return layout;
  }

  /** Show all the notes related to an evaluation
   * @param evaluation The clicked evaluation 
   */
  showEvaluationNotes(evaluation: Evaluation) {
    if (this.mobileService.mobileAndTabletcheck()) {
      this.router.navigate(['/note', evaluation.titre]);
    } else {
      this.onRequestNoteModal.emit(evaluation);
    }
  }
  
  constructor(private global: GlobalVariablesService, private mobileService: MobileService, private router: Router) { }

}
