import { CreateImageRequestSizeEnum } from 'openai';
import { Buffer } from 'buffer';
import {
  findIconDefinition,
  library,
  IconName,
  IconDefinition,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fass } from '@fortawesome/sharp-solid-svg-icons';
import {
  getReactionTypeIcon,
  ReactionType,
  ReactionTypeIcons,
} from './enumerations/reactionType';
import {
  FontAwesomeTextClass,
  textClassToAbbreviation,
} from './enumerations/fontAwesomeTextClass';
library.add(fas, far, fal, fat, fad, fass);

/**
 * Makes a data:// URL from a base64 encoded binary blob string containing a PNG image
 * @param imageBase64Json String containing b64_json
 */
export function makeDataUrl(imageBase64Json: string): string {
  return `data:image/png;base64,${imageBase64Json}`;
}

export function closestImageSize(size: number): CreateImageRequestSizeEnum {
  // If size is greater than or equal to 1024, return 1024
  // If size is greater than or equal to 768, return 1024 (round up)
  // If size is greater than or equal to 512, return 512
  // If size is greater than or equal to 256, return 512 (round up)
  // If size is less than or equal to 384, return 256
  if (size >= 1024 || (size >= 768 && size < 1024)) {
    return CreateImageRequestSizeEnum._1024x1024;
  } else if (size >= 512 || (size >= 256 && size < 512)) {
    return CreateImageRequestSizeEnum._512x512;
  }
  return CreateImageRequestSizeEnum._256x256;
}

export function imageDataUrlToFile(imageDataUrl: string): File {
  if (!imageDataUrl.startsWith('data:image/png;base64,')) {
    throw new Error('Invalid image data URL');
  }
  const imageData = Buffer.from(imageDataUrl.split(',', 2)[1]);
  const imageFile = new File([imageData], 'image.png');
  return imageFile;
}

export function verifyFontAwesome(
  colorClass: FontAwesomeTextClass,
  iconName: IconName
): IconDefinition | false {
  const iconDefinition: IconDefinition = findIconDefinition({
    prefix: textClassToAbbreviation(colorClass),
    iconName: iconName,
  });
  if (!iconDefinition) {
    return false;
  }
  return iconDefinition;
}

export function makeReaction(
  reactionType: ReactionType,
  colorClass: FontAwesomeTextClass
): string {
  if (!ReactionTypeIcons[reactionType]) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  const reactionTypeIcon = getReactionTypeIcon(reactionType);

  return `<i class="fa-${colorClass} ${reactionTypeIcon}}"></i>`;
}

export interface FontAwesomePair {
  colorClass: FontAwesomeTextClass;
  iconName: IconName;
}

export function extractPairs(input: string): FontAwesomePair[] {
  // look for [:fa-anything fa-blah:] and [:fa-blah:]
  /* if only one 'fa-'term is specified, assume fa-regular
    * [:fa-person:] -> <i class="fa-regular fa-person"></i>
  /* if two 'fa-'terms are specified, assume the first is the style
    * and the second is the icon
    * [:fa-solid fa-person:] -> <i class="fa-solid fa-person"></i>
    */
  const oneTermRegex = /\[:fa-([a-zA-Z0-9-]+):\]/g;
  const twoTermRegex = /\[:fa-([a-zA-Z0-9-]+)(?: fa-([a-zA-Z0-9-]+))?:\]/g;

  let changed = false;
  const pairs: FontAwesomePair[] = [];
  do {
    const before = input;
    // Replace [:fa-X:] with <i class="fa-regular fa-X"></i>
    const iconName = input.replace(oneTermRegex, '$1');
    const fullString = input.replace(
      oneTermRegex,
      '<i class="fa-regular fa-$1"></i>"'
    );
    if (before !== iconName) {
      pairs.push({
        colorClass: FontAwesomeTextClass.Regular,
        iconName: iconName as IconName,
      });
      changed = true;
      input = fullString;
      continue;
    }

    // Replace [:fa-X fa-Y:] with <i class="fa-X fa-Y"></i>
    const iconPair = input.replace(twoTermRegex, '$1:$2').split(':');
    if (iconPair.length === 2) {
      pairs.push({
        colorClass: iconPair[0] as FontAwesomeTextClass,
        iconName: iconPair[1] as IconName,
      });
      input = input.replace(twoTermRegex, '<i class="fa-$1 fa-$2"></i>"');
      changed = true;
      continue;
    }
  } while (changed);

  return pairs;
}

export function validatePairs(pairs: FontAwesomePair[]): boolean {
  for (const pair of pairs) {
    if (!verifyFontAwesome(pair.colorClass, pair.iconName)) {
      return false;
    }
  }
  return true;
}

export function validateFontSwaps(input: string): boolean {
  const pairs = extractPairs(input);
  return validatePairs(pairs);
}

export function parseFontAwesome(input: string): string {
  // look for [:fa-anything fa-blah:] and [:fa-blah:]
  /* if only one 'fa-'term is specified, assume fa-regular
    * [:fa-person:] -> <i class="fa-regular fa-person"></i>
  /* if two 'fa-'terms are specified, assume the first is the style
    * and the second is the icon
    * [:fa-solid fa-person:] -> <i class="fa-solid fa-person"></i>
    */
  const oneTermRegex = /\[:fa-([a-zA-Z0-9-]+):\]/g;
  const twoTermRegex = /\[:fa-([a-zA-Z0-9-]+)(?: fa-([a-zA-Z0-9-]+))?:\]/g;

  let changed = false;
  const pairs: FontAwesomePair[] = [];
  do {
    changed = false;
    const before = input;
    // Replace [:fa-X:] with <i class="fa-regular fa-X"></i>
    const fullString = input.replace(
      oneTermRegex,
      '<i class="fa-regular fa-$1"></i>"'
    );
    if (before !== fullString) {
      input = fullString;
      changed = true;
      continue;
    }

    // Replace [:fa-X fa-Y:] with <i class="fa-X fa-Y"></i>
    const iconPair = input.replace(twoTermRegex, '$1:$2').split(':');
    if (iconPair.length === 2) {
      pairs.push({
        colorClass: iconPair[0] as FontAwesomeTextClass,
        iconName: iconPair[1] as IconName,
      });
      input = input.replace(twoTermRegex, '<i class="fa-$1 fa-$2"></i>"');
      changed = true;
      continue;
    }
  } while (changed);

  return input;
}
