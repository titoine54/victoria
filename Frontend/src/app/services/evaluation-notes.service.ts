import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { ApiService } from "app/services/api.service";

@Injectable()
export class EvaluationNotesService {

    /**  */
    constructor(private global: GlobalVariablesService, private router: Router, private api: ApiService) { }

    /** Get an Evaluation object
     * @param {string} evaluationTitle The title of the selected evaluation
     * @return {Evaluation} The Evaluation object corresponding to the evaluation title
     */
    getSelectedEvaluation(evaluationTitle: string): Evaluation {
        if (this.global.evaluations && evaluationTitle) {
            var selectedEvaluation = this.global.evaluations.find(x => x.titre == evaluationTitle);

            if (!selectedEvaluation) {
                this.router.navigate(['/404']);
            }

            return selectedEvaluation;
        }
        return null;
    }

    /** Tell the server that an notification has been viewed
     * @param {Evaluation} evaluation The selected "Evaluation"
     */
    dismissAssociatedNotification(evaluation: Evaluation) {
        if (evaluation) {
            for (let nouvelle of this.global.nouvelles) {
                if (nouvelle.evaluationId == evaluation.evaluationId) {
                    console.log(`Dismissing evaluation "${evaluation.titre}"...`);
                    this.api.markNotificationAsRead(nouvelle.notificationId).subscribe(
                        (data: any) => evaluation.estNouveau = false
                    );
                }
            }
        }
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
            accumulatedPoints: null,
            groupMean: 0,
            standardDeviation: 0,
        }
        for (let e of evaluation.associatedAps[apCode]) {
            apStats.groupMean += +e.moyenne;
            apStats.accumulatedTotals += +e.ponderation;            
            apStats.standardDeviation = Math.sqrt(Math.pow(apStats.standardDeviation, 2) + Math.pow(+e.ecartType, 2));

            if (e.note) {
                apStats.accumulatedPoints += +e.note;
            }
        }
        apStats.groupMean = +(apStats.groupMean.toFixed(2));
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
            accumulatedPoints: null,
            groupMean: 0,
            standardDeviation: 0,
        }
        for (var apCode in evaluation.associatedAps) {
            var apStats = this.getApStats(apCode, evaluation);

            if (apStats.accumulatedPoints) {
                evaluationStats.accumulatedPoints += +apStats.accumulatedPoints;
            }
            
            evaluationStats.groupMean += +apStats.groupMean;
            evaluationStats.accumulatedTotals += +apStats.accumulatedTotals;
            evaluationStats.standardDeviation = Math.sqrt(Math.pow(evaluationStats.standardDeviation, 2) + Math.pow(+apStats.standardDeviation, 2));
        }
        evaluationStats.groupMean = +(evaluationStats.groupMean.toFixed(2));
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