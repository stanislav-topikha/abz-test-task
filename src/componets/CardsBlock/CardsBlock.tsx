import React from 'react';
import { useUsers } from '../../hooks/useUsers';
import { Button } from '../Button/Button';
import { Cards } from '../Cards/Cards';
import { Container } from '../Container/Container';
import { Loader } from '../Loader/Loader';

export const CardsBlock: React.FC = () => {
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
      <Cards users={users} />

      <div className="app__button">
        {loading && (
          <Loader size={40} />
        )}

        {shouldShowButton && (
          <Button
            onClick={() => loadMoreUsers()}
          >
            Show more
          </Button>
        )}
      </div>

    </Container>
  );
};
