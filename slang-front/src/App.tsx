import './App.scss';

import $ from 'jquery';
import React, { useState, useEffect } from 'react';

import Footer from './sections/footer/footer';
import Header from './sections/header/header';
import MiddleSection from './sections/middle/middle';

interface AppContextModel {
  checkAnswer: boolean;
  toggleCheckAnswer?: (value: boolean) => void;
  keyPressed?: number;
}

export const AppContext = React.createContext<AppContextModel>({
  checkAnswer: false,
});

const App = () => {
  const [checkAnswer, toggleCheckAnswer] = useState(false);
  const [keyPressed, setKeyPressed] = useState<number>();

  $(document).on('keypress', (e) => {
    e.preventDefault();
    setKeyPressed(e.which);
  });

  $(document).on('keyup', (e) => {
    e.preventDefault();
    setKeyPressed(e.which);
  });

  return (
    <AppContext.Provider value={{ checkAnswer, toggleCheckAnswer, keyPressed }}>
      <div className='app-container'>
        <Header />

        <div className='my-auto'>
          <MiddleSection />
        </div>

        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
