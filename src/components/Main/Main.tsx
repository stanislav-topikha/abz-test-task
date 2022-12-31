import React from 'react';
import { useUsers } from '../../context/useUsersContext';
import { Button } from '../Button/Button';
import { Cards } from '../Cards/Cards';
import { Container } from '../Container/Container';
import { Loader } from '../Loader/Loader';

export const Main: React.FC = () => {
  const {
    users, loadMoreUsers, isLastPage, loading,
  } = useUsers();

  if (!users.length && loading) {
    return (
      <Loader size={100} />
    );
  }

  return (
    <Container>
      <main id="users">
        <Cards users={users} />

        {!isLastPage && (
          <div className="app__button">
            <Button
              onClick={() => loadMoreUsers()}
              disabled={loading}
            >
              {loading ? (
                <Loader size={16} />
              ) : (
                'Show more'
              )}
            </Button>
          </div>
        )}
      </main>
    </Container>
  );
};
