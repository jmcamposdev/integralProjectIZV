import '../../css/style.css'
import '../../css/style2.css'
import '../../css/satoshi.css'
import React, { useState, useEffect } from 'react'
import DarkModeSwitcher from '../Header/DarkModeSwitcher'
import LogoIcon from '../../images/logo/logo-dark.svg'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuth from '../../hooks/useAuth'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const { isLogged } = useAuth()
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
    window.location.reload()
  }
  return (
    <header className={`transition-all fixed flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full  text-sm py-${isScrolled ? '1' : '3'} sm:py-0 ${isScrolled ? 'bg-white dark:bg-boxdark' : 'bg-transparent border-b border-gray-200'}`}>
      <nav className='relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8' aria-label='Global'>
        <div className='flex items-center justify-between'>
          <a className='flex-none text-xl font-semibold dark:text-white' href='/'>
            <img className='flex-none text-xl font-semibold dark:text-white' href='#' aria-label='Brand' src={LogoIcon} />
          </a>
          <div className='sm:hidden'>
            <button type='button' className='hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' data-hs-collapse='#navbar-collapse-with-animation' aria-controls='navbar-collapse-with-animation' aria-label='Toggle navigation'>
              <svg className='hs-collapse-open:hidden size-4' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path fill-rule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z' />
              </svg>
              <svg className='hs-collapse-open:block flex-shrink-0 hidden size-4' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
              </svg>
            </button>
          </div>
        </div>
        <div id='navbar-collapse-with-animation' className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block'>
          <div className='flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7'>
            <a className={`text-base font-bold  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-white'}`} href='/' aria-current='page'>Home</a>
            <a className={`text-base font-bold  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-white'}`} href='/' aria-current='page'>About us</a>
            <a className={`text-base font-bold  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-white'}`} href='/' aria-current='page'>Team</a>
            <a className={`text-base font-bold  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-white'}`} href='/' aria-current='page'>Contact</a>
            {isLogged
              ? (
                <button
                  onClick={handleSignOut}
                  className='hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block'
                >
                  Sign Out
                </button>
                )
              : (
                <a
                  href='/login'
                  className='hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block'
                >
                  Sign In
                </a>
                )}
            {isLogged
              ? (
                <a
                  href='/dashboard'
                  className='ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                >
                  Dashboard
                </a>
                )
              : null}
            {!isLogged
              ? (
                <a
                  href='/signup'
                  className='ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                >
                  Sign Up
                </a>
                )
              : null}

            <ul className='flex items-center gap-2 2xsm:gap-4 mr-[60px] lg:mr-0'>
              <DarkModeSwitcher />
            </ul>
          </div>
        </div>
      </nav>
    </header>

  )
}

export default Header

/*
{isLogged
                ? (
                  <button
                    onClick={handleSignOut}
                    className='hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block'
                  >
                    Sign Out
                  </button>
                  )
                : (
                  <a
                    href='/login'
                    className='hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block'
                  >
                    Sign In
                  </a>
                  )}
              {isLogged
                ? (
                  <a
                    href='/dashboard'
                    className='ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                  >
                    Dashboard
                  </a>
                  )
                : null}
              {!isLogged
                ? (
                  <a
                    href='/signup'
                    className='ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                  >
                    Sign Up
                  </a>
                  )
                : null}
              <ul className='flex items-center gap-2 2xsm:gap-4 mr-[60px] lg:mr-0'>
                <DarkModeSwitcher />
              </ul> */
