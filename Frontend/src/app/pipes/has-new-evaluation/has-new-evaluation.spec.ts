import { HasNewEvaluationPipe } from './has-new-evaluation.pipe';
import { Competence } from "app/classes/competence";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Ap } from "app/classes/ap";

let apList: Ap[] = [
  new Ap('GEN 501', 'Empty AP'),
  new Ap('GEN 500', 'AP with some empty notes'),
  new Ap('GEN 510', 'AP all notes', [new Competence(1), new Competence(2)]),
];

let evaluations: Evaluation[] = [
  new Evaluation('Rapport de l\'APP 1', {
    'GEN 500': [new Note(1, null, 40), new Note(2, 35, 40)],
    'GEN 510': [new Note(1, 85, 100)]
  }, true),
  new Evaluation('Examen Sommatif de l\'APP 1', {
    'GEN 501': [new Note(1, 35, 40)],
    'GEN 510': [new Note(1, 35, 40)]
  }, false)
];

let pipe: HasNewEvaluationPipe;
beforeEach(() => pipe = new HasNewEvaluationPipe());

describe('HasNewEvaluationPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('get should display "false" for no new evaluation notes in GEN 501', () => {
    var output: boolean = pipe.transform(apList[0], evaluations);
    expect(output).toEqual(false);
  });
  
  it('get should display "true" for a new evaluation notes in GEN 500', () => {
    var output: boolean = pipe.transform(apList[1], evaluations);
    expect(output).toEqual(true);
  });
  
  it('get should display "true" for a new evaluation notes in GEN 510', () => {
    var output: boolean = pipe.transform(apList[2], evaluations);
    expect(output).toEqual(true);
  });

});
