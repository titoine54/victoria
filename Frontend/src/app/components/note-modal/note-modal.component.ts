import { Component, EventEmitter } from "@angular/core"
import { MaterializeAction } from "angular2-materialize";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { GlobalVariablesService } from "app/services/global-variables.service";

@Component({
    selector: "app-note-modal",
    templateUrl: './note-modal.component.html',
    styleUrls: ['./note-modal.component.scss']
})

export class NoteModalComponent {

    modalActions = new EventEmitter<string | MaterializeAction>();
    evaluation: Evaluation;

    constructor(private global: GlobalVariablesService) {}

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
     * @param {string} apCode The "Activité Pédagogique" to cumulate
     * @return {any} Return the evaluation AP statistics
     */
    getApStats(apCode: string) {
        var apStats = {
            accumulatedTotals: 0,
            accumulatedPoints: 0,
            groupMean: 0,
            note: 0,
            standardDeviation: 0,
        }
        for (let e of this.evaluation.associatedAps[apCode]) {
            apStats.groupMean += +e.moyenne;
            apStats.accumulatedTotals += +e.ponderation;
            apStats.accumulatedPoints += +e.note;
            apStats.standardDeviation = Math.sqrt(Math.pow(apStats.standardDeviation, 2) + Math.pow(+e.ecartType, 2));
        }
        apStats.note = +((apStats.accumulatedPoints/apStats.accumulatedTotals) * 100).toFixed(2);
        apStats.standardDeviation =  +(apStats.standardDeviation.toFixed(2));
        return apStats;
    }

    /** TODO: Complete this header
     * @return {any} Returns the evaluation overall statistics
     */
    getEvaluationStats() {
        var evaluationStats = {
            accumulatedTotals: 0,
            accumulatedPoints: 0,
            groupMean: 0,
            note: 0,
            standardDeviation: 0,
        }
        for (var apCode in this.evaluation.associatedAps) {
            var apStats = this.getApStats(apCode);
            evaluationStats.groupMean += +apStats.groupMean;
            evaluationStats.accumulatedPoints += +apStats.accumulatedPoints;
            evaluationStats.accumulatedTotals += +apStats.accumulatedTotals;
            evaluationStats.standardDeviation = Math.sqrt(Math.pow(evaluationStats.standardDeviation, 2) + Math.pow(+apStats.standardDeviation, 2));
        }
        evaluationStats.accumulatedPoints = +evaluationStats.accumulatedPoints.toFixed(2);
        evaluationStats.note = +((evaluationStats.accumulatedPoints/evaluationStats.accumulatedTotals) * 100).toFixed(2);
        evaluationStats.standardDeviation =  +(evaluationStats.standardDeviation.toFixed(2));
        return evaluationStats;
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