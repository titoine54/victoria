import { Injectable } from '@angular/core';
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { User } from "app/classes/user";
import { Dict } from "app/classes/dict.interface";
import { environment } from '../../environments/environment';
import { Nouvelle } from "app/classes/nouvelle";

@Injectable()
export class GlobalVariablesService {

  /** This service contains all the global variables of the application */
  constructor() { }

  // TODO: Fetch data from backend
  user: User;

  trimestres: Dict<string>[] = [
    { title: 'Trimestre hiver 2017', value: 'h17' },
    { title: 'Trimestre automne 2016', value: 'a16' },
    { title: 'Trimestre été 2016', value: 'e16' }
  ];
  selectedTrimestre = this.trimestres[0];

  apList: Ap[];
  evaluations: Evaluation[];
  nouvelles: Nouvelle[];

  // Search Bar
  showSearchBar: boolean = false;
  searchValue: string = '';

  // Error
  errorMessage: string;
}
