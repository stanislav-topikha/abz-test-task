import React from 'react';
import { useUsers } from '../../hooks/useUsers';
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

  const shouldShowButton = !isLastPage && !loading;

  return (
    <Container>
      <main>
        <Cards users={users} />

        <div className="app__button">
          <Button
            onClick={() => loadMoreUsers()}
            disabled={!shouldShowButton}
          >
            {loading ? (
              <Loader size={16} />
            ) : (
              'Show more'
            )}
          </Button>

        </div>
      </main>
    </Container>
  );
};
