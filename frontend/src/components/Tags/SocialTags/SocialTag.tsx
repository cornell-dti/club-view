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

const SocialTag = (props: Prop) => {
  const renderIcon = (socialName: string) => {
    const nameParsed = props.socialName.toLowerCase();
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
      <img className="socialIcon" src={renderIcon(props.socialName)} />
      <div className="socialName">{props.socialName}</div>
    </div>
  );
};

export default SocialTag;
