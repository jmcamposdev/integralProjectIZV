import DropdownUser from './DropdownUser'
import LogoWhite from '../../images/logo/logo-zawee-white.svg'
import LogoDark from '../../images/logo/logo-zawee-dark.svg'
import DarkModeSwitcher from './DarkModeSwitcher'

const Header = (props) => {
  return (
    <header className='min-h-[80px] sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
      <div className='flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <!-- Hamburger Toggle BTN --> */}

          <a href='/' className='flex items-center gap-2 2xsm:gap-4'>
            <div className='w-[35.6px] h-[35.6px]' />
            <img src={LogoWhite} className='sm:h-[42px] dark:hidden  mr-3  h-9' alt='Zawee Logo' />
            <img src={LogoDark} className='sm:h-[42px] dark:block hidden  mr-3 h-9' alt='Zawee Logo' />
          </a>
        </div>

        <div className='ml-auto flex items-center gap-3 2xsm:gap-7'>
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
          <ul className='flex items-center gap-2 2xsm:gap-4'>
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
            <li>
              <button
                aria-controls='sidebar'
                onClick={(e) => {
                  e.stopPropagation()
                  props.setSidebarOpen(!props.sidebarOpen)
                }}
                className='absolute top-[31.7px] left-[16px] md:left-[24px] 2xl:left-[44px] z-99999 block rounded-sm border-stroke bg-white p-1.5  dark:border-strokedark dark:bg-boxdark lg:hidden'
              >
                <span className='relative block h-5.5 w-5.5 cursor-pointer'>
                  <span className='du-block absolute right-0 h-full w-full'>
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                    />
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                    />
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                    />
                  </span>
                  <span className='absolute right-0 h-full w-full rotate-45'>
                    <span
                      className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                    />
                    <span
                      className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                    />
                  </span>
                </span>
              </button>
            </li>

          </ul>

        </div>
      </div>
    </header>
  )
}

export default Header
