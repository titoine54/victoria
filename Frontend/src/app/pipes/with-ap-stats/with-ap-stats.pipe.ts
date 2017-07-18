import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";
import { Dict } from "app/classes/dict.interface";

@Pipe({
  name: 'withApStats'
})
export class WithApStatsPipe implements PipeTransform {

  /** @deprecated Use getApStats
   * 
   * Calculates the total of a selected Ap from its associated Notes
   * @param {Ap[]} aps The list of "Activité Pédagogique"
   * @param {Evaluation[]} evaluations The list of all evaluations
   * @return {any[]} The compiled list with stats
   */
  transform(aps: Ap[], evaluations: Evaluation[]): Dict<any> {
    // Creating a literal copy of aps with stats 
    var apsWithStats = aps.map(ap => {
      return {
        ...ap,
        stats: {
          points: 0,
          total: 0,
          percent: '',
          remaining: 0,
          remainingPercent: '',
          string: ''
        }
      };
    });

    for (let evaluation of evaluations) {
      for (var apCode in evaluation.associatedAps) {
        for (let note of evaluation.associatedAps[apCode]) {
          var ap = apsWithStats.find(ap => ap.apCode == apCode)
          if (ap != undefined) {
            ap.stats.total += +note.ponderation;
            ap.stats.points += +note.note;
            if (note.note == null) {
              ap.stats.remaining += +note.ponderation;
            }
          }
        }
      }
    }

    for (let ap of apsWithStats) {
      if (ap.stats.total > 0) {
        ap.stats.points = +ap.stats.points.toFixed(2);
         if(((ap.stats.points / ap.stats.total) * 100)%1 == 0) {
          ap.stats.percent = ((ap.stats.points / ap.stats.total) * 100).toString().replace(".", ",") + '%';
           ap.stats.remainingPercent = ((ap.stats.total / (ap.stats.total + ap.stats.remaining)) * 100).toString().replace(".", ",") + '%';
         } else {
          ap.stats.percent = ((ap.stats.points / ap.stats.total) * 100).toFixed(2).replace(".", ",") + '%'
           ap.stats.remainingPercent = ((ap.stats.total / (ap.stats.total + ap.stats.remaining)) * 100).toFixed(2).replace(".", ",") + '%';
         }
        ap.stats.string = `${ap.stats.points}/${ap.stats.total} (${ap.stats.percent})`;
      } else {
        ap.stats.percent = '0%';
        ap.stats.string = '--/0'
        ap.stats.remainingPercent = ap.stats.percent;
      }
    }

    return apsWithStats;
  }
}
