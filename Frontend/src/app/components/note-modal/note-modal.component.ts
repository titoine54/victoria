import { Component, EventEmitter } from "@angular/core"
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterializeAction } from "angular2-materialize";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { EvaluationNotesService } from "app/services/evaluation-notes.service";

@Component({
    selector: "app-note-modal",
    templateUrl: './note-modal.component.html',
    styleUrls: ['./note-modal.component.scss']
})

export class NoteModalComponent {

    modalActions = new EventEmitter<string | MaterializeAction>();
    evaluationTitle: string;

    constructor(private global: GlobalVariablesService, private location: Location, private notesService: EvaluationNotesService, private router: Router) { }

    /** TODO: Complete this header
     * @param {Evaluation} evaluation ???
     */
    show(evaluationTitle: string) {
        this.evaluationTitle = evaluationTitle;
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    /** TODO: Complete this header */
    hide() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
        this.location.go('/notes');
    }

    getEvaluation() {
        return this.notesService.getSelectedEvaluation(this.evaluationTitle);
    }

}