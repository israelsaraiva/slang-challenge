import './middle.scss';

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
import { createEmptyBlocks, scrambleLetters } from 'util/functions';

import LetterCard from '../../controls/letter-box/letter-box';

const BACKSPACE_CODE = 8;

const WORDS_INDEX = 0;
const GAPS_INDEX = 1;

const MiddleSection = () => {
  const [letters, setLetters] = useState<string[][]>([[], []]);
  const [loadingWords, setLoadingWords] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioData, setAudioData] = useState<SpeechModel>();

  const {
    toggleCheckAnswer,
    setWords,
    currentWord,
    setWordProvided,
    words,
    verified,
  } = useContext(AppContext);

  useEffect(() => {
    setLoadingWords(true);
    ActionsService.getWords().then((res) => {
      const word = res.data[WORDS_INDEX];

      setLetters([scrambleLetters(word), createEmptyBlocks(word)]);
      setLoadingWords(false);

      if (setWords) {
        setWords(res.data);
      }
    });
  }, []);

  useEffect(() => {
    setAudioData({ normal: '', slow: '' });
    // if (words && !!words.length) {
    //   setLoadingAudio(true);
    //   ActionsService.getSpeech(words[currentWord]).then((res) => {
    //     setAudioData(res.data);
    //     setLoadingAudio(false);
    //   });
    // }
  }, [currentWord, words]);

  useEffect(() => {
    if (words && !!words.length) {
      const word = words[currentWord];
      setLetters([scrambleLetters(word), createEmptyBlocks(word)]);
    }
  }, [currentWord]);

  const allFilled = () => {
    return !!letters[GAPS_INDEX].length
      ? letters[GAPS_INDEX].map((l) => l !== '').reduce(
          (prev, curr) => prev && curr
        )
      : false;
  };

  const getCurrentWord = () => {
    if (words) {
      return words[currentWord];
    }

    return '';
  };

  useEffect(() => {
    if (toggleCheckAnswer) {
      if (setWordProvided && words) {
        if (allFilled()) {
          toggleCheckAnswer(true);
          setWordProvided(letters[GAPS_INDEX]);
        } else {
          setWordProvided([]);
        }
      }
    }
  }, [letters, words, currentWord]);

  const onKeyDown = (keyCode: number) => {
    if (keyCode) {
      if (keyCode !== BACKSPACE_CODE) {
        const key = String.fromCharCode(keyCode).toLowerCase();

        const index = letters[WORDS_INDEX].findIndex(
          (letter) => letter.toLowerCase() === key
        );

        const emptyIndex = letters[GAPS_INDEX].findIndex(
          (space) => space === ''
        );

        if (index !== -1) {
          setLetters(
            produce(letters, (draft) => {
              draft[WORDS_INDEX][index] = '';
              draft[GAPS_INDEX][emptyIndex] = key;
            })
          );
        }
      } else {
        const lastFilledIndex = letters[GAPS_INDEX].findIndex(
          (space) => space !== ''
        );

        if (lastFilledIndex !== -1) {
          const emptyIndex = letters[WORDS_INDEX].findIndex(
            (space) => space === ''
          );

          setLetters(
            produce(letters, (draft) => {
              const value = draft[GAPS_INDEX][lastFilledIndex];
              draft[GAPS_INDEX][lastFilledIndex] = '';
              draft[WORDS_INDEX][emptyIndex] = value;
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
    const word = getCurrentWord();

    return (
      <div className='mb-4'>
        <div className='fs_15 d-flex flex-wrap justify-content-center'>
          {letters[GAPS_INDEX].map((l, i) => {
            let correctAnswer;

            if (verified && allFilled()) {
              correctAnswer = l === word[i];
            }

            return (
              <div key={i} className='mb-3'>
                <LetterCard
                  index={i}
                  letter={l}
                  listIndex={GAPS_INDEX}
                  moveCard={moveCard}
                  inputChanged={onKeyDown}
                  correct={correctAnswer}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [letters, audioData, verified]);

  const wordBlocks = useMemo(() => {
    return (
      <div className='d-flex flex-wrap fs_15 justify-content-center'>
        {letters[WORDS_INDEX].map((l, i) => (
          <div className='mb-3'>
            <LetterCard
              key={i}
              index={i}
              letter={l}
              listIndex={WORDS_INDEX}
              moveCard={moveCard}
              readonly
            />
          </div>
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
      className='app_middle container px-2 d-flex justify-content-center position-relative'
    >
      <DndProvider backend={HTML5Backend}>
        {(loadingWords || loadingAudio) && loadingHtml}

        {!loadingWords && !loadingAudio && (
          <div className='w-100'>
            <h2 className='mb-5 text-center'>Write what you listen</h2>

            <div className='mb-5 d-flex justify-content-center'>
              {audioData && <AudioSpeech audioData={audioData} />}
            </div>

            {wordGaps}

            {wordBlocks}
          </div>
        )}
      </DndProvider>
    </div>
  );
};

export default MiddleSection;
