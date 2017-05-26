import { Pipe, PipeTransform } from '@angular/core';
import { Ap } from "app/classes/ap";
import { Note } from "app/classes/note";

@Pipe({
  name: 'getApTotal'
})
export class GetApTotalPipe implements PipeTransform {

  /** Calculates the total of a selected Ap from its associated Notes
   * @param {Ap} Ap The "Activité Pédagogique" to cumulate
   * @param {Note[]} notes The list of all notes
   * @return {string} The compiled value
   */
  transform(ap: Ap, notes: Note[]): any {
    var total = 0;
    var noteTotal = 0;
    var isFinal = true;

    for (let note of notes) {
      if (ap.ap_code == note.ap_code) {
        total += note.ponderation;
        if (note.note) {
          noteTotal += note.note;
        }
        else isFinal = false;
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
