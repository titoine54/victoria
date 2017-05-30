import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Competence } from "app/classes/competence";


@Pipe({
  name: 'getCompetenceTotal'
})
export class GetCompetenceTotalPipe implements PipeTransform {

  /** Calculates the total of a selected Ap from its associated Notes
   * @param {Competence} Comp The "Compétence" to cumulate
   * @param {Evaluation[]} evaluations The list of all evaluations
   * @return {string} The compiled value
   */

  transform(competence: Competence, evaluations: Evaluation[]): any {
    var total = 0;
    var noteTotal = 0;

    for (let evaluation of evaluations) {
      for (var apCode in evaluation.associatedAps) {
        for (let note of evaluation.associatedAps[apCode]) {
          if (competence.competenceNumero == note.competenceNumero) {
            total += note.ponderation;
            noteTotal += note.note;
          }
        }
      }
    }

    if (noteTotal <= 0) {
      return "--/" + total;
    }
    else {
      return noteTotal + "/" + total + " (" + Math.round((noteTotal / total) * 100) + "%)";
    }
  }
}
