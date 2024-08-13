import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { DefaultReactionsTypeEnum, DefaultReactionsIconMap } from '@duality-social/duality-social-lib';

interface ReactionIconProps {
  reactionType: DefaultReactionsTypeEnum;
  textStyleType?: IconPrefix;
  style?: React.CSSProperties;
}

const ReactionIcon: React.FC<ReactionIconProps> = ({ 
  reactionType, 
  textStyleType = 'fas', // Default to 'fas' which is the prefix for solid icons
  style 
}) => {
  const iconName = DefaultReactionsIconMap.get(reactionType) as IconName;

  if (!iconName) {
    console.error(`Reaction type ${reactionType} not found`);
    return null;
  }

  return (
    <FontAwesomeIcon 
      icon={[textStyleType, iconName]} 
      style={style} 
    />
  );
};

export default ReactionIcon;