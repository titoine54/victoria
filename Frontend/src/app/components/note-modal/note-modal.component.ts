import { Component, EventEmitter } from "@angular/core"
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
    evaluation: Evaluation;

    constructor(private global: GlobalVariablesService, private notesService: EvaluationNotesService) {}

    /** TODO: Complete this header
     * @param {Evaluation} evaluation ???
     */
    show(evaluation: Evaluation) {
        this.evaluation = evaluation;
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    /** TODO: Complete this header */
    hide() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

}