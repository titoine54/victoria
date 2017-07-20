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

    /**  Get the evaluation details 
    * @return {Evaluation} The selected evaluation
    */
    getEvaluation() {
        return this.notesService.getSelectedEvaluation(this.evaluationTitle);
    }
    
    /** Detect clicks outside the modal
     * @param {Event} e the clicked event
     */
    onClickedOutside(e: Event) {
        if (e.srcElement.tagName.toLowerCase() !== 'a') { // Check if event target is hyperlink
            this.hide();
        }
    }

    /** Hide the modal */
    hide() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
        this.location.go('/notes');
    }

    /** Show the modal
     * @param {string} evaluationTitle The title of the selected evaluation
     */
    show(evaluationTitle: string) {
        this.evaluationTitle = evaluationTitle;
        var evaluation = this.notesService.getSelectedEvaluation(evaluationTitle);

        if (evaluation) {
            this.notesService.dismissAssociatedNotification(evaluation);
            this.modalActions.emit({ action: "modal", params: ['open'] });
        }
    }

}