import React from 'react';

const Header = () => {
  return (
    <div className='container p-5 d-flex'>
      <div className='w-100'>
        <div className='progress mx-5'>
          <div
            className='progress-bar progress-bar-striped progress-bar-animated w-50'
            role='progressbar'
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
      <span className='icon-cross' />
    </div>
  );
};

export default Header;
