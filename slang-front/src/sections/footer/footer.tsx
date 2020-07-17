import React, { useContext } from 'react';
import { AppContext } from 'App';

const Footer = () => {
  const { checkAnswer } = useContext(AppContext);

  console.log(checkAnswer);

  return (
    <div className='border-top py-5'>
      {checkAnswer}
      <div className='container d-flex justify-content-between'>
        <button
          type='button'
          className='btn btn-outline-primary text-uppercase mx-5 px-4 py-3'
        >
          JUMP TO NEXT
        </button>

        <button
          type='button'
          className={`btn text-uppercase mx-5 px-4 py-3 ${
            checkAnswer ? 'btn-success' : 'btn-secondary'
          }`}
          disabled={!checkAnswer}
        >
          Check The Answer
        </button>
      </div>
    </div>
  );
};

export default Footer;
