import { GetApTotalPipe } from './get-ap-total.pipe';
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Competence } from "app/classes/competence";

let apList: Ap[] = [
  new Ap('GEN 501', 'Empty AP'),
  new Ap('GEN 500', 'AP with some empty notes'),
  new Ap('GEN 510', 'AP all notes', [new Competence(1), new Competence(2)]),
];

let evaluations: Evaluation[] = [
  new Evaluation('Rapport de l\'APP 1', {
    'GEN 500': [new Note(1, 35, 40), new Note(2, 35, 40)],
    'GEN 510': [new Note(1, 85, 100)]
  }),
  new Evaluation('Examen Sommatif de l\'APP 1', {
    'GEN 500': [new Note(1, 35, 40)],
    'GEN 510': [new Note(1, null, 40)]
  })
];

let pipe: GetApTotalPipe;
beforeEach(() => pipe = new GetApTotalPipe());

describe('GetApTotalPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('get should display "--/0" for no notes in GEN 501', () => {
    var output = pipe.transform(apList[0], evaluations);
    expect(output).toEqual('--/0')
  });

  it('get should display "{note}/{total}" for available notes in GEN 500', () => {
    var output = pipe.transform(apList[1], evaluations);
    expect(output).toEqual('35/80')
  });

  it('get should display "{note}/{total} {percentage}%" for all notes in GEN 510', () => {
    var output = pipe.transform(apList[2], evaluations);
    expect(output).toEqual('155/180 (86%)')
  });
});
