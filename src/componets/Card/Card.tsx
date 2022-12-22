import React from 'react';
import { User } from '../../types/api';
import './card.scss';

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
}) => (
  <div className="card">
    <img
      className="card__img"
      src={photo}
      alt={`${name}`}
    />

    <h3 className="card__text">{name}</h3>
    <p className="card__text">{position}</p>

    <a
      className="card__text"
      href={`mailto:${email}`}
    >
      {email}
    </a>

    <a
      className="card__text"
      href={`tel:${phone}`}
    >
      {phone}
    </a>
  </div>
);
