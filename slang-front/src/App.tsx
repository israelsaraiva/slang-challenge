import './App.scss';

import React, { useState } from 'react';

import Footer from './sections/footer/footer';
import Header from './sections/header/header';
import MiddleSection from './sections/middle/middle';

import $ from 'jquery';

interface AppContextModel {
  checkAnswer: boolean;
  toggleCheckAnswer?: (value: boolean) => void;
}

export const AppContext = React.createContext<AppContextModel>({
  checkAnswer: false,
});

const App = () => {
  const [checkAnswer, toggleCheckAnswer] = useState(false);

  return (
    <AppContext.Provider value={{ checkAnswer, toggleCheckAnswer }}>
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
