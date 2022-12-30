import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import { ToastContainer } from 'react-toastify';
import { Hero } from './components/Hero/Hero';
import { Nav } from './components/Nav/Nav';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { UsersProvider } from './hooks/useUsers';

function App() {
  return (
    <>
      <UsersProvider>
        <div className="app">
          <header>
            <Nav />
            <Hero />
          </header>

          <Main />

          <Footer />
        </div>
      </UsersProvider>

      <ToastContainer />
    </>
  );
}

export default App;
