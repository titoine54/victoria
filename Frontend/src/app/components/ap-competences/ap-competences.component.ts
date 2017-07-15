import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { GlobalVariablesService } from "app/services/global-variables.service";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";
import { isDesktopScreen } from 'app/utility/utility'

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

  @Output() onRequestNoteModal = new EventEmitter<string>();

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
   * @param evaluation The selected evaluation 
   */
  showEvaluationNotes(evaluationTitle: string) {
    if (!isDesktopScreen) {
      this.router.navigate(['/m/note', evaluationTitle]);
    } else {
      this.location.replaceState('/note/' + evaluationTitle);
      this.onRequestNoteModal.emit(evaluationTitle);
    }
  }

  constructor(private global: GlobalVariablesService, private location: Location, private router: Router) { }

}
