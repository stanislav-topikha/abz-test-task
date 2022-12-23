import React from 'react';
import './app.scss';
import { Button } from './componets/Button/Button';
import { Cards } from './componets/Cards/Cards';
import { Container } from './componets/Container/Container';
import { Hero } from './componets/Hero/Hero';
import { Nav } from './componets/Nav/Nav';
import { useUsers } from './hooks/useUsers';

function App() {
  const { users, loadMoreUsers, isLastPage } = useUsers();

  return (
    <div className="app">
      <header>
        <Nav />
        <Hero />
      </header>

      <Container>
        <Cards users={users} />

        {!isLastPage && (
          <div className="app__button">
            <Button
              onClick={() => loadMoreUsers()}
            >
              Show more
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
