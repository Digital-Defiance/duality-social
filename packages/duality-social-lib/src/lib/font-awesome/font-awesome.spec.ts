import { parseIconMarkup } from './font-awesome';

describe('FontAwesome', () => {
  it('should test {{thumbs-up}}', () => {
    const input = 'xx{{thumbs-up}}yy';
    const output = parseIconMarkup(input);
    expect(output).toBe('xx<i class="fa-regular fa-thumbs-up"></i>yy');
  });
  it('should test {{solid thumbs-up}}', () => {
    const input = 'xx{{solid thumbs-up}}yy';
    const output = parseIconMarkup(input);
    expect(output).toBe('xx<i class="fa-solid fa-thumbs-up"></i>yy');
  });
  it('should test {{sharpsolid thumbs-up}} and {{thumbs-up}}', () => {
    const input = 'aa{{sharpsolid thumbs-up}}{{thumbs-up}}bb'
    const output = parseIconMarkup(input);
    expect(output).toBe('aa<i class="fa-sharp fa-solid fa-thumbs-up"></i>' + 
    '<i class="fa-regular fa-thumbs-up"></i>bb');
  });
  it('should test {{solid thumbs-up}} and {{thumbs-up}}', () => {
    const input = 'aa{{solid thumbs-up}}{{thumbs-up}}bb'
    const output = parseIconMarkup(input);
    expect(output).toBe('aa<i class="fa-solid fa-thumbs-up"></i>' + 
    '<i class="fa-regular fa-thumbs-up"></i>bb');
  });
  it('should test {{solid thumbs-up foreground: white; background: black;}} and {{thumbs-up:}}', () => {
    const input = 'aa{{solid thumbs-up foreground: white; background: black;}}{{thumbs-up}}bb'
    const output = parseIconMarkup(input);
    expect(output).toBe('aa<i class="fa-solid fa-thumbs-up" style="display: inline-block; foreground: white; background: black;"></i>' + 
    '<i class="fa-regular fa-thumbs-up"></i>bb');
  });
  it('should pass a string without any tags through', () => {
    const input = 'This is a trick test {{}}';
    const output = parseIconMarkup(input);
    expect(output).toBe(input);
  });
  it('Doesn\'t match a string with just a colon', () => {
    const input = 'This is a trick test {{:}}';
    const output = parseIconMarkup(input);
    expect(output).toBe(input);
  });
  it('Doesn\'t match a string with just braces and a colon', () => {
    const input = 'This is a trick test {blah : x}';
    const output = parseIconMarkup(input);
    expect(output).toBe(input);
  });
  it('Doesn\'t match a string with just braces and a colon', () => {
    const input = 'This is a trick test {blah }}';
    const output = parseIconMarkup(input);
    expect(output).toBe(input);
  });
  it('Doesn\'t allow odd injections', () => {
    const input = 'This is a trick test {{solid heart x x <blah></blah>}}';
    const output = parseIconMarkup(input);
    expect(output).toBe("This is a trick test {{solid heart x x <blah></blah>}}");
  });
});
