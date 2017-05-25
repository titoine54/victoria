import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getApTotal'
})
export class GetApTotalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var total = 0;
    var noteTotal = 0;
    var isFinal = true;

    for (let note of args) {
      if (value.code == note.ap) {
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
