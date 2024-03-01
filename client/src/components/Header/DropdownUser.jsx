import { useEffect, useRef, useState } from 'react'

import useAuth from '../../hooks/useAuth'

const DropdownUser = () => {
  const { isAdmin, isUser, name } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const trigger = useRef(null)
  const dropdown = useRef(null)

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) { return }
      setDropdownOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className='relative'>
      <span className='hidden text-right lg:block'>
        <span className='block text-sm font-medium text-black dark:text-white duration-300 ease-linear'>
          {name}
        </span>
        <span className='block text-xs duration-300 ease-linear'>{isAdmin ? 'Administrator' : isUser ? 'Professor' : 'Unknown'}</span>
      </span>

    </div>
  )
}

export default DropdownUser
