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

    <h3>{name}</h3>
    <p>{position}</p>

    <a href={`mailto:${email}`}>
      {email}
    </a>

    <a href={`tel:${phone}`}>
      {phone}
    </a>
  </div>
);
