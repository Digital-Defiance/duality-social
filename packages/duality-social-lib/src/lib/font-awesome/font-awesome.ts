import {
  IconName,
  IconDefinition,
  IconPrefix,
} from '@fortawesome/fontawesome-common-types';
import {
  findIconDefinition,
  library,
  IconStyle,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fass } from '@fortawesome/sharp-solid-svg-icons';
import {
  getReactionTypeIcon,
  DefaultReactionsType,
  ReactionTypeIcons,
} from '../enumerations/defaultReactionsType';
import { FontAwesomeTextStyleType } from '../enumerations/fontAwesomeTextClass';
library.add(fas, far, fal, fat, fad, fass);

export interface IFontAwesomeParseItem {
  colorClass: FontAwesomeTextStyleType;
  name: IconName;
  definition: IconDefinition;
}

export interface IFontAwesomeParseResult {
  outputText: string;
  changed: boolean;
  changes: IFontAwesomeParseItem[];
}

export const DefaultColorClass = FontAwesomeTextStyleType.Regular;

export function verifyFontAwesome(
  iconPrefix: IconPrefix,
  iconName: IconName
): IconDefinition | false {
  const iconDefinition: IconDefinition = findIconDefinition({
    prefix: iconPrefix,
    iconName: iconName,
  });
  if (!iconDefinition) {
    return false;
  }
  return iconDefinition;
}

export function makeReaction(
  reactionType: DefaultReactionsType,
  colorClass: FontAwesomeTextStyleType
): string {
  if (!ReactionTypeIcons[reactionType]) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  const reactionTypeIcon = getReactionTypeIcon(reactionType);

  return `<i class="fa-${colorClass} ${reactionTypeIcon}}"></i>`;
}

export function parseIconMarkup(input: string): string {
  const regex = /\[(?::([^\]]*):|)\]/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    if (match[1] === undefined) {
      continue;
    }
    console.log(match);
    const iconWords: string[] = [];
    const styleWords: string[] = [];
    const contents = match[1];
    if (!contents) {
      continue;
    }
    const words = contents.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i].trim();
      if (!word) {
        continue;
      }
      if (i < 2 && word === 'sharpsolid') {
        iconWords.push('fa-sharp');
        iconWords.push('fa-solid');
      } else if (i < 2) {
        iconWords.push(`fa-${word.toLowerCase()}`);
      } else {
        styleWords.push(word.trim());
      }
    }
    if (iconWords.length === 1) {
      iconWords.unshift('fa-regular');
    }
    const styleAttr =
      styleWords.length > 0 ? ` style="${styleWords.join(' ')}"` : '';
    const newTag = `<i class="${iconWords.join(' ')}"${styleAttr}></i>`;

    input = input.replace(match[0], newTag);
  }
  return input;
}
