import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import { ToastContainer } from 'react-toastify';
import { Hero } from './componets/Hero/Hero';
import { Nav } from './componets/Nav/Nav';
import { Main } from './componets/Main/Main';
import { Footer } from './componets/Footer/Footer';

function App() {
  return (
    <>
      <div className="app">
        <header>
          <Nav />
          <Hero />
        </header>

        <Main />

        <Footer />
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
