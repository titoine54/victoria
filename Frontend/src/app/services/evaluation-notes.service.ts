import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { GlobalVariablesService } from "app/services/global-variables.service";

@Injectable()
export class EvaluationNotesService {

    /**  */
    constructor(private global: GlobalVariablesService, private router: Router) { }

    /** Get an Evaluation object
     * @param {string} evaluationTitle The title of the selected evaluation
     * @return {Evaluation} The Evaluation object corresponding to the evaluation title
     */
    getSelectedEvaluation(evaluationTitle: string): Evaluation {
        if (this.global.evaluations && evaluationTitle) {
            var selectedEvaluation = this.global.evaluations.find(x => x.titre == evaluationTitle);

            if (!selectedEvaluation) {
                this.router.navigate(['/notes']);
            }

            return selectedEvaluation;
        }
        return null;
    }

    /** Get an "Activité Pédagogique" object
     * @param {string} apCode The selected "Activité Pédagogique" code
     * @return {Ap} The AP object corresponding to the "Activité Pédagogique" code
     */
    public getSelectedAp(apCode: string): Ap {
        return this.global.apList.filter(function (obj) {
            return obj.apCode == apCode;
        })[0];
    }

    /** Get the stats of an "Activité Pédagogique"
     * @param {string} apCode The code of the "Activité Pédagogique" to cumulate
     * @return {any} Return the AP statistics
     */
    public getApStats(apCode: string, evaluation: Evaluation): any {
        var apStats = {
            accumulatedTotals: 0,
            accumulatedPoints: 0,
            groupMean: 0,
            note: 0,
            standardDeviation: 0,
        }
        for (let e of evaluation.associatedAps[apCode]) {
            apStats.groupMean += +e.moyenne;
            apStats.accumulatedTotals += +e.ponderation;
            apStats.accumulatedPoints += +e.note;
            apStats.standardDeviation = Math.sqrt(Math.pow(apStats.standardDeviation, 2) + Math.pow(+e.ecartType, 2));
        }
        apStats.accumulatedPoints = +apStats.accumulatedPoints.toFixed(2);
        apStats.note = +((apStats.accumulatedPoints / apStats.accumulatedTotals) * 100).toFixed(2);
        apStats.standardDeviation = +(apStats.standardDeviation.toFixed(2));
        return apStats;
    }

    /** Get the overall stats of an evaluation
     * @param {Evaluation} Evaluation The evaluation to cumulate
     * @return {any} Return the evaluation overall statistics
     */
    public getEvaluationStats(evaluation: Evaluation): any {
        var evaluationStats = {
            accumulatedTotals: 0,
            accumulatedPoints: 0,
            groupMean: 0,
            note: 0,
            standardDeviation: 0,
        }
        for (var apCode in evaluation.associatedAps) {
            var apStats = this.getApStats(apCode, evaluation);
            evaluationStats.groupMean += +apStats.groupMean;
            evaluationStats.accumulatedPoints += +apStats.accumulatedPoints;
            evaluationStats.accumulatedTotals += +apStats.accumulatedTotals;
            evaluationStats.standardDeviation = Math.sqrt(Math.pow(evaluationStats.standardDeviation, 2) + Math.pow(+apStats.standardDeviation, 2));
        }
        evaluationStats.accumulatedPoints = +evaluationStats.accumulatedPoints.toFixed(2);
        evaluationStats.note = +((evaluationStats.accumulatedPoints / evaluationStats.accumulatedTotals) * 100).toFixed(2);
        evaluationStats.standardDeviation = +(evaluationStats.standardDeviation.toFixed(2));
        return evaluationStats;
    }

    /** Get a competence description
     * @param {string} apCode The AP code to get a competence description
     * @param {number} competenceNumber The competence number to get a description
     * @return {string} The competence description
     */
    public getCompetenceDescription(apCode: string, competenceNumber: number): string {
        var selectedAp = this.getSelectedAp(apCode);
        var competenceDescription = selectedAp.competences.filter(function (obj) {
            return obj.competenceNumero == competenceNumber;
        })[0];
        return competenceDescription ? competenceDescription.description : null;
    }

}