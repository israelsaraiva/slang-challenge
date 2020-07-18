import './footer.scss';

import { AppContext } from 'App';
import negativeSound from 'assets/sounds/negative.mp3';
import positiveSound from 'assets/sounds/positive.mp3';
import React, { useContext, useEffect, useState } from 'react';

const DEFAULT_BTN_TEXT = 'Check The Answer';
const CHECKED_ANSWER_BTN_TEXT = 'Continue';

const Footer = () => {
  const {
    checkAnswer,
    wordProvided,
    currentWord,
    setCurrentWord,
    words,
  } = useContext(AppContext);

  const [buttonText, setButtonText] = useState<string>(DEFAULT_BTN_TEXT);
  const [correct, setCorrect] = useState<boolean>();

  const positiveAudio = new Audio(positiveSound);
  const negativeAudio = new Audio(negativeSound);

  useEffect(() => {
    positiveAudio.load();
    negativeAudio.load();
  }, []);

  const checkAnswerAction = () => {
    if (words && wordProvided && !!wordProvided.length) {
      const result = wordProvided
        .map((w, i) => w === words[currentWord][i])
        .reduce((prev, curr) => prev && curr);

      setButtonText(CHECKED_ANSWER_BTN_TEXT);
      setCorrect(result);

      if (result) {
        positiveAudio.play();
      } else {
        negativeAudio.play();
      }
    }
  };

  const continueAction = () => {
    if (setCurrentWord) {
      setCurrentWord(currentWord + 1);
      setButtonText(DEFAULT_BTN_TEXT);
      setCorrect(undefined);
    }
  };

  const getBtnColor = () => {
    if (correct !== undefined) {
      return correct ? 'btn-success' : 'btn-danger';
    } else {
      return checkAnswer ? 'btn-success' : 'btn-secondary';
    }
  };

  const getFootBgColor = () => {
    if (correct !== undefined) {
      return correct ? 'success' : 'fail';
    }

    return '';
  };

  return (
    <div className={`footer_section border-top py-5 ${getFootBgColor()}`}>
      {/* <div>{words && words.toString()}</div> */}

      <div className='container d-flex justify-content-between'>
        <div>
          {correct === undefined && (
            <button
              type='button'
              className='btn btn-outline-primary text-uppercase font-weight-bold mx-5 px-4 py-3'
              // onClick={playSound}
            >
              JUMP TO NEXT
            </button>
          )}

          {correct === false && (
            <div className='align-self-center text-danger d-flex'>
              <div className='rounded-circle bg-white p-4 d-flex'>
                <span className='icon-close align-self-center fs_15' />
              </div>

              <div className='align-self-center ml-5'>
                <h4>Correct answer:</h4>
                <div>{words && words[currentWord]}</div>
              </div>
            </div>
          )}

          {correct && (
            <div className='align-self-center text-success d-flex'>
              <div className='rounded-circle bg-white p-4 d-flex'>
                <span className='icon-check align-self-center fs_15' />
              </div>
              <h3 className='align-self-center ml-4'>Correct!</h3>
            </div>
          )}
        </div>

        <button
          type='button'
          className={`btn text-uppercase mx-5 px-4 py-3 font-weight-bold ${getBtnColor()}`}
          disabled={!checkAnswer}
          onClick={correct !== undefined ? continueAction : checkAnswerAction}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Footer;
