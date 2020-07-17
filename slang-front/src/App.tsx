import './App.scss';

import React, { Dispatch, SetStateAction, useState } from 'react';

import Footer from './sections/footer/footer';
import Header from './sections/header/header';
import MiddleSection from './sections/middle/middle';

interface AppContextModel {
  checkAnswer: boolean;
  toggleCheckAnswer?: (value: boolean) => void;
  words?: string[];
  setWords?: Dispatch<SetStateAction<string[]>>;
  currentWord?: string;
  setCurrentWord?: Dispatch<SetStateAction<string>>;
  wordProvided?: string[];
  setWordProvided?: Dispatch<SetStateAction<string[]>>;
}

export const AppContext = React.createContext<AppContextModel>({
  checkAnswer: false,
});

const App = () => {
  const [checkAnswer, toggleCheckAnswer] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [wordProvided, setWordProvided] = useState<string[]>([]);

  return (
    <AppContext.Provider
      value={{
        checkAnswer,
        toggleCheckAnswer,
        words,
        setWords,
        currentWord,
        setCurrentWord,
        wordProvided,
        setWordProvided,
      }}
    >
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
