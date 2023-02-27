import { CssStyleClass, IconFamily, IconName, IconDefinition, IconStyle } from '@fortawesome/fontawesome-common-types';
import {
  findIconDefinition,
  library,
  IconPrefix,
} from '@fortawesome/fontawesome-svg-core';

export const FontAwesomeIconPrefixes: Array<IconPrefix> = ["fas", "far", "fal", "fat", "fad", "fab", "fak", "fass"];
export const FontAwesomeIconStyle: Array<IconStyle> = ["solid", "regular", "light", "thin", "duotone", "brands" ]
export const FontAwesomeIconFamilies: Array<IconFamily> = ["classic", "sharp", "duotone"];
export const FontAwesomeIconCssStyleClasses: Array<CssStyleClass> = ["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands" ];

export enum FontAwesomeTextStyleType {
  Classic = 'classic',
  DuoTone = 'fa-duotone',
  Light = 'fa-light',
  Regular = 'fa-regular',
  SharpSolid = 'fa-sharp fa-solid',
  Solid = 'fa-solid',
  Thin = 'fa-thin',
  Brands = 'fa-brands',
}

export enum FontAwesomeTextAbbreviation {
  DuoTone = 'fad',
  Light = 'fal',
  Regular = 'far',
  SharpSolid = 'fass',
  Solid = 'fas',
  Thin = 'fat',
  Brands = 'fab',
}

export const FontAbbreviationToClassTable = {
  [FontAwesomeTextAbbreviation.DuoTone]: FontAwesomeTextStyleType.DuoTone,
  [FontAwesomeTextAbbreviation.Light]: FontAwesomeTextStyleType.Light,
  [FontAwesomeTextAbbreviation.Regular]: FontAwesomeTextStyleType.Regular,
  [FontAwesomeTextAbbreviation.SharpSolid]: FontAwesomeTextStyleType.SharpSolid,
  [FontAwesomeTextAbbreviation.Solid]: FontAwesomeTextStyleType.Solid,
  [FontAwesomeTextAbbreviation.Thin]: FontAwesomeTextStyleType.Thin,
  [FontAwesomeTextAbbreviation.Brands]: FontAwesomeTextStyleType.Brands,
}

export const FontClassToAbbreviationNameTable = {
  [FontAwesomeTextStyleType.DuoTone]: FontAwesomeTextAbbreviation.DuoTone,
  [FontAwesomeTextStyleType.Light]: FontAwesomeTextAbbreviation.Light,
  [FontAwesomeTextStyleType.Regular]: FontAwesomeTextAbbreviation.Regular,
  [FontAwesomeTextStyleType.SharpSolid]: FontAwesomeTextAbbreviation.SharpSolid,
  [FontAwesomeTextStyleType.Solid]: FontAwesomeTextAbbreviation.Solid,
  [FontAwesomeTextStyleType.Thin]: FontAwesomeTextAbbreviation.Thin,
  [FontAwesomeTextStyleType.Brands]: FontAwesomeTextAbbreviation.Brands,
}

export const FontClassToNameTable = {
  [FontAwesomeTextStyleType.DuoTone]: 'DuoTone',
  [FontAwesomeTextStyleType.Light]: 'Light',
  [FontAwesomeTextStyleType.Regular]: 'Regular',
  [FontAwesomeTextStyleType.SharpSolid]: 'SharpSolid',
  [FontAwesomeTextStyleType.Solid]: 'Solid',
  [FontAwesomeTextStyleType.Thin]: 'Thin',
  [FontAwesomeTextStyleType.Brands]: 'Brands',
}