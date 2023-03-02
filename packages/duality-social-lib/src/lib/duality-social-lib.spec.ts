import { parsePostContent } from './duality-social-lib';

describe('DualitySocialLib', () => {
    it('should do markdown and our cool icons', () => {
        const testMarkdown = '# Hello World\nThis is a test of our markdown parser.\n' +
        'This should be a red heart with a zig-zag through it -> {{duotone heart-pulse color: red;}}';
        const expectedHtml = '<h1>Hello World</h1>\n<p>This is a test of our markdown parser.<br />\n' +
        'This should be a red heart with a zig-zag through it -&gt; <i class="fa-duotone fa-heart-pulse" style="display: inline-block; color: red;"></i></p>\n';

        const result = parsePostContent(testMarkdown);
        expect(result).toEqual(expectedHtml);
    });
    it('should support MD links', () => {
        const testMarkdown = 'This should be a link -> [https://www.google.com](https://www.google.com)';
        const expectedHtml = '<p>This should be a link -&gt; <a href="https://www.google.com">https://www.google.com</a></p>\n';

        const result = parsePostContent(testMarkdown);
        expect(result).toEqual(expectedHtml);
    });
    it('should linkify plaintext links', () => {
        const testMarkdown = 'This should be a link -> https://www.google.com';
        const expectedHtml = '<p>This should be a link -&gt; <a href="https://www.google.com">https://www.google.com</a></p>\n';

        const result = parsePostContent(testMarkdown);
        expect(result).toEqual(expectedHtml);
    });
});