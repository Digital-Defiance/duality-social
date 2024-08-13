import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { HumanityTypeEnum } from '@duality-social/duality-social-lib';

interface HumanityTypeIconProps {
  humanityType: HumanityTypeEnum;
}

const HumanityTypeIcon: React.FC<HumanityTypeIconProps> = ({ humanityType }) => {
  let icon;
  switch (humanityType) {
    case HumanityTypeEnum.Human:
      icon = faUser;
      break;
    case HumanityTypeEnum.Ai:
      icon = faRobot;
      break;
    case HumanityTypeEnum.Bot:
      icon = faDesktop;
      break;
    default:
      icon = faUser;
  }

  return <FontAwesomeIcon icon={icon} />;
};

export default HumanityTypeIcon;