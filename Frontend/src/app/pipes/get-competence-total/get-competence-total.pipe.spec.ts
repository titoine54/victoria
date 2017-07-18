import { GetCompetenceTotalPipe } from './get-competence-total.pipe';
import { Competence } from "app/classes/competence";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Ap } from "app/classes/ap";

let competence: Competence[] = [
  new Competence(1),
  new Competence(2),
  new Competence(3)
];

let evaluations: Evaluation[] = [
  new Evaluation('Rapport de l\'APP 1', {
    'GEN 500': [new Note(1, 35, 40), new Note(2, null, 40), new Note(3, null, null)],
  }),
  new Evaluation('Examen Sommatif de l\'APP 1', {
    'GEN 500': [new Note(1, 78, 85), new Note(2, 65, 75)],
    'GEN 510': [new Note(1, 78, 88), new Note(2, 40, 60)]
  })
];

let pipe: GetCompetenceTotalPipe;
beforeEach(() => pipe = new GetCompetenceTotalPipe());

describe('GetCompetenceTotalPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('get should display "--/0" for competence 3 of GEN 500', () => {
    var output = pipe.transform(competence[2], 'GEN 500', evaluations);
    expect(output).toEqual('--/0')
  });

  it('get should display "{note}/{total} {percentage}%" for all notes in competence 1 of GEN 500', () => {
    var output = pipe.transform(competence[0], 'GEN 510', evaluations);
    expect(output).toEqual('78/88 (88,64%)')
  });

});
