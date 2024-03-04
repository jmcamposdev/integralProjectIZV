import React, { useState, useEffect } from 'react'

const Modal = ({ title, message, isSuccess, isError, isWarning }) => {
  const [opacity, setOpacity] = useState(1)
  const [display, setDisplay] = useState('flex')

  const handleClose = () => {
    setOpacity(0)
    setTimeout(() => {
      setDisplay('hidden')
    }, 500)
  }

  useEffect(() => {
    const timeout = setTimeout(handleClose, 2000) // after 2 seconds the function to close the window is called
    return () => clearTimeout(timeout) // clear the timeout after it happens
  }, []) // It's only executed once afte the component is called

  return (
    <div style={{ opacity, display, zIndex: '9999999999999999999' }} id='toast' className='gap-[15px] transition-all flex items-center w-full max-w-[350px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-boxdark absolute top-[40dvh] left-0' role='alert'>
      <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'>
        <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
        </svg>
        <span className='sr-only'>
          {title}
        </span>
      </div>
      <div className=' font-normal flex gap-[8px] flex-col'>
        <h4 className='text-black dark:text-white font-semibold capitalize font-medium'>{title}</h4>
        <p className='text-sm'>{message}</p>

      </div>
      <button
        onClick={handleClose}
        type='button' className='self-baseline ms-auto -mx-1.5 -my-1.5 bg-gray  dark:bg-meta-4 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-2 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:hover:bg-opacity-90 hover:brightness-90 h-fit' data-dismiss-target='#toast-success' aria-label='Close'
      >
        <span className='sr-only scale-110'>Close</span>
        <svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
        </svg>
      </button>
    </div>
  )
}

export default Modal
