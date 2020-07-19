import './App.scss';

import $ from 'jquery';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ActionsService } from 'services/actions.service';

import Footer from './sections/footer/footer';
import Header from './sections/header/header';
import MiddleSection from './sections/middle/middle';
import { SpeechModel } from 'models/speech.model';

interface AppContextModel {
  checkAnswer: boolean;
  toggleCheckAnswer?: (value: boolean) => void;
  words?: string[];
  setWords?: Dispatch<SetStateAction<string[]>>;
  currentWord: number;
  setCurrentWord?: Dispatch<SetStateAction<number>>;
  wordProvided?: string[];
  setWordProvided?: Dispatch<SetStateAction<string[]>>;
  verified: boolean;
  setVerified?: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = React.createContext<AppContextModel>({
  checkAnswer: false,
  verified: false,
  currentWord: 0,
});

const App = () => {
  const [checkAnswer, toggleCheckAnswer] = useState(false);
  const [verified, setVerified] = useState(false);
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [wordProvided, setWordProvided] = useState<string[]>([]);

  const [loadingWords, setLoadingWords] = useState(false);
  const [words, setWords] = useState<string[]>([]);

  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioData, setAudioData] = useState<SpeechModel>();

  useEffect(() => {
    setLoadingWords(true);
    ActionsService.getWords()
      .then((res) => {
        setWords(res.data);
        setLoadingWords(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingWords(false);
      });
  }, []);

  useEffect(() => {
    if (words && !!words.length) {
      setLoadingAudio(true);
      ActionsService.getSpeech(words[currentWord])
        .then((res) => {
          setAudioData(res.data);
          setLoadingAudio(false);
        })
        .catch((err) => console.log(err));
    }
  }, [currentWord, words]);

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
        verified,
        setVerified,
      }}
    >
      <div className='app-container'>
        <Header />

        <div className='my-auto'>
          <MiddleSection
            loadingWords={loadingWords}
            words={words}
            loadingAudio={loadingAudio}
            audioData={audioData}
          />
        </div>

        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
