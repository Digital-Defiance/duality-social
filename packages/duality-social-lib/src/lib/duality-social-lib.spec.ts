import { parseFontAwesome } from './duality-social-lib';

describe('dualitySocialLib', () => {
  it('should test [:fa-thumbs-up:]', () => {
    const input = 'xx[:fa-thumbs-up:]yy';
    const output = parseFontAwesome(input);
    expect(output).toEqual('xx<i class="fa-regular fa-thumbs-up"></i>yy');
  });
  it('should test [:fa-solid fa-thumbs-up:]', () => {
    const input = 'xx[:fa-solid fa-thumbs-up:]yy';
    const output = parseFontAwesome(input);
    expect(output).toEqual('xx<i class="fa-solid fa-thumbs-up"></i>yy');
  });
  it('should test [:fa-solid fa-thumbs-up:] and [:fa-thumbs-up:]', () => {
    const input = 'aa[:fa-solid fa-thumbs-up:][:fa-thumbs-up:]bb'
    const output = parseFontAwesome(input);
    expect(output).toEqual('aa<i class="fa-solid fa-thumbs-up"></i><i class="fa-regular fa-thumbs-up"></i>bb');
  });
  it('should pass a string without any tags through', () => {
    const input = 'This is a test';
    const output = parseFontAwesome(input);
    expect(output).toBe(input);
  });
});
