export enum FontAwesomeTextClass {
  DuoTone = 'fa-duotone',
  Light = 'fa-light',
  Regular = 'fa-regular',
  SharpSolid = 'fa-sharp fa-solid',
  Solid = 'fa-solid',
  Thin = 'fa-thin',
}

export enum FontAwesomeTextAbbreviation {
  DuoTone = 'fad',
  Light = 'fal',
  Regular = 'far',
  SharpSolid = 'fass',
  Solid = 'fas',
  Thin = 'fat',
}

export function textClassToAbbreviation(
  textClass: FontAwesomeTextClass
): FontAwesomeTextAbbreviation {
  switch (textClass) {
    case FontAwesomeTextClass.DuoTone:
      return FontAwesomeTextAbbreviation.DuoTone;
    case FontAwesomeTextClass.Light:
      return FontAwesomeTextAbbreviation.Light;
    case FontAwesomeTextClass.Regular:
      return FontAwesomeTextAbbreviation.Regular;
    case FontAwesomeTextClass.SharpSolid:
      return FontAwesomeTextAbbreviation.SharpSolid;
    case FontAwesomeTextClass.Solid:
      return FontAwesomeTextAbbreviation.Solid;
    case FontAwesomeTextClass.Thin:
      return FontAwesomeTextAbbreviation.Thin;
    default:
      throw new Error(`Invalid text class ${textClass}`);
  }
}
