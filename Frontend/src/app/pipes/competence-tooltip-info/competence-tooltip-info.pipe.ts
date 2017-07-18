import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Competence } from "app/classes/competence";

@Pipe({
  name: 'CompetenceTooltipInfoPipe'
})
export class CompetenceTooltipInfoPipe implements PipeTransform {

  /** Calculates the total of a selected Ap from its associated Notes
    * @param {Competence} Comp The "Compétence" to cumulate
    * @param {Evaluation[]} evaluations The list of all evaluations
    * @return {string} The compiled value
    */

  transform(competence: Competence, evaluations: Evaluation[], code: string): string {
    var total = 0;
    var moyenneTotal = 0;
    var leftPoints = 0;
    for (let evaluation of evaluations) {
      for (var apCode in evaluation.associatedAps) {
        for (let note of evaluation.associatedAps[apCode]) {
          if (competence.competenceNumero == note.competenceNumero && apCode == code) {
            if (note.note == null) {
              leftPoints += +note.ponderation;
            }
            else {
              total += +note.ponderation;
              moyenneTotal += +note.moyenne;
            }
          }
        }
      }
    }

    if (moyenneTotal <= 0) {
      return "Points restants: " + leftPoints;
    }
    
    moyenneTotal = +moyenneTotal.toFixed(2);
    if (leftPoints > 0) {
      return "Moyenne: " + moyenneTotal + "/" + total + ", Points à combler: " + leftPoints;
    }
    else {
      return "Moyenne: " + moyenneTotal + "/" + total + ", Note complète.";
    }
  }
}
