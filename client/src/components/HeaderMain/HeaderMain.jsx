import '../../css/style.css'
import '../../css/satoshi.css'
import React, { useState, useEffect } from 'react'
import DarkModeSwitcher from '../Header/DarkModeSwitcher'
import LogoZaweeDark from '../../images/logo/logo-zawee-white.svg'
import LogoZaweeWhite from '../../images/logo/logo-zawee-dark.svg'

import useAuth from '../../hooks/useAuth'
import useColorMode from '../../hooks/useColorMode'

const Header = () => {
  const isLandingPage = window.location.pathname === '/'
  const { isLogged } = useAuth()
  const [colorMode, setColorMode] = useColorMode()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpenNav, setIsOpenNav] = useState(false)
  const [logo, setLogo] = useState(LogoZaweeWhite)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Set the logo if isScrolled or if is a dark mode if is added the dark class to the body put the dark logo else put the white logo
  useEffect(() => {
    if (!isLandingPage) {
      if (colorMode === 'dark') {
        setLogo(LogoZaweeWhite)
      } else {
        setLogo(LogoZaweeDark)
      }
    } else if (!isScrolled && !isOpenNav) {
      // If is not scrolled and is not open nav and is in mobile ver
      setLogo(LogoZaweeWhite)
    } else if (!isScrolled && isOpenNav && colorMode === 'dark') { // If is not scrolled and is open nav and is dark mode
      setLogo(LogoZaweeWhite)
    } else if (!isScrolled && isOpenNav && colorMode === 'light') { // If is not scrolled and is open nav and is light mode
      setLogo(LogoZaweeDark)
    } else if (document.body.classList.contains('dark') && isScrolled) { // If is scrolled and is dark mode
      setLogo(LogoZaweeWhite)
    } else { // If is scrolled and is not dark mode
      setLogo(LogoZaweeDark)
    }
  }, [isScrolled, colorMode, isOpenNav])

  // Function to show the nav menu on phone resolution
  const openHideNav = () => {
    // The container of the nav, used to move it ans show the nav
    const backNavPhone = document.getElementById('back-nav-phone')
    // The button to open the nav, used to set an animation with its children elements
    const buttonNav = document.getElementById('button-nav')

    setIsOpenNav(!isOpenNav)

    // Toggling classes to trandform the childen of the button to
    // have a nice animation when clicked
    buttonNav.children.item(0).classList.toggle('rotate-45')
    buttonNav.children.item(0).classList.toggle('top-[15%]')
    buttonNav.children.item(0).classList.toggle('top-[50%]')
    buttonNav.children.item(1).classList.toggle('opacity-0')
    buttonNav.children.item(2).classList.toggle('-rotate-45')
    buttonNav.children.item(2).classList.toggle('top-[15%]')
    buttonNav.children.item(2).classList.toggle('top-[50%]')

    // To add more detail to the animation of the button
    buttonNav.classList.toggle('justify-center')
    buttonNav.classList.toggle('justify-between')

    // Showing the container of the nav menu, if its hidden on the side it moves to 0
    backNavPhone.classList.toggle('left-[100%]')
    backNavPhone.classList.toggle('left-0')

    // To avoid the scrolling when the nav is open i set the overflow
    // property of the body element to hidden
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = 'visible'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <header className='fixed z-99 w-[100dvw]'>

      <nav id='nav' className={`${isScrolled ? 'py-4 bg-white dark:bg-boxdark' : 'py-8 bg-transparent'} border-gray-200 px-4 lg:px-6 transition-all relative`}>
        <div style={{ transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)' }} id='back-nav-phone' className='absolute h-[100dvh] w-[100dvw]  left-[100%] top-0 -z-1 bg-white dark:bg-boxdark transition-all overflow-hidden duration-1000'>
          <div className={`${isScrolled ? 'mt-[80px]' : 'mt-[112px]'} px-4 flex flex-col gap-[1rem]`}>

            <ul id='ul' className='flex flex-col mt-4 font-medium  lg:space-x-8 lg:mt-0'>
              <li>
                <a href={isLandingPage ? '#home' : '/#home'} className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-black dark:text-white duration-300 ease-in-out' aria-current='page' aria-label='Home'>Home</a>
              </li>
              <li>
                <a href={isLandingPage ? '#about' : '/#about'} className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-black dark:text-white duration-300 ease-in-out' aria-current='page' aria-label='About'>About</a>
              </li>
              <li>
                <a href={isLandingPage ? '#team' : '/#team'} className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-black dark:text-white duration-300 ease-in-out' aria-current='page' aria-label='Team'>Team</a>
              </li>
              <li>
                <a href={isLandingPage ? '#classes' : '/#classes'} className='block py-8 pr-8 pl-3  lg:p-0  text-3xl hover:text-blue-600 dark:hover:text-blue-600 sm:py-6  text-black dark:text-white duration-300 ease-in-out' aria-current='page' aria-label='Classes'>Classes</a>
              </li>
              {
                window.location.pathname === '/'
                  ? (
                      isLogged
                        ? (
                          <li>
                            <a
                              href='/dashboard'
                              className='w-fit text-3xl block ease-in-up rounded-md bg-primary py-3 px-8 font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                              aria-label='Dashboard'
                            >
                              Dashboard
                            </a>
                          </li>
                          )
                        : (
                          <li className='py-6'>
                            <a
                              href='/login'
                              className='w-fit text-3xl block ease-in-up rounded-md bg-primary py-3 px-8 font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9'
                              aria-label='Login'
                            >
                              Sign In
                            </a>
                          </li>
                          )
                    )
                  : ''
}

            </ul>
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <a href='/' className='flex items-center'  aria-label='Home'>
            <img
              src={logo}
              className='h-[42px]  mr-3' alt='Zawee Logo'
            />
          </a>
          <div className='flex items-center lg:order-2 gap-[20px]'>
            {
              window.location.pathname === '/'
                ? (
                    isLogged
                      ? (
                        <a
                          href='/dashboard'
                          className='hidden lg:block ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp  md:px-9 lg:px-6 xl:px-9'
                          aria-label='Dashboard'
                        >
                          Dashboard
                        </a>
                        )
                      : (
                        <a
                          href='/login'
                          className=' hidden lg:block ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp  md:px-9 lg:px-6 xl:px-9'
                          aria-label='Login'
                        >
                          Sign In
                        </a>
                        ))
                : ''
}
            <ul className='items-center gap-2 2xsm:gap-4 flex'>
              <DarkModeSwitcher importedColorMode={colorMode} importedSetColorMode={setColorMode} />
            </ul>
            <button onClick={openHideNav} id='button-nav' data-collapse-toggle='mobile-menu-2' type='button' className='relative w-[40px] h-[36px] inline-flex justify-center flex-col p-1.5 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100' aria-controls='mobile-menu-2' aria-expanded='false'>
              <div className='absolute top-[15%] transition-all block origin-center w-[30px] h-[2px] ' style={{ backgroundColor: 'rgb(60 80 224 / 0.9)' }} />
              <div className='transition-all w-[24px] h-[2px] dark:bg-white ml-auto ' style={{ backgroundColor: 'rgb(60 80 224 / 0.9)' }} />
              <div className='absolute bottom-[15%] transition-all block origin-center w-[30px] h-[2px] ' style={{ backgroundColor: 'rgb(60 80 224 / 0.9)' }} />
            </button>
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1' id='mobile-menu-2'>
            <ul id='ul' className='hidden lg:flex flex-row mt-4 font-medium  lg:space-x-8 lg:mt-0'>
              <li>
                <a href={isLandingPage ? '#home' : '/#home'} className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6 duration-300 ease-in-out  ${isScrolled || !isLandingPage ? 'text-black dark:text-white' : 'text-white'}`} aria-current='page'  aria-label='Home'>Home</a>
              </li>
              <li>
                <a href={isLandingPage ? '#about' : '/#about'} className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6 duration-300 ease-in-out  ${isScrolled || !isLandingPage ? 'text-black dark:text-white' : 'text-white'}`} aria-current='page' aria-label='About'>About</a>
              </li>
              <li>
                <a href={isLandingPage ? '#team' : '/#team'} className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6 duration-300 ease-in-out ${isScrolled || !isLandingPage ? 'text-black dark:text-white' : 'text-white'}`} aria-current='page' aria-label='Team'>Team</a>
              </li>
              <li>
                <a href={isLandingPage ? '#classes' : '/#classes'} className={`block py-2 pr-4 pl-3  lg:p-0  font-medium  hover:text-blue-600 dark:hover:text-blue-600 sm:py-6 duration-300 ease-in-out  ${isScrolled || !isLandingPage ? 'text-black dark:text-white' : 'text-white'}`} aria-current='page' aria-label='Classes'>Classes</a>
              </li>
              <li>
                <ul className='items-center gap-2 2xsm:gap-4 lg:hidden w-fit block ml-auto'>
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
