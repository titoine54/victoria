import { Injectable } from '@angular/core';
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { User } from "app/classes/user";
import { MockUser } from "app/services/api-mocking-tests/user.mock";
import { MockEvaluations } from "app/services/api-mocking-tests/evaluations.mock";
import { MockApList } from "app/services/api-mocking-tests/ap-list.mock";
import { Dict } from "app/classes/dict.interface";

@Injectable()
export class GlobalVariablesService {

  /** This service contains all the global variables of the application */
  constructor() { }

  // TODO: Fetch data from backend
  user: User; // = MockUser;
  
  trimestres: Dict<string>[] = [
    {title:'Trimestre hiver 2017', value:'h17'},
    {title:'Trimestre automne 2016', value:'a16'},
    {title:'Trimestre été 2016', value:'e16'}
  ];
  selectedTrimestre = this.trimestres[0];
  
  apList: Ap[]; // = MockApList;
  evaluations: Evaluation[]; // = MockEvaluations;

  // Search Bar
  showSearchBar: boolean = false;
  searchValue: string = '';
}
