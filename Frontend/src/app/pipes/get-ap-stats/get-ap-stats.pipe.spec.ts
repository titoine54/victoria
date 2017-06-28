import { GetApStatsPipe } from './get-ap-stats.pipe';
import { Competence } from "app/classes/competence";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Ap } from "app/classes/ap";
import { Dict } from "app/classes/dict.interface";

let apList: Ap[] = [
  new Ap('GEN 501', 'Empty AP'),
  new Ap('GEN 500', 'AP with some empty notes'),
  new Ap('GEN 510', 'AP all notes', [new Competence(1), new Competence(2)]),
];

let evaluations: Evaluation[] = [
  new Evaluation('Rapport de l\'APP 1', {
    'GEN 500': [new Note(1, null, 40), new Note(2, 35, 40)],
    'GEN 510': [new Note(1, 85, 100)]
  }),
  new Evaluation('Examen Sommatif de l\'APP 1', {
    'GEN 500': [new Note(1, 35, 40)],
    'GEN 510': [new Note(1, 35, 40)]
  })
];

let pipe: GetApStatsPipe;
beforeEach(() => pipe = new GetApStatsPipe());

describe('GetApStatsPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('get should display "--/0" for no notes in GEN 501', () => {
    var output: Dict<any> = pipe.transform(apList[0], evaluations);
    expect(output.string).toEqual('--/0');
    expect(output.percent).toEqual('0%');
    expect(output.points).toEqual(0);
    expect(output.total).toEqual(0);
    expect(output.remaining).toEqual(0);
    expect(output.remainingPercent).toEqual('0%');
  });

  it('get should display "{note}/{total} {percentage}%" for notes in GEN 500', () => {
    var output: Dict<any> = pipe.transform(apList[1], evaluations);
    expect(output.string).toEqual('70/120 (58%)');
    expect(output.percent).toEqual('58%');
    expect(output.points).toEqual(70);
    expect(output.total).toEqual(120);
    expect(output.remaining).toEqual(40);
    expect(output.remainingPercent).toEqual('75%');
  });

  it('get should display "{note}/{total} {percentage}%" with for all notes in GEN 510', () => {
    var output: Dict<any> = pipe.transform(apList[2], evaluations);
    expect(output.string).toEqual('120/140 (86%)');
    expect(output.percent).toEqual('86%');
    expect(output.points).toEqual(120);
    expect(output.total).toEqual(140);
    expect(output.remaining).toEqual(0);
    expect(output.remainingPercent).toEqual('100%');
  });

});
