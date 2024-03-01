import React from 'react'

const CircularProgressBar = ({ current, max }) => {
  const circumference = 2 * Math.PI * 40
  const dashoffset = circumference - (current / max) * circumference

  return (
    <div className='flex items-center justify-center'>
      <svg className='transform -rotate-90 w-24 h-24'>
        <circle cx='48' cy='48' r='40' stroke='currentColor' strokeWidth='7' fill='transparent' className='text-gray-700' />
        <circle
          cx='48'
          cy='48'
          r='40'
          stroke='currentColor'
          strokeWidth='7'
          fill='transparent'
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          className='text-meta-3'
          strokeLinecap='round'
        />
      </svg>
      <span className='absolute text-3xl'>
        <span className='font-bold text-black dark:text-white duration-300 ease-linear'>{current}</span>
        <span className='text-sm font-medium'>/{max}</span>
      </span>
    </div>
  )
}

export default CircularProgressBar
