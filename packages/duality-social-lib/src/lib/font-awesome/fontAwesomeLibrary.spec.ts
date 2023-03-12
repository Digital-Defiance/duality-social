import { IconDefinition, IconPack } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeLirary } from './fontAwesomeLibrary';
import { fas } from '@fortawesome/pro-solid-svg-icons';

describe('FontAwesomeLirary', () => {
  let library: FontAwesomeLirary;

  beforeEach(() => {
    library = new FontAwesomeLirary();
  });

  it('should add icon definitions to the library', () => {
    const icon1: IconDefinition = fas.facebook;
    const icon2: IconDefinition = fas.twitter;
    const iconPack: IconPack = {
        tiktok: fas.tiktok,
        instagram: fas.instagram,
    };

    library.add(icon1, icon2, iconPack);

    expect(library.definitions).toContain(icon1);
    expect(library.definitions).toContain(icon2);
    expect(library.definitions).toContain(iconPack.tiktok);
    expect(library.definitions).toContain(iconPack.instagram);
  });

  it('should reset the library', () => {
    const icon1: IconDefinition = fas.facebook;
    library.add(icon1);
    expect(library.definitions).toContain(icon1);

    library.reset();
    expect(library.definitions).toEqual([]);
  });

  it('should search for icon definitions', () => {
    const icon1: IconDefinition = fas.facebook;
    const icon2: IconDefinition = fas.twitter;
    const iconPack: IconPack = {
      faIcon3: fas.linkedin,
      faIcon4: fas.instagram,
    };

    library.add(icon1, icon2, iconPack);

    expect(library.search('face')).toContain(icon1);
    expect(library.search('tw')).toContain(icon2);
    expect(library.search('link')).toContain(iconPack.faIcon3);
    expect(library.search('volkswagen')).toEqual([]);
  });
});
