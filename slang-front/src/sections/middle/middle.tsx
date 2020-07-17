import { Loading } from 'controls/loading/loading';
import produce from 'immer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ActionsService } from 'services/actions.service';
import { shuffle } from 'util/functions';

import LetterCard from '../../controls/letter-box/letter-box';
import { AudioSpeech } from 'controls/audiospeech/audiospeech';

const MiddleSection = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>();
  const [letters, setLetters] = useState<string[][]>([[], []]);
  const [loadingWords, setLoadingWords] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  useEffect(() => {
    setLoadingWords(true);
    ActionsService.getWords().then((res) => {
      const word = res.data[0];
      setCurrentWord(word);
      setWords(res.data);
      setLetters([shuffle(word.split('')), new Array(word.length).fill('')]);
      setLoadingWords(false);
    });
  }, []);

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

  const audioSpeech = useMemo(() => {
    console.log('====================================');
    console.log(currentWord);
    console.log('====================================');
  }, [currentWord]);

  const wordGaps = useMemo(() => {
    const gapsIndex = 1;

    return (
      <div className='d-flex mb-5'>
        {/* {currentWord && (
          <AudioSpeech word={currentWord} setLoadingAudio={setLoadingAudio} />
        )} */}

        {audioSpeech}

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
  }, [letters, currentWord]);

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

  const loadingHtml = useMemo(
    () => (
      <div className='center-absolute'>
        <Loading />
      </div>
    ),
    []
  );

  return (
    <div className='container px-5 d-flex justify-content-center position-relative'>
      <DndProvider backend={HTML5Backend}>
        {(loadingWords || loadingAudio) && loadingHtml}

        {!loadingWords && !loadingAudio && (
          <div>
            <h2 className='mb-5 text-center'>Write what you listen</h2>

            {wordGaps}

            {wordBlocks}
          </div>
        )}
      </DndProvider>
    </div>
  );
};

export default MiddleSection;
