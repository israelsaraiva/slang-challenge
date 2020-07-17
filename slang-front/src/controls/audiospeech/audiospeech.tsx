import React, { useEffect, useState } from 'react';
import { ActionsService } from 'services/actions.service';

type Props = {
  word: string;
  setLoadingAudio: (value: boolean) => void;
};

export const AudioSpeech = ({ word, setLoadingAudio }: Props) => {
  const [audioData, setAudioData] = useState<any>();

  useEffect(() => {
    if (word) {
      setLoadingAudio(true);
      ActionsService.getSpeech(word).then((res) => {
        setAudioData(res.data);
        setLoadingAudio(false);
      });
    }
  }, []);

  const playAudio = () => {
    console.log(audioData);
    if (audioData) {
      const audio = new Audio(audioData);
      console.log(audioData);

      audio.play();
    }
  };

  return (
    <div>
      <button
        type='button'
        className='btn btn-primary d-flex justify-content-center py-3 px-3 font-weight-bold'
        onClick={playAudio}
      >
        <span className='icon-volume-medium fs_15 mr-3' /> Hear word
      </button>
    </div>
  );
};
