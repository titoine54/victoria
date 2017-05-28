import { Pipe, PipeTransform } from '@angular/core';
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";

@Pipe({
  name: 'getApTotal'
})
export class GetApTotalPipe implements PipeTransform {

  /** Calculates the total of a selected Ap from its associated Notes
   * @param {Ap} Ap The "Activité Pédagogique" to cumulate
   * @param {Evaluation[]} evaluations The list of all evaluations
   * @return {string} The compiled value
   */
  transform(ap: Ap, evaluations: Evaluation[]): any {
    var total = 0;
    var noteTotal = 0;
    var isFinal = true;

    for (let evaluation of evaluations) {
      for (let note of evaluation.notes) {
        if (ap.ap_code == note.ap_code) {
          total += note.ponderation;
          if (note.note) {
            noteTotal += note.note;
          }
          else isFinal = false;
        }
      }
    }

    if (noteTotal <= 0) {
      return "-- /" + total;
    }
    else if (isFinal == true) {
      return noteTotal + "/" + total + " (" + Math.round((noteTotal / total) * 100) + "%)";
    }
    else {
      return noteTotal + "/" + total;
    }
  }

}
