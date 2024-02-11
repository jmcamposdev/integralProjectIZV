import { useEffect, useState } from 'react'

const HoursCounter = ({ index, maxHour, minHour, currentHour, handleHourChange }) => {
  const [hours, setHours] = useState(currentHour) // Save the current hour in the state

  /**
   * Update the state when the currentHour changes
   */
  useEffect(() => {
    setHours(currentHour)
  }, [currentHour])

  /**
   * Rest 1 hour from the current hour
   */
  const handleRest = () => {
    // If the current hour is greater than the minimum hour, rest 1 hour
    if (hours > minHour) {
      setHours(hours - 1) // Update the state
      handleHourChange(index, hours - 1) // Update the parent state
    }
  }

  /**
   * Add 1 hour to the current hour
   */
  const handleAdd = () => {
    // If the current hour is less than the maximum hour, add 1 hour
    if (hours < maxHour) {
      setHours(hours + 1) // Update the state
      handleHourChange(index, hours + 1) // Update the parent state
    }
  }

  return (
    <div className='hours-counter flex justify-center items-center gap-5 mt-6'>
      <span onClick={handleRest} style={{ fontSize: '28px' }} className='icon-[ph--minus] cursor-pointer hover:text-primary duration-300 ease-in-out ' />
      <span className=''>
        <span className='text-title-md font-bold text-black dark:text-white'>{hours !== currentHour ? currentHour : hours}</span>
        <span className='text-sm font-medium'>/hours</span>
      </span>
      <span className='icon-[ph--plus] cursor-pointer hover:text-primary duration-300 ease-in-out ' onClick={handleAdd} style={{ fontSize: '28px' }} />
    </div>
  )
}

export default HoursCounter
