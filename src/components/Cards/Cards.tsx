import React from 'react';
import './cards.scss';
import { User } from '../../types/api';
import { Card } from '../Card/Card';

interface Props {
  users: User[];
}

export const Cards:React.FC<Props> = ({ users }) => (
  <div className="cards">
    <h2 className="cards__title">
      Working with GET request
    </h2>

    <div className="cards__cards">
      {users.map((user) => (
        <Card
          user={user}
          key={user.id}
        />
      ))}
    </div>
  </div>
);
