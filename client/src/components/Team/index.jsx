import '../../css/style.css'
import '../../css/satoshi.css'
import Worker1 from '../../images/frontpage/team1.jpg'
import Worker2 from '../../images/frontpage/team2.jpg'
import Worker3 from '../../images/frontpage/team3.jpg'
import Worker4 from '../../images/frontpage/team4.jpg'
import Worker5 from '../../images/frontpage/team5.jpg'

const Team = () => {
  return (
    <section id='team' className='overflow-hidden z-0 relative py-17.5 sm:py-22.5 xl:py-27.5 bg-white dark:bg-boxdark-2 flex flex-col gap-[2.5rem] font-medium leading-relaxed font-satoshi text-black dark:text-white justify-center items-center'>
      <div className='z-1 mx-auto max-w-[55rem] px-4 text-center sm:px-8 xl:px-0'>
        <span className='text-2xl font-heading mb-5 inline-block text-title-6 font-medium text-primary'>Our Team</span>
        <h2 className='text-4xl xl:text-5xl font-semibold text-black dark:text-white'>We are dedicated to technology, we are passionate about education</h2>
      </div>
      <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

          <div className='flex flex-col rounded-xl p-4 md:p-6 border dark:border-form-strokedark border-stroke dark:bg-boxdark text-black black:text-white'>
            <div className='flex items-center gap-x-4'>
              <img style={{ transform: 'scaleX(-1)' }} className='rounded-full size-20' src={Worker1} alt='Picture of the first Member of the Zawee Team' />
              <div className='grow'>
                <h3 className='font-medium text-black dark:text-white'>
                  Jose María Campos
                </h3>
                <p className='text-xs uppercase text-black dark:text-white'>
                  Solution Developer
                </p>
              </div>
            </div>

            <p className='mt-3 text-black dark:text-white'>
              I am a proactive communicator, adept at building strong relationships and fostering collaboration to achieve collective success.
            </p>

            <div className='mt-3 space-x-1'>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>

                <svg style={{ scale: '1.35' }} className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z' />
                </svg>

              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='scale-[1.3] flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z' />
                </svg>
              </a>
            </div>
          </div>

          <div className='flex flex-col rounded-xl p-4 md:p-6 border dark:border-form-strokedark border-stroke dark:bg-boxdark text-black black:text-white'>
            <div className='flex items-center gap-x-4'>
              <img style={{ transform: 'scaleX(-1)' }} className='rounded-full size-20' src={Worker2} alt='Picture of the second Member of the Zawee Team' />
              <div className='grow'>
                <h3 className='font-medium text-black dark:text-white'>
                  Victor Capdevilla
                </h3>
                <p className='text-xs uppercase text-black dark:text-white'>
                  Efficiency Analyst
                </p>
              </div>
            </div>

            <p className='mt-3 text-black dark:text-white'>
              Adaptable and resourceful, I approach every project with enthusiasm and a determination to surpass expectations.
            </p>

            <div className='mt-3 space-x-1'>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>

                <svg style={{ scale: '1.35' }} className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z' />
                </svg>

              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='scale-[1.3] flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z' />
                </svg>
              </a>
            </div>
          </div>

          <div className='flex flex-col rounded-xl p-4 md:p-6 border dark:border-form-strokedark border-stroke dark:bg-boxdark text-black black:text-white'>
            <div className='flex items-center gap-x-4'>
              <img className='rounded-full size-20' src={Worker3} alt='Picture of the third Member of the Zawee Team' />
              <div className='grow'>
                <h3 className='font-medium text-black dark:text-white'>
                  David Luque
                </h3>
                <p className='text-xs uppercase text-black dark:text-white'>
                  Team Coordinator
                </p>
              </div>
            </div>

            <p className='mt-3 text-black dark:text-white'>
              With a keen eye for organization and a commitment to teamwork, I consistently deliver results while maintaining a positive attitude.
            </p>

            <div className='mt-3 space-x-1'>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>

                <svg style={{ scale: '1.35' }} className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z' />
                </svg>

              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='scale-[1.3] flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z' />
                </svg>
              </a>
            </div>
          </div>

          <div className='flex flex-col rounded-xl p-4 md:p-6 border dark:border-form-strokedark border-stroke dark:bg-boxdark text-black black:text-white'>
            <div className='flex items-center gap-x-4'>
              <img style={{ transform: 'scaleX(-1)' }} className='rounded-full size-20' src={Worker4} alt='Picture of the forth Member of the Zawee Team' />
              <div className='grow'>
                <h3 className='font-medium text-black dark:text-white'>
                  Manuel Jareño
                </h3>
                <p className='text-xs uppercase text-black dark:text-white'>
                  Support Consultant
                </p>
              </div>
            </div>

            <p className='mt-3 text-black dark:text-white'>
              Driven by a passion for efficiency, I excel in problem-solving and strive for excellence in every task I undertake.
            </p>

            <div className='mt-3 space-x-1'>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>

                <svg style={{ scale: '1.35' }} className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z' />
                </svg>

              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='scale-[1.3] flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z' />
                </svg>
              </a>
            </div>
          </div>

          <div className='flex flex-col rounded-xl p-4 md:p-6 border dark:border-form-strokedark border-stroke dark:bg-boxdark text-black black:text-white'>
            <div className='flex items-center gap-x-4'>
              <img style={{ transform: 'scaleX(-1)' }} className='rounded-full size-20' src={Worker5} alt='Picture of the fifth Member of the Zawee Team' />
              <div className='grow'>
                <h3 className='font-medium text-black dark:text-white'>
                  Carlos Hernández
                </h3>
                <p className='text-xs uppercase text-black dark:text-white'>
                  Support Consultant
                </p>
              </div>
            </div>

            <p className='mt-3 text-black dark:text-white'>
              I thrive on challenges and am fueled by creativity. My dedication to detail and innovation defines my work ethic.
            </p>

            <div className='mt-3 space-x-1'>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>

                <svg style={{ scale: '1.35' }} className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z' />
                </svg>

              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a className='hover:border text-black dark:text-white border-stroke inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg  border-gray-200  hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' href='/'>
                <svg className='scale-[1.3] flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='currentColor'>
                  <path d='M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z' />
                </svg>
              </a>
            </div>
          </div>

          <a className='flex-col justify-center text-center hover:shadow-sm flex rounded-xl p-4 md:p-6 border dark:border-form-strokedark border-stroke dark:bg-boxdark2 text-black black:text-white' href='/'>
            <h3 className='text-lg text-gray-800 dark:text-white'>
              We are hiring!
            </h3>
            <div>
              <span className='inline-flex items-center gap-x-2 text-blue-600 group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400'>
                See all opening positions
                <svg className='flex-shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m9 18 6-6-6-6' /></svg>
              </span>
            </div>
          </a>

        </div>
      </div>
    </section>
  )
}

export default Team
