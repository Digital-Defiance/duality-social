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
export class FontAwesomeLibrary implements Library, IFontAwesomeLibrary {
    private readonly _libraryMap: Map<string, IconDefinition> = new Map();
    public get definitions(): IconDefinition[] {
        return Array.from(this._libraryMap.values());
    }

    add(...definitions: (IconDefinition | IconPack)[]): void {
        for (const definition of definitions) {
            const iconPack: IconPack = definition as IconPack;
            const iconDefinition: IconDefinition = definition as IconDefinition;
            const iconPackKeys = Object.keys(iconPack);
            if (iconPackKeys.length > 0) {
                for (const key of iconPackKeys) {
                    const icon = iconPack[key];
                    this._libraryMap.set(icon.iconName, icon);
                }
            } else if (iconDefinition.icon && iconDefinition.iconName) {
                this._libraryMap.set(iconDefinition.iconName, iconDefinition);
            }
        }
    }
    reset(): void {
        this._libraryMap.clear();
    }
    search(term: string): IconDefinition[] {
        const results: IconDefinition[] = [];
        const searchLower = term.toLowerCase();
        for (const icon of this._libraryMap.values()) {
            if (icon.iconName.toLowerCase().indexOf(searchLower) >= 0) {
                results.push(icon);
            }
        }
        return results;
    }
}
