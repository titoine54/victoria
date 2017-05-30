import { Injectable } from '@angular/core';
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { User } from "app/classes/user";
import { MockUser } from "app/services/api-mocking-tests/user.mock";
import { MockEvaluations } from "app/services/api-mocking-tests/evaluations.mock";
import { MockApList } from "app/services/api-mocking-tests/ap-list.mock";

@Injectable()
export class GlobalVariablesService {

  /** This service contains all the global variables of the application */
  constructor() { }

  user: User = MockUser;
  
  trimestre: string = 'Trimestre été 2017';
  
  apList: Ap[] = MockApList;
  evaluations: Evaluation[] = MockEvaluations;
}
