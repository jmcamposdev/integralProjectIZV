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
    <div className='hours-counter'>
      <button className='hours-counter__button' onClick={handleRest}>-</button>
      <span className='hours-counter__hours'>{hours !== currentHour ? currentHour : hours}</span>
      <button className='hours-counter__button' onClick={handleAdd}>+</button>
    </div>
  )
}

export default HoursCounter
