import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from 'App';

import './header.scss';

const Header = () => {
  const { words, currentWord } = useContext(AppContext);

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (words) {
      const factor = 100 / words.length;
      setPercent(currentWord * factor);
    }
  }, [words, currentWord]);

  return (
    <div className='app_header container'>
      <div className='w-100'>
        {words && (
          <div className='progress mr-3'>
            <div
              className='progress-bar progress-bar-striped progress-bar-animated'
              role='progressbar'
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={words.length}
              style={{ width: `${percent}%` }}
            />
          </div>
        )}
      </div>
      <span className='icon-cross' />
    </div>
  );
};

export default Header;
