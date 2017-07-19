import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceDotByComma'
})
export class ReplaceDotByComma implements PipeTransform {
    transform(noteString: string): string {
         return noteString.replace(".", ",");
    }
}
