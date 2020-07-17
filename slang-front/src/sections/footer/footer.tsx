import './footer.scss';

import { AppContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';

const Footer = () => {
  const { checkAnswer, wordProvided, currentWord } = useContext(AppContext);

  const [buttonText, setButtonText] = useState<string>('Check The Answer');
  const [correct, setCorrect] = useState<boolean>();

  useEffect(() => {}, [wordProvided]);

  const checkAnswerAction = () => {
    if (currentWord && wordProvided && !!wordProvided.length) {
      const result = wordProvided
        .map((w, i) => w === currentWord[i])
        .reduce((prev, curr) => prev && curr);

      setButtonText('Continue');
      setCorrect(result);
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
      {checkAnswer}
      <div className='container d-flex justify-content-between'>
        <div>
          {correct === undefined && (
            <button
              type='button'
              className='btn btn-outline-primary text-uppercase font-weight-bold mx-5 px-4 py-3'
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
                <div>{currentWord}</div>
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
          onClick={checkAnswerAction}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Footer;
