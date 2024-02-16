// import { Link } from 'react-router-dom'
import '../../css/style.css'
import '../../css/style2.css'
import '../../css/satoshi.css'
import LogoIcon from '../../images/logo/logo-dark.svg'
// import DarkModeSwitcher from '../Header/DarkModeSwitcher'

const Header = (props) => {
  return (
    <header className='fixed left-0 top-0 z-9999 w-full bg-white shadow transition duration-100 dark:bg-black-dark'>
      <div className='relative items-center justify-between px-4 py-4 sm:px-8 xl:flex xl:gap-7 xl:px-12.5 xl:py-0 2xl:gap-0'>
        <div className='flex w-full items-center justify-between xl:w-2/12 2xl:w-2/12'>
          <a href={LogoIcon}>
            <img alt='Logo Light' loading='lazy' width='176' height='32' decoding='async' data-nimg='1' className='dark:hidden' style={{ color: 'transparent' }} src={LogoIcon} />
            <img alt='Logo Dark' loading='lazy' width='176' height='32' decoding='async' data-nimg='1' className='hidden dark:block' style={{ color: 'transparent' }} src={LogoIcon} />
            <button className='block xl:hidden'>
              <span className='relative block h-5.5 w-5.5 cursor-pointer'>
                <span className='du-block absolute right-0 h-full w-full'>
                  <span className='relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white !w-full delay-300' />
                  <span className='relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white delay-400 !w-full' />
                  <span className='relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white !w-full delay-500' />
                </span>
                <span className='du-block absolute right-0 h-full w-full rotate-45'>
                  <span className='absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white !h-0 delay-[0]' />
                  <span className='delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white !h-0 delay-200' />
                </span>
              </span>
            </button>
          </a>
          <div className='invisible h-0 w-full items-center justify-between lg:w-10/12 xl:visible xl:flex xl:h-auto 2xl:w-9/12 '>
            <nav>
              <ul className='flex flex-col gap-5 xl:flex-row xl:items-center 2xl:gap-9'>
                <li className='nav__menu xl:py-4'>
                  <a className='font-medium text-black-3 hover:text-primary dark:text-black-5 dark:hover:text-white ' href='/#features'>Features</a>
                </li>
                <li className='nav__menu xl:py-4'>
                  <a className='font-medium text-black-3 hover:text-primary dark:text-black-5 dark:hover:text-white ' href='/#components'>Components</a>
                </li>
                <li className='nav__menu xl:py-4'>
                  <a className='font-medium text-black-3 hover:text-primary dark:text-black-5 dark:hover:text-white ' href='/download'>Download</a>
                </li>
                <li className='nav__menu xl:py-4'>
                  <a className='https://docs.tailadmin.com' target='_blank' class='font-medium text-black-3 hover:text-primary dark:text-black-5 dark:hover:text-white ' rel='noreferrer'>Docs ↗</a>
                </li>
                <li className='nav__menu xl:py-4'>
                  <a className='font-medium text-black-3 hover:text-primary dark:text-black-5 dark:hover:text-white ' href='/support'>Support</a>
                </li>
              </ul>
            </nav>
            <div className='mt-7 flex items-center gap-3 xl:mt-0'>
              <div>
                <ul className='flex flex-col gap-3.5 lg:flex-row lg:items-center'>
                  <li>
                    <a className='inline-flex items-center gap-2 rounded-custom-1 bg-primary px-7 py-2.5 font-medium text-white hover:bg-opacity-95' href='/pricing'><span><svg class='fill-current' width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M14.406 9.74424L14.5588 8.32369V8.32368C14.6404 7.56574 14.6942 7.06525 14.6519 6.74991L14.6667 6.75C15.3571 6.75 15.9167 6.19036 15.9167 5.5C15.9167 4.80964 15.3571 4.25 14.6667 4.25C13.9764 4.25 13.4167 4.80964 13.4167 5.5C13.4167 5.81222 13.5312 6.0977 13.7204 6.31677C13.4487 6.48447 13.0935 6.83832 12.5588 7.37093L12.5588 7.37096C12.1469 7.78129 11.9409 7.98645 11.7111 8.01822C11.5838 8.03583 11.4541 8.01773 11.3365 7.96596C11.1244 7.87254 10.9829 7.6189 10.7 7.11163L9.20875 4.43783C9.03422 4.1249 8.88814 3.86298 8.75643 3.65221C9.29672 3.37656 9.66671 2.81482 9.66671 2.16667C9.66671 1.24619 8.92052 0.5 8.00004 0.5C7.07957 0.5 6.33337 1.24619 6.33337 2.16667C6.33337 2.81482 6.70336 3.37656 7.24365 3.65221C7.11193 3.86299 6.96588 4.12487 6.79133 4.43783L5.30009 7.11163C5.01717 7.6189 4.87571 7.87254 4.66355 7.96596C4.54599 8.01773 4.41627 8.03583 4.28896 8.01822C4.05918 7.98645 3.85322 7.78129 3.44129 7.37096C2.90659 6.83834 2.55134 6.48447 2.27965 6.31677C2.46891 6.0977 2.58337 5.81222 2.58337 5.5C2.58337 4.80964 2.02373 4.25 1.33337 4.25C0.643018 4.25 0.083374 4.80964 0.083374 5.5C0.083374 6.19036 0.643018 6.75 1.33337 6.75L1.34813 6.74991C1.30589 7.06525 1.35972 7.56574 1.44125 8.32368L1.59404 9.74424C1.67886 10.5328 1.74938 11.283 1.83577 11.9583H14.1643C14.2507 11.283 14.3212 10.5328 14.406 9.74424Z' fill='' /><path d='M7.09343 15.5H8.90666C11.2699 15.5 12.4516 15.5 13.24 14.7943C13.5841 14.4863 13.802 13.931 13.9592 13.2083H2.04084C2.19808 13.931 2.41598 14.4863 2.7601 14.7943C3.54851 15.5 4.73015 15.5 7.09343 15.5Z' fill='' /></svg></span>Get Pro</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
