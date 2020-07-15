import React from 'react';

const Footer = () => {
  return (
    <div className='border-top py-5'>
      <div className='container d-flex justify-content-between'>
        <button
          type='button'
          className='btn btn-outline-primary text-uppercase mx-5 px-4 py-3'
        >
          JUMP TO NEXT
        </button>

        <button
          type='button'
          className='btn btn-success text-uppercase mx-5 px-4 py-3'
        >
          Check The Answer
        </button>
      </div>
    </div>
  );
};

export default Footer;
