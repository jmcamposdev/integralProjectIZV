import { useEffect, useState } from 'react'

const HoursCounter = ({ index, maxHour, minHour, currentHour, handleHourChange }) => {
  console.log('Componente Renderizado')
  const [hours, setHours] = useState(currentHour)

  useEffect(() => {
    setHours(currentHour)
  }, [currentHour])

  const handleRest = () => {
    if (hours > minHour) {
      setHours(hours - 1)
      handleHourChange(index, hours - 1)
    }
  }

  const handleAdd = () => {
    if (hours < maxHour) {
      setHours(hours + 1)
      handleHourChange(index, hours + 1)
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
