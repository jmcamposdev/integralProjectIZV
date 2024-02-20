import '../../css/style.css'
import '../../css/style2.css'
import '../../css/satoshi.css'
import React, { useState, useEffect } from 'react'
import DarkModeSwitcher from '../Header/DarkModeSwitcher'
import LogoIcon from '../../images/logo/logo-dark.svg'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuth from '../../hooks/useAuth'

const Header = () => {
  const { isLogged } = useAuth()
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
    window.location.reload()
  }

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nonScrolledNavStyle = () => {
    const nav = document.getElementById('nav')

    nav.classList.remove('py-8')
    nav.classList.remove('bg-transparent')

    nav.classList.add('py-4')
    nav.classList.add('bg-white')
    nav.classList.add('dark:bg-boxdark')
  }

  const scrolledNavStyle = () => {
    const nav = document.getElementById('nav')

    nav.classList.remove('py-4')
    nav.classList.remove('bg-white')
    nav.classList.remove('dark:bg-boxdark')

    nav.classList.add('py-8')
    nav.classList.add('bg-transparent')
  }

  const openHideNav = () => {
    const mobileMenu = document.getElementById('mobile-menu-2')
    const ul = document.getElementById('ul')



    if (ul.classList.contains('flex-row')) {
      ul.classList.remove('flex-row')
      ul.classList.add('flex-col')
    } else {
      ul.classList.add('flex-row')
      ul.classList.remove('flex-col')
    }

    mobileMenu.classList.toggle('hidden')

    if (!mobileMenu.classList.contains('hidden')) {
      nonScrolledNavStyle()
    } else {
      scrolledNavStyle()
    }
  }



  const navClass = isScrolled && isDesktop
    ? 'py-4 bg-white dark:bg-boxdark'
    : !isScrolled && isDesktop
      ? 'py-8 bg-transparent'
      : '';


  return (
    <header className='fixed z-99 w-[100dvw]'>

      <nav id='nav' className={`${navClass} border-gray-200 px-4 lg:px-6 transition-all`}>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <a href='/' className='flex items-center'>
            <img src={LogoIcon} className='mr-3 h-6 sm:h-9' alt='Flowbite Logo' />
          </a>
          <div className='flex items-center lg:order-2 gap-[20px]'>
            {isLogged
              ? (
                <a
                  onClick={handleSignOut}
                  className='py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block'
                >
                  Sign Out
                </a>
              )
              : (
                <a
                  href='/login'
                  className='py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block'
                >
                  Sign In
                </a>
              )}
            {isLogged
              ? (
                <a
                  href='/dashboard'
                  className='ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                >
                  Dashboard
                </a>
              )
              : null}
            {!isLogged
              ? (
                <a
                  href='/signup'
                  className='ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                >
                  Sign Up
                </a>
              )
              : null}
            <ul className='items-center gap-2 2xsm:gap-4 hidden lg:flex'>
              <DarkModeSwitcher />
            </ul>
            <button onClick={openHideNav} id='button-nav' data-collapse-toggle='mobile-menu-2' type='button' className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls='mobile-menu-2' aria-expanded='false'>
              <span className='sr-only'>Open main menu</span>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' /></svg>
              <svg className='hidden w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
            </button>
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1' id='mobile-menu-2'>
            <ul id='ul' className='flex flex-row mt-4 font-medium  lg:space-x-8 lg:mt-0'>
              <li>
                <a href='/' className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-dark'}`} aria-current='page'>Home</a>
              </li>
              <li>
                <a href='/' className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-dark'}`} aria-current='page'>About</a>
              </li>
              <li>
                <a href='/' className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-dark'}`} aria-current='page'>Team</a>
              </li>
              <li>
                <a href='/' className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  ${isScrolled ? 'text-gray-500 dark:text-white' : 'text-dark'}`} aria-current='page'>Contact</a>
              </li>
              <li>
                <ul className='items-center gap-2 2xsm:gap-4 flex lg:hidden w-fit block ml-auto'>
                  <DarkModeSwitcher />
                </ul>
              </li>

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
