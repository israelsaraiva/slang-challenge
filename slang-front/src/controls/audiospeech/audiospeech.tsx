import { SpeechModel } from 'models/speech.model';
import React, { useState } from 'react';

type Props = {
  audioData: SpeechModel;
};

export const AudioSpeech = ({ audioData }: Props) => {
  const [speed, setSpeed] = useState(true);

  const playAudio = () => {
    if (audioData) {
      //   const data = speed ? audioData.normal : audioData.slow;
      const audio = new Audio(audioData.normal);
      //   setSpeed(!speed);
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
        <span className='icon-volume-medium fs_15 mr-3 text-nowrap' /> Hear word
      </button>
    </div>
  );
};
