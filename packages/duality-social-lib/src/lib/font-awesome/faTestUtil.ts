import { IconName, IconPrefix, IconDefinition, IconPack } from "@fortawesome/fontawesome-common-types";
import { IconNames } from "./font-awesome-types";

export function makeIconDefinition(iconName: IconName, prefix: IconPrefix = 'far'): IconDefinition {
    return {
        iconName: iconName,
        prefix: prefix,
        icon: [0, 0, [''], '', ''], // bogus data
    };
}

export function makeIconPackFromDefinitions(icons: IconDefinition[]): IconPack {
    const result: IconPack = {};
    for (const icon of icons) {
        result[icon.iconName] = icon;
    }
    return result;
}

export function generateIconPack(count: number): IconPack {
    const icons: IconDefinition[] = [];
    for (let i = 0; i < count; i++) {
        // pick a random IconName
        const iconName: IconName = IconNames[Math.floor(Math.random() * IconNames.length)];
        const definition = makeIconDefinition(iconName);
        icons.push(definition);
    }
    return makeIconPackFromDefinitions(icons);
}
