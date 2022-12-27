import React from 'react';
import './app.scss';
import { Hero } from './componets/Hero/Hero';
import { Form } from './componets/Form/Form';
import { Nav } from './componets/Nav/Nav';
import { CardsBlock } from './componets/CardsBlock/CardsBlock';

function App() {
  return (
    <div className="app">
      <header>
        <Nav />
        <Hero />
      </header>

      <CardsBlock />

      <Form />
    </div>
  );
}

export default App;
