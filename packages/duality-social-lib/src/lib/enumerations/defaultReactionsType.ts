import { IconName } from '@fortawesome/fontawesome-common-types';

export const DefaultReactions = ['Angry', 'Celebrate', 'Hug', 'Huh?', 'Laugh', 'Like', 'Love', 'Sad', 'Wow'] as const;
export type DefaultReactionsType = typeof DefaultReactions[number];

export enum DefaultReactionsTypeEnum {
  Angry = 'Angry',
  Celebrate = 'Celebrate',
  Hug = 'Hug',
  Huh = 'Huh?',
  Laugh = 'Laugh',
  Like = 'Like',
  Love = 'Love',
  Sad = 'Sad',
  Wow = 'Wow',
}

export const ReactionTypeIcons = {
  [DefaultReactionsTypeEnum.Angry]: 'face-angry',
  [DefaultReactionsTypeEnum.Celebrate]: 'party-horn',
  [DefaultReactionsTypeEnum.Hug]: 'face-smiling-hands',
  [DefaultReactionsTypeEnum.Huh]: 'face-confused',
  [DefaultReactionsTypeEnum.Laugh]: 'face-laugh',
  [DefaultReactionsTypeEnum.Like]: 'thumbs-up',
  [DefaultReactionsTypeEnum.Love]: 'heart',
  [DefaultReactionsTypeEnum.Sad]: 'face-sad-tear',
  [DefaultReactionsTypeEnum.Wow]: 'face-hushed',
};

export interface IReactionArrayEntry {
  reaction: DefaultReactionsTypeEnum;
  icon: IconName;
}
export const DefaultReactionsArray: IReactionArrayEntry[] = [
  {
    reaction: DefaultReactionsTypeEnum.Angry,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Angry] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Celebrate,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Celebrate] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Hug,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Hug] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Huh,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Huh] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Laugh,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Laugh] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Like,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Like] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Love,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Love] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Sad,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Sad] as IconName,
  },
  {
    reaction: DefaultReactionsTypeEnum.Wow,
    icon: ReactionTypeIcons[DefaultReactionsTypeEnum.Wow] as IconName,
  }];


export function getReactionTypeIcon(reactionType: DefaultReactionsTypeEnum): IconName {
  if (!ReactionTypeIcons[reactionType]) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  const iconName = ReactionTypeIcons[reactionType] as IconName;
  if (!iconName) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  return iconName;
}
