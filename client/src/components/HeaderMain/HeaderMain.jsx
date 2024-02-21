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

  const openHideNav = () => {
    const backNavPhone = document.getElementById('back-nav-phone')
    const buttonNav = document.getElementById('button-nav')

    buttonNav.children.item(0).classList.toggle('rotate-45')
    buttonNav.children.item(0).classList.toggle('top-[15%]')
    buttonNav.children.item(0).classList.toggle('top-[50%]')
    buttonNav.children.item(1).classList.toggle('opacity-0')
    buttonNav.children.item(2).classList.toggle('-rotate-45')
    buttonNav.children.item(2).classList.toggle('top-[15%]')
    buttonNav.children.item(2).classList.toggle('top-[50%]')

    buttonNav.classList.toggle('justify-center')
    buttonNav.classList.toggle('justify-between')
    backNavPhone.classList.toggle('h-0')
    backNavPhone.classList.toggle('h-[100dvh]')

    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = 'visible'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <header className='fixed z-99 w-[100dvw]'>

      <nav id='nav' className={`${isScrolled ? 'py-4 bg-white dark:bg-boxdark' : 'py-8 bg-transparent'} border-gray-200 px-4 lg:px-6 transition-all relative`}>
        <div id='back-nav-phone' className='absolute w-[100%] h-0  left-0 top-0 -z-1 bg-white dark:bg-boxdark transition-all overflow-hidden duration-1000'>
          <div className={`${isScrolled ? 'mt-[80px]' : 'mt-[112px]'} px-4 flex flex-col gap-[1rem]`}>

            <ul id='ul' className='flex flex-col mt-4 font-medium  lg:space-x-8 lg:mt-0'>
              <li>
                <a href='/' className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-dark dark:text-white' aria-current='page'>Home</a>
              </li>
              <li>
                <a href='/' className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-dark dark:text-white' aria-current='page'>About</a>
              </li>
              <li>
                <a href='/' className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-dark dark:text-white' aria-current='page'>Team</a>
              </li>
              <li>
                <a href='/' className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-dark dark:text-white' aria-current='page'>Contact</a>
              </li>
              {isLogged
                ? (
                  <li>
                    <a
                      onClick={handleSignOut}
                      className='w-fit text-3xl block py-3 px-7 font-bold text-dark hover:opacity-70 dark:text-white md:block'
                    >
                      Sign Out
                    </a>
                  </li>
                  )
                : (
                  <li className='py-6'>
                    <a
                      href='/login'
                      className='w-fit text-3xl block ease-in-up rounded-md bg-primary py-3 px-8 font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                    >
                      Sign In
                    </a>
                  </li>
                  )}

            </ul>
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <a href='/' className='flex items-center'>
            <img src={LogoIcon} className='mr-3 h-6 sm:h-9' alt='Flowbite Logo' />
          </a>
          <div className='flex items-center lg:order-2 gap-[20px]'>
            {isLogged
              ? (
                <a
                  onClick={handleSignOut}
                  className=' hidden lg:block ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp  md:px-9 lg:px-6 xl:px-9'
                >
                  Sign Out
                </a>
                )
              : (
                <a
                  href='/login'
                  className=' hidden lg:block ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp  md:px-9 lg:px-6 xl:px-9'
                >
                  Sign In
                </a>
                )}
            <ul className='items-center gap-2 2xsm:gap-4 flex'>
              <DarkModeSwitcher />
            </ul>
            <button onClick={openHideNav} id='button-nav' data-collapse-toggle='mobile-menu-2' type='button' className='relative w-[40px] h-[36px] inline-flex justify-center flex-col p-1.5 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls='mobile-menu-2' aria-expanded='false'>
              <div className='absolute top-[15%] transition-all block origin-center w-[30px] h-[2px] dark:bg-white bg-stone-400' />
              <div className='transition-all w-[24px] h-[2px] dark:bg-white bg-stone-400 ml-auto' />
              <div className='absolute bottom-[15%] transition-all block origin-center w-[30px] h-[2px] dark:bg-white bg-stone-400' />
            </button>
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1' id='mobile-menu-2'>
            <ul id='ul' className='hidden lg:flex flex-row mt-4 font-medium  lg:space-x-8 lg:mt-0'>
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