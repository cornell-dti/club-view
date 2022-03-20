import React from 'react';
import {
  instragramIcon,
  facebookIcon,
  listservIcon,
  globeIcon,
} from '../../../icons/tags';
import './SocialTag.css';

type Prop = {
  socialName: string;
};

const SocialTag = ({socialName}: Prop) => {
  const renderIcon = (socialName: string) => {
    const nameParsed = socialName.toLowerCase();
    switch (nameParsed) {
      case 'instagram':
        return instragramIcon;
      case 'facebook':
        return facebookIcon;
      case 'listserv':
        return listservIcon;
      case 'globe':
        return globeIcon;
    }
  };

  return (
    <div className="socialTag">
      <img className="socialIcon" src={renderIcon(socialName)} />
      <div className="socialName">{socialName}</div>
    </div>
  );
};

export default SocialTag;
