import { IconName } from '@fortawesome/fontawesome-svg-core';

export enum ReactionType {
  Angry = 'Angry',
  Celebrate = 'Celebrate',
  Hug = 'Hug',
  Huh = 'Huh?',
  Laugh = 'laugh',
  Like = 'Like',
  Love = 'Love',
  Sad = 'Sad',
  Wow = 'Wow',
}

export const ReactionTypeIcons = {
  [ReactionType.Angry]: 'face-angry',
  [ReactionType.Celebrate]: 'party-horn',
  [ReactionType.Hug]: 'face-smiling-hands',
  [ReactionType.Huh]: 'face-confused',
  [ReactionType.Laugh]: 'face-laugh',
  [ReactionType.Like]: 'thumbs-up',
  [ReactionType.Love]: 'heart',
  [ReactionType.Sad]: 'face-sad-tear',
  [ReactionType.Wow]: 'face-hushed',
};

export function getReactionTypeIcon(reactionType: ReactionType): IconName {
  if (!ReactionTypeIcons[reactionType]) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  const iconName = ReactionTypeIcons[reactionType] as IconName;
  if (!iconName) {
    throw new Error(`Reaction type ${reactionType} is not supported.`);
  }
  return iconName;
}
