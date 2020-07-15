import React, { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import LetterCard from './lettercard';

const MiddleSection = () => {
  const wordLetters = ['M', 'U', 'S', 'I', 'C'];

  const btnHearWord = useMemo(() => {
    return (
      <button
        type='button'
        className='btn btn-primary d-flex justify-content-center py-3 px-3 font-weight-bold'
      >
        <span className='icon-volume-medium fs_15 mr-3' /> Hear word
      </button>
    );
  }, []);

  const wordGaps = useMemo(() => {
    return (
      <div className='d-flex mb-5'>
        {btnHearWord}

        <div className='align-self-center ml-5 fs_15 d-flex'>
          {wordLetters.map((wl, i) => (
            <div key={i} className='border rounded p-4 mx-2' />
          ))}
        </div>
      </div>
    );
  }, []);

  const wordBlocks = useMemo(() => {
    return (
      <div className='d-flex fs_15 justify-content-center'>
        {wordLetters.map((wl, i) => (<LetterCard key={i} index={i} listIndex={} />
          <div key={i} className='border rounded py-2 px-3 mx-2'>
            {wl}
          </div> 
        ))}
      </div>
    );
  }, []);

  return (
    <div className='container px-5 d-flex justify-content-center'>
      <DndProvider backend={HTML5Backend}><div>
        <h2 className='mb-5 text-center'>Write what you listen</h2>

        {wordGaps}

        {wordBlocks}
      </div></DndProvider>
      
    </div>
  );
};

export default MiddleSection;
