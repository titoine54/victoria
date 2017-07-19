import { WithApStatsPipe } from './with-ap-stats.pipe';
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

let pipe: WithApStatsPipe;
let output: Dict<any>;
beforeEach(() => {
  pipe = new WithApStatsPipe()
  output = pipe.transform(apList, evaluations);
});

describe('WithApStatsPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('get should display "--/0" for no notes in GEN 501', () => {
    var ap = output[0];
    var stats: Dict<any> = ap.stats;
    expect(stats.string).toEqual('--/0');
    expect(stats.percent).toEqual('0%');
    expect(stats.points).toEqual(0);
    expect(stats.total).toEqual(0);
    expect(stats.remaining).toEqual(0);
    expect(stats.remainingPercent).toEqual('0%');
    delete ap.stats;
    
    for (var property in ap) {
      expect(ap[property]).toEqual(apList[0][property]);
    }
  });

  it('get should display "{note}/{total} {percentage}%" for notes in GEN 500', () => {
    var ap = output[1];
    var stats: Dict<any> = ap.stats;
    expect(stats.string).toEqual('70/120 (58,33%)');
    expect(stats.percent).toEqual('58,33%');
    expect(stats.points).toEqual(70);
    expect(stats.total).toEqual(120);
    expect(stats.remaining).toEqual(40);
    expect(stats.remainingPercent).toEqual('75,00%');
    delete ap.stats;

    for (var property in ap) {
      expect(ap[property]).toEqual(apList[1][property]);
    }
  });

  it('get should display "{note}/{total} {percentage}%" with for all notes in GEN 510', () => {
    var ap = output[2];
    var stats: Dict<any> = ap.stats;
    expect(stats.string).toEqual('120/140 (85,71%)');
    expect(stats.percent).toEqual('85,71%');
    expect(stats.points).toEqual(120);
    expect(stats.total).toEqual(140);
    expect(stats.remaining).toEqual(0);
    expect(stats.remainingPercent).toEqual('100,00%');
    delete ap.stats;

    for (var property in ap) {
      expect(ap[property]).toEqual(apList[2][property]);
    }
  });

});
