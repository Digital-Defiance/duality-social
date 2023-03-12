/// file: font-awesome.ts
/// description: Font Awesome helper functions to look up icons and parse markup

import {
  IconName,
  IconDefinition,
  IconPrefix,
  IconStyle
} from '@fortawesome/fontawesome-common-types';
import {
  findIconDefinition,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fass } from '@fortawesome/sharp-solid-svg-icons';
import {
  getReactionTypeIcon,
  DefaultReactionsTypeEnum,
  ReactionTypeIcons,
} from '../enumerations/defaultReactionsType';
import { FontAwesomeTextStyleTypeEnum } from '../enumerations/fontAwesomeTextClass';
import { FontAwesomeLibrary } from './fontAwesomeLibrary';
// configure fontawesome
export const fontAwesomeLibrary = new FontAwesomeLibrary();
/**
 * Add all the font awesome icons to the global library
 */
library.add(fab, fas, far, fal, fat, fad, fass);
/**
 * Add all the font awesome icons to the searchable library
 */
fontAwesomeLibrary.add(fab, fas, far, fal, fat, fad, fass);

export interface IFontAwesomeParseItem {
  colorClass: FontAwesomeTextStyleTypeEnum;
  name: IconName;
  definition: IconDefinition;
}

export interface IFontAwesomeParseResult {
  outputText: string;
  changed: boolean;
  changes: IFontAwesomeParseItem[];
}

export const DefaultColorClass = FontAwesomeTextStyleTypeEnum.Regular;

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
  reactionType: DefaultReactionsTypeEnum,
  textStyleType: FontAwesomeTextStyleTypeEnum
): string {
  if (!ReactionTypeIcons[reactionType]) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  const reactionTypeIcon = getReactionTypeIcon(reactionType);

  return `<i class="fa-${textStyleType} ${reactionTypeIcon}}"></i>`;
}

/**
 * This function takes the input and looks for several cases of the following syntax:
 * {{iconName}} or {{ iconName }} which renders as fa-regular fa-iconName
 * {{style iconName}} or {{ style iconName }} which renders as fa-style fa-iconName 
 *   such as fa-solid fa-heart
 * {{style iconName; ..style attribures..}} or {{ style iconName; ..style attributes.. }} which 
 *   renders as <i class="fa-style fa-iconName" style="..style attributes.." such as <i class="fa-solid fa-heart" style="background-color: black; color: red;">
 * @param input The string to be parsed
 * @returns parsed markup
 */
export function parseIconMarkup(input: string): string {
  const regex = /\{\{([a-zA-Z0-9-_;:%#&*! ^ ]+)\}\}/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    if (match[1] === undefined) {
      continue;
    }
    const iconWords: string[] = [];
    const styleWords: string[] = [];
    const contents = match[1];
    if (!contents) {
      continue;
    }
    let skip = false;
    const words = contents.trim().split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i].trim();
      if (!word) {
        skip = true;
        continue;
      }
      if (!/[a-zA-Z0-9-_]+/.test(word)) {
        skip = true;
        continue;
      }
      if (i < 2 && word === 'sharpsolid') {
        iconWords.push('fa-sharp');
        iconWords.push('fa-solid');
      } else if (i < 2) {
        iconWords.push(`fa-${word.toLowerCase()}`);
      } else {
        styleWords.push(word);
      }
    }
    if (skip) {
      continue;
    }
    if (iconWords.length === 1) {
      iconWords.unshift('fa-regular');
    }
    let newTag = match[0];
    if (styleWords.length > 0) {
      const styleAttr = ` style="display: inline-block; ${styleWords.join(' ')}"`;
      newTag = `<i class="${iconWords.join(' ')}"${styleAttr}></i>`;
    } else {
      newTag = `<i class="${iconWords.join(' ')}"></i>`;
    }
    input = input.replace(match[0], newTag);
  }

  return input;
}
