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
  currentWord: number;
  setCurrentWord?: Dispatch<SetStateAction<number>>;
  wordProvided?: string[];
  setWordProvided?: Dispatch<SetStateAction<string[]>>;
}

export const AppContext = React.createContext<AppContextModel>({
  checkAnswer: false,
  currentWord: 0,
});

const App = () => {
  const [checkAnswer, toggleCheckAnswer] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<number>(0);
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
