import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";
import { Dict } from "app/classes/dict.interface";

@Pipe({
  name: 'getApStats'
})
export class GetApStatsPipe implements PipeTransform {

  /** @deprecated Use getApStats
   * 
   * Calculates the total of a selected Ap from its associated Notes
   * @param {Ap} Ap The "Activité Pédagogique" to cumulate
   * @param {Evaluation[]} evaluations The list of all evaluations
   * @return {any} The compiled value
   */
  transform(ap: Ap, evaluations: Evaluation[]): Dict<any> {
    var output = {
      points: 0,
      total: 0,
      percent: '',
      remaining: 0,
      remainingPercent: '',
      string: ''
    };

    for (let evaluation of evaluations) {
      for (var apCode in evaluation.associatedAps) {
        for (let note of evaluation.associatedAps[apCode]) {
          if (ap.apCode == apCode) {
            output.total += +note.ponderation;
            output.points += +note.note;
            if (note.note == null) {
              output.remaining += +note.ponderation;
            }
          }
        }
      }
    }

    if (output.total > 0) {
      output.points = Math.round(output.points * 100) / 100;
      output.percent = Math.round((output.points / output.total) * 100) + '%';
      output.string = `${output.points}/${output.total} (${output.percent})`;
      output.remainingPercent = Math.round((output.total/(output.total+output.remaining)) * 100) + '%';
    } else {
      output.percent = '0%';
      output.string = '--/0'
      output.remainingPercent = output.percent;
    }

    return output;
  }
}
