import '../../css/style.css'
import '../../css/style2.css'
import '../../css/satoshi.css'
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
  return (
    <header className='header top-0 left-0 z-40 flex w-full items-center bg-transparent fixed bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none shadow-2'>
      <div className='container'>
        <div className='relative -mx-4 flex items-center justify-between'>
          <div className='w-60 max-w-full px-4 xl:mr-12'>
            <a className='header-logo block w-full py-5 lg:py-2 ' href='/'>
              <img
                alt='logo'
                src={LogoIcon}
                width='140'
                height='30'
                decoding='async'
                data-nimg='1'
                className='w-full dark:hidden'
                loading='lazy'
                style={{ color: 'transparent' }}
              />
              <img
                alt='logo'
                src={LogoIcon}
                width='140'
                height='30'
                decoding='async'
                data-nimg='1'
                className='hidden w-full dark:block'
                loading='lazy'
                style={{ color: 'transparent' }}
              />
            </a>
          </div>
          <div className='flex w-full items-center justify-between px-4'>
            <div>
              <button
                id='navbarToggler'
                aria-label='Mobile Menu'
                className='absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden'
              >
                <span className='relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white' />
                <span className='relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white' />
                <span className='relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white' />
              </button>
              <nav
                id='navbarCollapse'
                className='navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 invisible top-[120%] opacity-0'
              >
                <ul className='block lg:flex lg:space-x-12'>
                  <li className='group relative'>
                    <a
                      className='flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0'
                      href='/'
                    >
                      Home
                    </a>
                  </li>
                  <li className='group relative'>
                    <a
                      className='flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0'
                      href='/about'
                    >
                      About
                    </a>
                  </li>
                  <li className='group relative'>
                    <a
                      className='flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0'
                      href='/blog'
                    >
                      Blog
                    </a>
                  </li>
                  <li className='group relative'>
                    <a
                      className='flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0'
                      href='/contact'
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='flex items-center gap-2 2xsm:gap-4 '>
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
              <ul className='flex items-center gap-2 2xsm:gap-4'>
                <DarkModeSwitcher />
                <li className='right-4 top-1/2  px-3 py-[6px]'>
                  <button id='navbarToggler' aria-label='Mobile Menu' className='absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden'>
                    <span className='relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white  ' />
                    <span className='relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white  ' />
                    <span className='relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white  ' />
                  </button>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
