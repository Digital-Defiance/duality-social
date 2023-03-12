import { IconDefinition, IconName, IconPack, IconPathData, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeLirary } from './fontAwesomeLibrary';
import { IconNames } from './font-awesome-types';

function makeIconDefinition(iconName: IconName, prefix: IconPrefix = 'far'): IconDefinition {
    return {
        iconName: iconName,
        prefix: prefix,
        icon: [0, 0, [''], '', ''], // bogus data
    };
}

function makeIconPack(icons: IconDefinition[]): IconPack {
    const result: IconPack = {};
    for (const icon of icons) {
        result[icon.iconName] = icon;
    }
    return result;
}


function generateIconPack(count: number): IconPack {
    const icons: IconDefinition[] = [];
    for (let i = 0; i < count; i++) {
        // pick a random IconName
        const iconName: IconName = IconNames[Math.floor(Math.random() * IconNames.length)];
        const definition = makeIconDefinition(iconName);
        icons.push(definition);
    }
    return makeIconPack(icons);
}


describe('FontAwesomeLirary', () => {
    let library: FontAwesomeLirary;

    beforeEach(() => {
        library = new FontAwesomeLirary();
    });
    it('should add icon packs to the library', () => {
        const iconPack: IconPack = generateIconPack(2);
        expect(Object.keys(iconPack).length).toEqual(2);
        library.add(iconPack);
        expect(library.definitions).toContain(iconPack[Object.keys(iconPack)[0]]);
        expect(library.definitions).toContain(iconPack[Object.keys(iconPack)[1]]);
    });
    it('should add icon definitions to the library', () => {
        const iconPack: IconPack = generateIconPack(2);
        const icons: IconDefinition[] = [];
        for (const icon of Object.values(iconPack)) {
            library.add(icon);
            icons.push(icon);
        }
        expect(library.definitions).toContain(icons[0]);
        expect(library.definitions).toContain(icons[1]);
    });

    it('should reset the library', () => {
        const iconPack: IconPack = generateIconPack(1);
        const icons: IconDefinition[] = [];
        for (const icon of Object.values(iconPack)) {
            library.add(icon);
            icons.push(icon);
        }
        expect(library.definitions).toContain(icons[0]);

        library.reset();
        expect(library.definitions).toEqual([]);
    });

    it('should search for icon definitions', () => {
        const iconPack: IconPack = generateIconPack(3);
        expect(library.definitions.length).toEqual(3);
        const icons: IconDefinition[] = [];
        for (const icon of Object.values(iconPack)) {
            library.add(icon);
            icons.push(icon);
        }

        expect(library.search((icons[0].iconName as string).substring(0, 3))).toContain(icons[0]);
        expect(library.search((icons[1].iconName as string).substring(0, 3))).toContain(icons[1]);
        expect(library.search((icons[2].iconName as string).substring(0, 3))).toContain(icons[2]);
    });
});
