import LogoZaweeWhite from '../../images/logo/logo-zawee-white.svg'
import LogoZaweeDark from '../../images/logo/logo-zawee-dark.svg'
const Footer = () => {
  const isLandingPage = window.location.pathname === '/'

  return (
    <footer className='mt-auto bg-white dark:bg-boxdark w-full'>
      <div className='w-full max-w-[85rem] py-20 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto'>
        {/* Grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[80px]'>
          <div className='col-span-2 flex flex-col'>
            <a className=' h-[36px] w-[100%] flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/' aria-label='Brand'>
              <img className='h-[36px] hidden dark:block' src={LogoZaweeDark} alt='Zawee Logo' />
              <img className='h-[36px] dark:hidden' src={LogoZaweeWhite} alt='Zawee Logo' />
            </a>
            <p className='max-w-[370px] mt-7 text-gray-600 dark:text-gray-400'>
              Zawee stands as a premier solutio for efficient timetable management tailored for schools of all sizes.
            </p>
            {/* Social Brands */}
            <div className='sm:mt-auto mt-7'>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600 ' href='/'  aria-label='Instagram'>
                <svg
                  className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'
                >
                  <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/'  aria-label='Facebook'>
                <svg style={{ scale: '1.35' }} className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/'  aria-label='LinkedIn'>
                <svg className='scale-[1.3] flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/'  aria-label='Twitter'>
                <svg className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 dark:hover-bg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/' aria-label='Facebook'>
                <svg className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 21.800781 0 L 2.199219 0 C 1 0 0 1 0 2.199219 L 0 21.800781 C 0 23 1 24 2.199219 24 L 21.800781 24 C 23 24 24 23 24 21.800781 L 24 2.199219 C 24 1 23 0 21.800781 0 Z M 7 20 L 3 20 L 3 9 L 7 9 Z M 5 7.699219 C 3.800781 7.699219 3 6.898438 3 5.898438 C 3 4.800781 3.800781 4 5 4 C 6.199219 4 7 4.800781 7 5.800781 C 7 6.898438 6.199219 7.699219 5 7.699219 Z M 21 20 L 17 20 L 17 14 C 17 12.398438 15.898438 12 15.601563 12 C 15.300781 12 14 12.199219 14 14 C 14 14.199219 14 20 14 20 L 10 20 L 10 9 L 14 9 L 14 10.601563 C 14.601563 9.699219 15.601563 9 17.5 9 C 19.398438 9 21 10.5 21 14 Z' />
                </svg>
              </a>
            </div>

            {/* End Social Brands */}
          </div>
          {/* End Col */}

          <div className='col-span-1'>
            <h3 className='mb-7.5 lg:text-2xl font-medium text-black dark:text-white'>Company</h3>

            <div className='mt-3 grid space-y-3'>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href={isLandingPage ? '#home' : '/#home'}>Home</a></p>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href={isLandingPage ? '#about' : '/#about'}>About</a></p>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href={isLandingPage ? '#team' : '/#team'}>Team</a></p>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href={isLandingPage ? '#classes' : '/#classes'}>Classes</a></p>
            </div>
          </div>
          {/* End Col */}

          <div className='col-span-2'>
            <h3 className='mb-7.5 lg:text-2xl font-medium text-black dark:text-white'>Stay up to date</h3>

            <form>
              <p className='mt-3 text-sm text-gray-400'>
                Hot news and Updates, never spam.
              </p>
              <div className='mt-4 flex flex-row items-center gap-2 sm:flex-row sm:gap-3 rounded-lg '>
                <div className='w-full'>
                  <label htmlFor='hero-input' className='sr-only'>Search</label>
                  <input type='text' id='hero-input' name='hero-input' className='dark:border-form-stroke-dark border border-stroke py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600 bg-slate-50' placeholder='Enter your email' />
                </div>
                <button type='submit' aria-label='submit button' id='submit' className='flex h-11.5 w-full max-w-11.5 items-center justify-center rounded-md bg-primary text-white' name='submit'><svg className='fill-current' width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M16.6357 13.6701L18.3521 8.5208C19.8516 4.02242 20.6013 1.77322 19.414 0.585953C18.2268 -0.601315 15.9776 0.148415 11.4792 1.64788L6.32987 3.36432C2.69923 4.57453 0.883919 5.17964 0.368059 6.06698C-0.122686 6.91112 -0.122686 7.95369 0.368058 8.79783C0.883919 9.68518 2.69923 10.2903 6.32987 11.5005C6.77981 11.6505 7.28601 11.5434 7.62294 11.2096L13.1286 5.75495C13.4383 5.44808 13.9382 5.45041 14.245 5.76015C14.5519 6.06989 14.5496 6.56975 14.2398 6.87662L8.82312 12.2432C8.45175 12.6111 8.3342 13.1742 8.49951 13.6701C9.70971 17.3007 10.3148 19.1161 11.2022 19.6319C12.0463 20.1227 13.0889 20.1227 13.933 19.6319C14.8204 19.1161 15.4255 17.3008 16.6357 13.6701Z' fill='' /></svg></button>
              </div>
            </form>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}

        <div className='flex sm:justify-end justify-start gap-[30px] mt-[80px] flex-wrap'>
          <p className='mr-auto w-[100%] sm:w-fit text-sm text-gray-400'>© 2024 Integral Proyect. All rights reserved.</p>

          <a href='/' className='w-fit text-sm text-gray-400 hover:text-black dark:hover:text-white'  aria-label='Privacy'>Privacy Policy</a>

          <a href='/' className='w-fit text-sm text-gray-400 hover:text-black dark:hover:text-white'  aria-label='Cookie'>Cookie Policy</a>

        </div>
      </div>
    </footer>
  )
}

export default Footer
