import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

  transform(array: any[], property: string): any[] {
    return array.sort((n1,n2) => n1[property] - n2[property]);
  }

}