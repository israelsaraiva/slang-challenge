import React from 'react';

const MiddleSection = () => {
  return (
    <div className='container px-5 d-flex justify-content-center'>
      <div>
        <h2 className='mb-5 text-center'>Write what you listen</h2>
        <div className='d-flex mb-5'>
          <button
            type='button'
            className='btn btn-primary d-flex justify-content-center py-3 px-3 font-weight-bold'
          >
            <span className='icon-volume-medium fs_15 mr-3' /> Hear word
          </button>
          <div className='align-self-center ml-5 fs_15 d-flex'>
            <div className='border rounded p-4 mx-2'></div>
            <div className='border rounded p-4 mx-2'></div>
            <div className='border rounded p-4 mx-2'></div>
          </div>
        </div>
        <div className='d-flex fs_15 justify-content-center'>
          <div className='border rounded py-2 px-3 mx-2'>T</div>
          <div className='border rounded py-2 px-3 mx-2'>R</div>
          <div className='border rounded py-2 px-3 mx-2'>Y</div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
