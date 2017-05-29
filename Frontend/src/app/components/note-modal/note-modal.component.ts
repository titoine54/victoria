import { Component, EventEmitter } from "@angular/core"
import { MaterializeAction } from "angular2-materialize";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { GlobalVariablesService } from "app/services/global-variables/global-variables.service";

@Component({
    selector: "app-modal",
    templateUrl: './note-modal.component.html',
})

export class NoteModalComponent {

    modalActions = new EventEmitter<string | MaterializeAction>();
    evaluation: Evaluation;

    constructor(private global: GlobalVariablesService) { }

    getSelectedAp(apCode) {
        return this.global.apList.filter(function (obj) {
            return obj.apCode == apCode;
        })[0];
    }

    getCompetenceDescription(apCode, competenceNumber) {
        var selectedAp = this.getSelectedAp(apCode);
        var competenceDescription = selectedAp.competences.filter(function (obj) {
            return obj.competenceNumero == competenceNumber;
        })[0];
        return competenceDescription ? competenceDescription.description : null;
    }

    show(evaluation) {
        this.evaluation = evaluation;
        console.log(evaluation);
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    hide() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

}