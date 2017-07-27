import { Competence } from "app/classes/competence";
import { SortByPipe } from "app/pipes/sort-by/sort-by.pipe";

let competence: Competence[] = [
  new Competence(2, 'Competence 2'),
  new Competence(3, 'Competence 3'),
  new Competence(1, 'Competence 1'),
  new Competence(4, 'Competence 4'),
  new Competence(6, 'Competence 6'),
  new Competence(5, 'Competence 5'),
  new Competence(7, 'Competence 7'),
];

let pipe: SortByPipe;
beforeEach(() => pipe = new SortByPipe());

describe('KeysPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('sort list of competences', () => {
    var output = pipe.transform(competence, 'competenceNumero');
    for (var i = 0; i < output.length; i++) {
      expect(output[i]['competenceNumero']).toEqual(i+1);
    }
  });
});
