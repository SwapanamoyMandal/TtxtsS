import React, { useState } from 'react';
import { useAppContext } from '../Context.jsx/AppContext';

const Switch = () => {
  const {lockRoom, setLockRoom} = useAppContext()

  const handleCheckboxChange = () => {
    setLockRoom(!lockRoom);
  };

  return (
    <label className='flex flex-col gap-1 cursor-pointer select-none items-center '>
      <div>
        <h2 className='text-balance font-semibold'>rock</h2>
      </div>
      <div className='relative'>
        <input
          type='checkbox'
          checked={lockRoom}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <div className={`block sm:h-8 h-5 sm:w-14 w-10 rounded-full transition ${lockRoom ? 'bg-red-500' : 'bg-[#E5E7EB]'}`} />
        <div
          className={`dot absolute top-1 flex h-3 sm:h-6 w-3 sm:w-6 items-center justify-center rounded-full bg-white transition transform ${
            lockRoom ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {lockRoom ? (
            <span className='active'>
              <svg
                width='11'
                height=''
                viewBox='0 0 11 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972Z'
                  fill='white'
                  stroke='white'
                  strokeWidth='0.4'
                />
              </svg>
            </span>
          ) : (
            <span className='inactive text-body-color'>
              <svg
                className='h-4 w-3 sm:w-4 stroke-current'
                fill='none'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </label>
  );
};

export default Switch;
