import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";

@Pipe({
    name: 'hasNewEvaluation',
    pure: false
})
export class HasNewEvaluationPipe implements PipeTransform {

    /** Checks if there is any new evaluation
     * @param {Ap} Ap The selected "Activité Pédagogique"
     * @param {Evaluation[]} evaluations The list of all evaluations
     * @return {boolean} The compiled value
     */
    transform(ap: Ap, evaluations: Evaluation[]): boolean {
        for (let evaluation of evaluations) {
            for (var apCode in evaluation.associatedAps) {
                if (apCode === ap.apCode && evaluation.estNouveau) {
                    return true
                }
            }
        }
        return false;
    }
}