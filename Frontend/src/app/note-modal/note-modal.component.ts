import { Component, OnInit, Input, EventEmitter } from "@angular/core"
import { MaterializeAction } from "angular2-materialize";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";

@Component({
    selector: "app-modal",
    templateUrl: './note-modal.component.html',
})

export class NoteModalComponent implements OnInit {

    modalActions = new EventEmitter<string | MaterializeAction>();
    evaluation: Evaluation;
    apList: Ap[];

    getSelectedAp(apCode) {
        return this.apList.filter(function (obj) {
            return obj.ap_code == apCode;
        })[0];
    }

    getCompetenceDescription(apCode, competenceNumber) {
        var selectedAp = this.getSelectedAp(apCode);
        var competenceDescription = selectedAp.competences.filter(function (obj) {
            return obj.competence_numero == competenceNumber;
        })[0];
        return competenceDescription ? competenceDescription.description : null;
    }

    show(evaluation, apList) {
        this.evaluation = evaluation;
        this.apList = apList;
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    hide() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    ngOnInit() {
    }

}