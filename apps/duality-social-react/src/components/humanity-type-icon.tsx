import { HumanityTypeEnum } from '@duality-social/duality-social-lib';
import React from 'react';

interface HumanityTypeIconProps {
  humanityType: HumanityTypeEnum;
}

const HumanityTypeIcon: React.FC<HumanityTypeIconProps> = ({
  humanityType,
}) => {
  let icon = null;
  switch (humanityType) {
    case HumanityTypeEnum.Human:
      icon = <i className="fa-solid fa-user"></i>;
      break;
    case HumanityTypeEnum.Ai:
      icon = <i className="fa-solid fa-robot"></i>;
      break;
    case HumanityTypeEnum.Bot:
      icon = <i className="fa-solid fa-desktop"></i>;
      break;
    default:
      icon = <i className="fa-solid fa-user"></i>;
  }

  return icon;
};

export default HumanityTypeIcon;
