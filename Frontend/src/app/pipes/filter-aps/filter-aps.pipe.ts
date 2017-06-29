import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";

@Pipe({
  name: 'filterAps'
})
export class FilterApsPipe implements PipeTransform {

  /** Filter the list of Aps by searching for matching value with Aps and Competences
   * @param {Ap[]} Aps The list of "Activité Pédagogique" to filter
   * @param {string} filter The string value to use as a filter
   * @return {Ap[]}} The filtered list
   */
  transform(aps: Ap[], filter: string): Ap[] {
    if (filter == undefined || filter == '') {
      return aps;
    } else {
      filter = filter.toLocaleLowerCase();
      return aps.filter(ap => {
        if (ap.apCode.toLowerCase().includes(filter)) return true;
        if (ap.titre.toLocaleLowerCase().includes(filter)) return true;
        if (ap.competences) {
          for (let competence of ap.competences) {
            if (competence.description) {
              if (competence.description.toLocaleLowerCase().includes(filter)) return true;
            }
          }
        }
        return false;
      });
    }
  }
}
