import { AppContext } from 'App';
import { AudioSpeech } from 'controls/audiospeech/audiospeech';
import { Loading } from 'controls/loading/loading';
import produce from 'immer';
import { SpeechModel } from 'models/speech.model';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ActionsService } from 'services/actions.service';
import { shuffle } from 'util/functions';

import LetterCard from '../../controls/letter-box/letter-box';

const BACKSPACE_CODE = 8;

const MiddleSection = () => {
  const [letters, setLetters] = useState<string[][]>([[], []]);
  const [loadingWords, setLoadingWords] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioData, setAudioData] = useState<SpeechModel>();

  const {
    toggleCheckAnswer,
    setCurrentWord,
    setWords,
    currentWord,
    setWordProvided,
  } = useContext(AppContext);

  useEffect(() => {
    setLoadingWords(true);
    ActionsService.getWords().then((res) => {
      const word = res.data[0];

      setLetters([shuffle(word.split('')), new Array(word.length).fill('')]);
      setLoadingWords(false);

      if (setCurrentWord) {
        setCurrentWord(word);
      }

      if (setWords) {
        setWords(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (currentWord) {
      setLoadingAudio(true);
      ActionsService.getSpeech(currentWord).then((res) => {
        setAudioData(res.data);
        setLoadingAudio(false);
      });
    }
  }, [currentWord]);

  useEffect(() => {
    if (toggleCheckAnswer && currentWord) {
      const filledCards = letters[1].filter((l) => l !== '').length;

      if (setWordProvided) {
        if (filledCards > 0) {
          toggleCheckAnswer(filledCards === currentWord.length);
          setWordProvided(letters[1]);
        } else {
          setWordProvided([]);
        }
      }
    }
  }, [letters]);

  const onKeyDown = (keyCode: number) => {
    console.log(keyCode);

    if (keyCode) {
      if (keyCode !== BACKSPACE_CODE) {
        const key = String.fromCharCode(keyCode).toLowerCase();

        const index = letters[0].findIndex(
          (letter) => letter.toLowerCase() === key
        );

        const emptyIndex = letters[1].findIndex((space) => space === '');

        if (index !== -1) {
          setLetters(
            produce(letters, (draft) => {
              draft[0][index] = '';
              draft[1][emptyIndex] = key;
            })
          );
        }
      } else {
        const lastFilledIndex =
          letters[1].findIndex((space) => space === '') - 1;

        if (lastFilledIndex !== -1) {
          const emptyIndex = letters[0].findIndex((space) => space === '');

          setLetters(
            produce(letters, (draft) => {
              const value = draft[1][lastFilledIndex];
              draft[1][lastFilledIndex] = '';
              draft[0][emptyIndex] = value;
            })
          );
        }
      }
    }
  };

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

  const wordGaps = useMemo(() => {
    const gapsIndex = 1;

    return (
      <div className='d-flex mb-5'>
        {audioData && <AudioSpeech audioData={audioData} />}

        <div className='align-self-center ml-5 fs_15 d-flex'>
          {letters[gapsIndex].map((l, i) => (
            <LetterCard
              key={i}
              index={i}
              letter={l}
              listIndex={gapsIndex}
              moveCard={moveCard}
              inputChanged={onKeyDown}
            />
          ))}
        </div>
      </div>
    );
  }, [letters, audioData]);

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
            readonly
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
    <div
      id='middle_section'
      className='container px-5 d-flex justify-content-center position-relative'
    >
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
