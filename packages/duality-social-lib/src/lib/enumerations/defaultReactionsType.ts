import { IconName } from '@fortawesome/fontawesome-svg-core';

export type DefaultReactions = 'Angry' | 'Celebrate' | 'Hug' | 'Huh?' | 'Laugh' | 'Like' | 'Love' | 'Sad' | 'Wow';

export enum DefaultReactionsType {
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
  [DefaultReactionsType.Angry]: 'face-angry',
  [DefaultReactionsType.Celebrate]: 'party-horn',
  [DefaultReactionsType.Hug]: 'face-smiling-hands',
  [DefaultReactionsType.Huh]: 'face-confused',
  [DefaultReactionsType.Laugh]: 'face-laugh',
  [DefaultReactionsType.Like]: 'thumbs-up',
  [DefaultReactionsType.Love]: 'heart',
  [DefaultReactionsType.Sad]: 'face-sad-tear',
  [DefaultReactionsType.Wow]: 'face-hushed',
};

export interface IReactionArrayEntry {
  reaction: DefaultReactionsType;
  icon: IconName;
}
export const DefaultReactionsArray: IReactionArrayEntry[] = [
  {
    reaction: DefaultReactionsType.Angry,
    icon: ReactionTypeIcons[DefaultReactionsType.Angry] as IconName,
  },
  {
    reaction: DefaultReactionsType.Celebrate,
    icon: ReactionTypeIcons[DefaultReactionsType.Celebrate] as IconName,
  },
  {
    reaction: DefaultReactionsType.Hug,
    icon: ReactionTypeIcons[DefaultReactionsType.Hug] as IconName,
  },
  {
    reaction: DefaultReactionsType.Huh,
    icon: ReactionTypeIcons[DefaultReactionsType.Huh] as IconName,
  },
  {
    reaction: DefaultReactionsType.Laugh,
    icon: ReactionTypeIcons[DefaultReactionsType.Laugh] as IconName,
  },
  {
    reaction: DefaultReactionsType.Like,
    icon: ReactionTypeIcons[DefaultReactionsType.Like] as IconName,
  },
  {
    reaction: DefaultReactionsType.Love,
    icon: ReactionTypeIcons[DefaultReactionsType.Love] as IconName,
  },
  {
    reaction: DefaultReactionsType.Sad,
    icon: ReactionTypeIcons[DefaultReactionsType.Sad] as IconName,
  },
  {
    reaction: DefaultReactionsType.Wow,
    icon: ReactionTypeIcons[DefaultReactionsType.Wow] as IconName,
  }];


export function getReactionTypeIcon(reactionType: DefaultReactionsType): IconName {
  if (!ReactionTypeIcons[reactionType]) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  const iconName = ReactionTypeIcons[reactionType] as IconName;
  if (!iconName) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  return iconName;
}
