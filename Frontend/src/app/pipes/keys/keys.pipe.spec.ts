import { KeysPipe } from './keys.pipe';

let pipe: KeysPipe;
beforeEach(() => pipe = new KeysPipe());

describe('KeysPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('extract all keys from map', () => {
    var input = { key1: 'value1', key2: 'value2', key3: 'value3' };
    var output = pipe.transform(input);
    expect(output).toEqual(['key1', 'key2', 'key3']);
  });

  it('extract nothing from null', () => {
    var input = null;
    var output = pipe.transform(input);
    expect(output).toEqual([]);
  });
});
