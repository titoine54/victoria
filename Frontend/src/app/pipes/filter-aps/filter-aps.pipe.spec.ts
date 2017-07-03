import { FilterApsPipe } from './filter-aps.pipe';
import { Competence } from "app/classes/competence";
import { Evaluation } from "app/classes/evaluation";
import { Note } from "app/classes/note";
import { Ap } from "app/classes/ap";

let apList: Ap[] = [
  new Ap('GEN 501', 'Empty'),
  new Ap('GEN 500', 'AP with some empty notes'),
  new Ap('GEN 510', 'AP all notes', [new Competence(1), new Competence(2, 'Find charlie')]),
];

let pipe: FilterApsPipe;
beforeEach(() => pipe = new FilterApsPipe());

describe('FilterApsPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should find two Ap when filtering with "AP"', () => {
    // Upercase
    var output = pipe.transform(apList, 'AP');
    expect(output.length).toEqual(2);
    expect(output[0]).toEqual(apList[1]);
    expect(output[1]).toEqual(apList[2]);

    // Lowercase
    var output = pipe.transform(apList, 'ap');
    expect(output.length).toEqual(2);
    expect(output[0]).toEqual(apList[1]);
    expect(output[1]).toEqual(apList[2]);
  });

  it('should find one Ap when filtering with "GEN 501"', () => {
    var output = pipe.transform(apList, 'GEN 501');
    expect(output.length).toEqual(1);
    expect(output[0]).toEqual(apList[0]);
  });

  it('should find one AP with "Find charlie"', () => {
    var output = pipe.transform(apList, 'Find charlie');
    expect(output.length).toEqual(1);
    expect(output[0]).toEqual(apList[2]);
  });


  it('should returns everything if no search', () => {
    // Empty
    var output = pipe.transform(apList, '');
    expect(output).toEqual(apList);
    
    // Undefined
    var output = pipe.transform(apList, undefined);
    expect(output).toEqual(apList);
  });

});
