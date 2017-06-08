import { Component, EventEmitter } from "@angular/core"
import { MaterializeAction } from "angular2-materialize";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { GlobalVariablesService } from "app/services/global-variables.service";

@Component({
    selector: "app-note-modal",
    templateUrl: './note-modal.component.html',
    styleUrls: ['./note-modal.component.css']
})

export class NoteModalComponent {

    modalActions = new EventEmitter<string | MaterializeAction>();
    evaluation: Evaluation;

    constructor(private global: GlobalVariablesService) { }

    /** TODO: Complete this header
     * @param {string} apCode ???
     * @return {unknown} ???
     */
    getSelectedAp(apCode: string) {
        return this.global.apList.filter(function (obj) {
            return obj.apCode == apCode;
        })[0];
    }

    /** TODO: Complete this header
     * @param {string} apCode ???
     * @param {number} competenceNumber ???
     * @return {unknown} ???
     */
    getCompetenceDescription(apCode: string, competenceNumber: number) {
        var selectedAp = this.getSelectedAp(apCode);
        var competenceDescription = selectedAp.competences.filter(function (obj) {
            return obj.competenceNumero == competenceNumber;
        })[0];
        return competenceDescription ? competenceDescription.description : null;
    }


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