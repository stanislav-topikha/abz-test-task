import React from 'react';
import './app.scss';
import { Hero } from './componets/Hero/Hero';
import { Nav } from './componets/Nav/Nav';
import { Main } from './componets/Main/Main';
import { Footer } from './componets/Footer/Footer';

function App() {
  return (
    <div className="app">
      <header>
        <Nav />
        <Hero />
      </header>

      <Main />

      <Footer />
    </div>
  );
}

export default App;
