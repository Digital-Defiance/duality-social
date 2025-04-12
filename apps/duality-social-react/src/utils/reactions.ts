import {
  DefaultReactionsEmoji,
  DefaultReactionsTypeEnum,
} from '@duality-social/duality-social-lib';

export const reactionEmojis: { [type in DefaultReactionsTypeEnum]: string } = {
  [DefaultReactionsTypeEnum.Angry]: DefaultReactionsEmoji.Angry,
  [DefaultReactionsTypeEnum.Care]: DefaultReactionsEmoji.Care,
  [DefaultReactionsTypeEnum.Celebrate]: DefaultReactionsEmoji.Celebrate,
  [DefaultReactionsTypeEnum.Hug]: DefaultReactionsEmoji.Hug,
  [DefaultReactionsTypeEnum['Huh?']]: DefaultReactionsEmoji['Huh?'],
  [DefaultReactionsTypeEnum.Laugh]: DefaultReactionsEmoji.Laugh,
  [DefaultReactionsTypeEnum.Like]: DefaultReactionsEmoji.Like,
  [DefaultReactionsTypeEnum.Love]: DefaultReactionsEmoji.Love,
  [DefaultReactionsTypeEnum.Sad]: DefaultReactionsEmoji.Sad,
  [DefaultReactionsTypeEnum.Wow]: DefaultReactionsEmoji.Wow,
  [DefaultReactionsTypeEnum.Yuck]: DefaultReactionsEmoji.Yuck,
};

export const reactionFontAwesomeIcons: {
  [type in DefaultReactionsTypeEnum]: string;
} = {
  [DefaultReactionsTypeEnum.Angry]: 'fa-solid fa-face-angry',
  [DefaultReactionsTypeEnum.Care]: 'fa-solid fa-hands-holding-heart',
  [DefaultReactionsTypeEnum.Celebrate]: 'fa-solid fa-party-horn',
  [DefaultReactionsTypeEnum.Hug]: 'fa-solid fa-face-smiling-hands',
  [DefaultReactionsTypeEnum['Huh?']]: 'fa-solid fa-face-confused',
  [DefaultReactionsTypeEnum.Laugh]: 'fa-solid fa-face-laugh',
  [DefaultReactionsTypeEnum.Like]: 'fa-solid fa-thumbs-up',
  [DefaultReactionsTypeEnum.Love]: 'fa-solid fa-heart',
  [DefaultReactionsTypeEnum.Sad]: 'fa-solid fa-face-sad-tear',
  [DefaultReactionsTypeEnum.Wow]: 'fa-solid fa-face-hushed',
  [DefaultReactionsTypeEnum.Yuck]: 'fa-solid fa-face-dizzy',
};
