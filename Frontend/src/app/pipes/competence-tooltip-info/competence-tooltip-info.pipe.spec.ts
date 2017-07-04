import { CompetenceTooltipInfoPipe } from './competence-tooltip-info.pipe';
import { Competence } from "app/classes/competence";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Ap } from "app/classes/ap";

let competence: Competence[] = [
  new Competence(1),
  new Competence(2),
  new Competence(3),
];

let evaluations: Evaluation[] = [
  new Evaluation('Rapport de l\'APP 1', {
    'GEN 500': [new Note(1, 35, 40, 30, 8), new Note(1, null, 40, null, null), new Note(2, 35, 40, 32, 10)],
  }),
  new Evaluation('Examen Sommatif de l\'APP 1', {
    'GEN 500': [new Note(1, 35, 40, 30, 8), new Note(2, 35, 40, 30, 8), new Note(3, null, 600, null, null)]
  })
];

let pipe: CompetenceTooltipInfoPipe;
beforeEach(() => pipe = new CompetenceTooltipInfoPipe());

describe('CompetenceTooltipInfoPipe', () => {
  it('create an instance', () => {
    const pipe = new CompetenceTooltipInfoPipe();
    expect(pipe).toBeTruthy();
  });

  it('get should display: "Moyenne: 70/80, Points restants: 40" for competence 1 of GEN 500', () => {
    var output = pipe.transform(competence[0], evaluations, 'GEN 500');
    expect(output).toEqual('Moyenne: 60/80, Points à combler: 40')
  });

  it('get should display: "Moyenne: 62/80, Note finale" for competence 2 of GEN 500', () => {
    var output = pipe.transform(competence[1], evaluations, 'GEN 500');
    expect(output).toEqual('Moyenne: 62/80, Note finale')
  });

  it('get should display: "Points restants: 600" for competence 3 of GEN 500', () => {
    var output = pipe.transform(competence[2], evaluations, 'GEN 500');
    expect(output).toEqual('Points restants: 600')
  });

});

