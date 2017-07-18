import { ReplaceDotByComma } from './replaceDotByComma.pipe';

let pipe: ReplaceDotByComma;
beforeEach(() => pipe = new ReplaceDotByComma());

describe('ReplaceDotByComma', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('get should display "100,00" for "100.00"', () => {
    var output: string = pipe.transform("100.00");
    expect(output).toEqual("100,00");
  });

  it('get should display "100,00" for "100,00"', () => {
    var output: string = pipe.transform("100,00");
    expect(output).toEqual("100,00");
  });
});
