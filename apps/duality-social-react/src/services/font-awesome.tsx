import { DefaultReactionsTypeEnum } from '@duality-social/duality-social-lib';
import { ReactNode } from 'react';
import { reactionEmojis, reactionFontAwesomeIcons } from '../utils/reactions';

export function getReaction(reaction: DefaultReactionsTypeEnum): ReactNode {
  return <i className={reactionFontAwesomeIcons[reaction]} />;
}

export function getReactionEmoji(reaction: DefaultReactionsTypeEnum): string {
  return reactionEmojis[reaction];
}
