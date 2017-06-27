import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";

@Pipe({
    name: 'hasNewEvaluation'
})
export class HasNewEvaluationPipe implements PipeTransform {

    /** @deprecated Use hasNewEvaluation
     * 
     * Checks if there is any new evaluation
     * @param {Ap} Ap The selected "Activité Pédagogique"
     * @param {Evaluation[]} evaluations The list of all evaluations
     * @return {boolean} The compiled value
     */
    transform(ap: Ap, evaluations: Evaluation[]): boolean {
        var hasNewEval = false;
        for (let evaluation of evaluations) {
            for (var apCode in evaluation.associatedAps) {
                if (apCode === ap.apCode) {
                    if (!hasNewEval && evaluation.estNouveau) {
                        hasNewEval = true;
                    }
                }
            }
        }
        return hasNewEval;
    }
}