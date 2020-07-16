import produce from 'immer';
import React, { useCallback, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import LetterCard from '../../controls/letter-box/letter-box';

const MiddleSection = () => {
  const [letters, setLetters] = useState<string[][]>([
    ['M', 'U', 'S', 'I', 'C'],
    new Array(5).fill(''),
  ]);

  const moveCard = useCallback(
    (dragIndex: number, dragList: number, dropIndex: number, dropList) => {
      setLetters(
        produce(letters, (draft) => {
          const dragged = letters[dragList][dragIndex];
          draft[dragList][dragIndex] = '';
          draft[dropList][dropIndex] = dragged;
        })
      );
    },
    [letters]
  );

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
    const gapsIndex = 1;
    return (
      <div className='d-flex mb-5'>
        {btnHearWord}

        <div className='align-self-center ml-5 fs_15 d-flex'>
          {letters[gapsIndex].map((l, i) => (
            <LetterCard
              key={i}
              index={i}
              letter={l}
              listIndex={gapsIndex}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    );
  }, [letters]);

  const wordBlocks = useMemo(() => {
    const blockIndex = 0;
    return (
      <div className='d-flex fs_15 justify-content-center'>
        {letters[blockIndex].map((l, i) => (
          <LetterCard
            key={i}
            index={i}
            letter={l}
            listIndex={blockIndex}
            moveCard={moveCard}
          />
        ))}
      </div>
    );
  }, [letters]);

  return (
    <div className='container px-5 d-flex justify-content-center'>
      <DndProvider backend={HTML5Backend}>
        <div>
          <h2 className='mb-5 text-center'>Write what you listen</h2>

          {wordGaps}

          {wordBlocks}
        </div>
      </DndProvider>
    </div>
  );
};

export default MiddleSection;
