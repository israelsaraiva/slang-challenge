import './App.scss';

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';

import Footer from './sections/footer/footer';
import Header from './sections/header/header';
import MiddleSection from './sections/middle/middle';

import $ from 'jquery';

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

  $(function () {
    if ($('*:focus').length == 0) {
      $('#fillbox_10').focus();
    }

    $(document).on('keyup', (e) => {
      e.preventDefault();

      if (e.which === 13) {
        const checkAnswerButton = $('#check_answer_btn');

        if (checkAnswerButton.is(':disabled')) {
          $('#jump_btn').click();
        } else {
          $('#check_answer_btn').click();
        }

        e.stopImmediatePropagation();
      }
    });
  });

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
