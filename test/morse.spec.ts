import { convertToMorse, encodeMessage, obfuscateMorse } from '../src/morse';

describe('method: convertToMorse', () => {
  it('converts the message to morse', () => {
    expect(convertToMorse('TEST')).toEqual('-|.|...|-');
    expect(convertToMorse('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual('.-|-...|-.-.|-..|.|..-.|--.|....|..|.---|-.-|.-..|--|-.|---|.--.|--.-|.-.|...|-|..-|...-|.--|-..-|-.--|--..');
    expect(convertToMorse('0123456789')).toEqual('-----|.----|..---|...--|....-|.....|-....|--...|---..|----.');
    expect(convertToMorse('I AM IN TROUBLE')).toEqual('../.-|--/..|-./-|.-.|---|..-|-...|.-..|.');
    expect(convertToMorse('I, AM IN TROUBLE.')).toEqual('..|--..--/.-|--/..|-./-|.-.|---|..-|-...|.-..|.|.-.-.-');
    expect(convertToMorse('I* AM IN TROUBLE')).toEqual('../.-|--/..|-./-|.-.|---|..-|-...|.-..|.');
  });
});

describe('method: obfuscateMorse', () => {
  it('converts the message to morse', () => {
    expect(obfuscateMorse('../.-|--/..|-./-|.-.|---|..-|-...|.-..|.')).toEqual('2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1');
  });
});

describe('method: encodeMessage', () => {
  it('converts and encode the message', () => {
    expect(encodeMessage('I AM IN TROUBLE')).toEqual('2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1');
  });
});
