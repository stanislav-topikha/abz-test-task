/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import { User } from '../../types/api';
import backupAvatar from '../../static/images/photo-cover.svg';
import './card.scss';
import { FollowingTooltip } from '../FollowingTooltip/FollowingTooltip';

interface Props {
  user: User;
}

export const Card: React.FC<Props> = ({
  user: {
    name,
    email,
    phone,
    photo,
    position,
  },
}) => {
  const [imageSrc, setImageSrc] = useState(photo);
  const [tooltipTitle, setTooltipText] = useState<string | null>(null);

  const handleFaileImageLoading = () => {
    if (imageSrc === backupAvatar) {
      return;
    }

    setImageSrc(backupAvatar);
  };

  return (
    <div className="card">
      {tooltipTitle && (
        <FollowingTooltip
          title={tooltipTitle}
        />
      )}

      <img
        className="card__img"
        src={imageSrc}
        alt={name}
        onError={handleFaileImageLoading}
      />

      <h3 className="card__text">{name}</h3>
      <div className="card__wrapper">
        <p className="card__text">{position}</p>
        <a
          className="card__text"
          href={`mailto:${email}`}
          onMouseOver={(e) => setTooltipText(e.currentTarget.text)}
          onMouseLeave={() => setTooltipText(null)}
        >
          {email}
        </a>
        <a
          className="card__text"
          href={`tel:${phone}`}
          onMouseOver={(e) => setTooltipText(e.currentTarget.text)}
          onMouseLeave={() => setTooltipText(null)}
        >
          {phone}
        </a>
      </div>
    </div>
  );
};
