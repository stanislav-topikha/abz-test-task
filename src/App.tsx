import React from 'react';
import './app.scss';
import { Cards } from './componets/Cards/Cards';
import { Container } from './componets/Container/Container';
import { Hero } from './componets/Hero/Hero';
import { Nav } from './componets/Nav/Nav';
import { useUsers } from './hooks/useUsers';

function App() {
  const { users } = useUsers();

  return (
    <div className="app">
      <header>
        <Nav />
        <Hero />
      </header>

      <Container>
        <Cards users={users} />
      </Container>
    </div>
  );
}

export default App;
