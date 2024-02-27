import LogoZaweeWhite from '../../images/logo/logo-zawee-white.svg'
import LogoZaweeDark from '../../images/logo/logo-zawee-dark.svg'
const Footer = () => {
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
            <p className='max-w-[370px] mt-7 text-gray-600 dark:text-gray-400'>Page description and what we do and stuff i dont know what else to add here.</p>
            {/* Social Brands */}
            <div className='sm:mt-auto mt-7'>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600 ' href='/'>
                <svg
                  className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'
                >
                  <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M5.026 15c0 .926-.756 1.681-1.681 1.681S0 15.926 0 15.001C0 14.076.756 13.32 1.68 13.32h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:text-black dark:text-white hover:bg-white/10 dark:hover-bg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z' />
                </svg>
              </a>
            </div>

            {/* End Social Brands */}
          </div>
          {/* End Col */}

          <div className='col-span-1'>
            <h4 className='mb-7.5 lg:text-2xl font-medium text-black dark:text-white'>Company</h4>

            <div className='mt-3 grid space-y-3'>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>About Us</a></p>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>Blog</a></p>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>Career</a></p>
              <p><a className='inline-flex gap-x-2 text-gray-400 hover:text-black dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>Something</a></p>
            </div>
          </div>
          {/* End Col */}

          <div className='col-span-2'>
            <h4 className='mb-7.5 lg:text-2xl font-medium text-black dark:text-white'>Stay up to date</h4>

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

          <a href='/' className='w-fit text-sm text-gray-400 hover:text-black dark:hover:text-white'>Privacy Policy</a>

          <a href='/' className='w-fit text-sm text-gray-400 hover:text-black dark:hover:text-white'>Cookie Policy</a>

        </div>
      </div>
    </footer>
  )
}

export default Footer
