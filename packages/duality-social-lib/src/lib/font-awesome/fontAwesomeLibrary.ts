import {
    IconDefinition,
    IconPack,
    Library,
} from '@fortawesome/fontawesome-svg-core';

export interface IFontAwesomeLibrary {
    definitions: IconDefinition[];
    search(term: string): IconDefinition[];
}

/**
 * Implements the FontAwesome library interface to allow for searching
 */
export class FontAwesomeLirary implements Library, IFontAwesomeLibrary {
    private readonly _libraryMap: Map<string, IconDefinition> = new Map();
    public get definitions(): IconDefinition[] {
        return Array.from(this._libraryMap.values());
    }

    public add(...definitions: (IconDefinition | IconPack)[]): void {
        for (const definition of definitions) {
            if (definition === null || definition === undefined) {
                continue;
            }
            if ('icon' in definition) {
                const iconPack = definition as IconPack;
                for (const key of Object.keys(iconPack)) {
                    const iconDefinition = iconPack[key];
                    this._libraryMap.set(iconDefinition.iconName, iconDefinition);
                }
            } else if (definition.iconName) {
                const iconDefinition = definition as unknown as IconDefinition;
                this._libraryMap.set(iconDefinition.iconName, iconDefinition);
            }
        }
    }
    public reset(): void {
        this._libraryMap.clear();
    }
    public search(term: string): IconDefinition[] {
        const searchLower = term.toLowerCase();
        return Array.from(this._libraryMap.values()).filter(icon => icon.iconName.toLowerCase().includes(searchLower));
    }
}
