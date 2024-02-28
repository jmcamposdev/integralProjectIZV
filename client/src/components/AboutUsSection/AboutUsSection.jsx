import '../../css/style.css'
import '../../css/satoshi.css'
import Teacher1 from '../../images/frontpage/teacher1.jpg'
import Teacher2 from '../../images/frontpage/teacher2.jpg'
import Group from '../../images/frontpage/group.avif'
import LightMesh from '../../images/frontpage/mesh1light.svg'
import LightMesh2 from '../../images/frontpage/mesh2light.svg'

const AboutUSSection = () => {
  return (

    <section id='about' className=' overflow-hidden z-0 relative py-17.5 sm:py-22.5 xl:py-27.5 bg-white  dark:bg-boxdark-2 flex flex-col gap-[2.5rem] font-medium leading-relaxed font-satoshi  text-black dark:text-white justify-center items-center'>

      <div className='z-2 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto text-black dark:text-white'>
        <div className='z-1 mx-auto max-w-[55rem] px-4 text-center sm:px-8 xl:px-0 mb-20'>
          <span className='text-2xl font-heading mb-5 inline-block text-title-6 font-medium text-primary'>About Us</span>
          <h2 className='text-4xl xl:text-5xl font-semibold text-black dark:text-white'>Zawee is a leading app for timetable management in schools of any size.</h2>
        </div>
        <div className=' z-2 grid md:grid-cols-2 gap-12'>
          <div className='lg:w-3/4'>
            <h2 className='text-gray-800 font-bold text-4xl dark:text-white'>
              Automate the assignment of lessons to your staff
            </h2>
            <p className='mt-7 text-gray-800 dark:text-gray-400'>
              We will help you create, modify and assign lessons quickly and efficiently, stop worrying about the unexpected and quickly meet your school's needs.
            </p>
          </div>
          <div className='space-y-6 lg:space-y-10'>
            <div className='flex'>
              <span className='  flex-shrink-0 inline-flex justify-center items-center size-[46px] shadow-sm mx-auto  bg-primary rounded-xl text-white'>
                <svg className='flex-shrink-0 size-5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' /><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' /></svg>
              </span>
              <div className='ms-5 sm:ms-8'>
                <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200'>
                  Integrated lesson management
                </h3>
                <p className='mt-1 text-gray-600 dark:text-gray-400'>
                  Our software will help you through the process from start to finish saving you time and improving your management.
                </p>
              </div>
            </div>

            <div className='flex'>
              <span className='  flex-shrink-0 inline-flex justify-center items-center size-[46px] shadow-sm mx-auto  bg-primary rounded-xl text-white'>
                <svg className='flex-shrink-0 size-5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z' />
                  <path d='M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1' />
                </svg>
              </span>
              <div className='ms-5 sm:ms-8'>
                <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200'>
                  Keep communication turned on
                </h3>
                <p className='mt-1 text-gray-600 dark:text-gray-400'>
                  Let integrated management work its magic. Classroom hours are allocated more fairly and equitably, keeping your staff happy and motivated.
                </p>
              </div>
            </div>

            <div className='flex'>
              <span className=' flex-shrink-0 inline-flex justify-center items-center size-[46px] shadow-sm mx-auto  bg-primary rounded-xl text-white'>
                <svg className='flex-shrink-0 size-5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M7 10v12' /><path d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z' /></svg>
              </span>
              <div className='ms-5 sm:ms-8'>
                <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200'>
                  Simple and affordable
                </h3>
                <p className='mt-1 text-gray-600 dark:text-gray-400'>
                  A very flat difficulty curve that will make the change from your old management system almost instantaneous and very pleasant.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='z-2 mt-16 aspect-w-16 aspect-h-7'>
          <img className=' max-h-[400px] w-full object-cover rounded-xl' src={Group} alt='Teacher explaining concepts to a group of students' />
        </div>
        <div className='z-2 sm:w-1/2 xl:w-1/2 mx-auto text-center mb-6 mt-12'>
          <h2 className='text-gray-800 font-bold text-4xl dark:text-white'>Developed with technologies that ensure you won't need anything else.</h2>
        </div>

        <div className='z-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 lg:gap-6 items-center'>
          <div className='relative p-4 md:p-7 bg-gray-100 rounded-lg dark:text-white group'>
            <div className='absolute w-[100%] -bottom-5 flex left-0'>
              <span style={{ clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)' }} className='group-hover:opacity-100 opacity-0 transition duration-300 group-hover:delay-0  ease-in-out absolute top-[-4px] left-1/2 block h-2 w-2 -translate-x-1/2 rotate-[315deg] bg-black dark:bg-white' />
              <span className='group-hover:opacity-100 opacity-0 transition duration-300 delay-50 group-hover:delay-0 ease-in-out rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black text-center mx-auto'>HTML 5</span>
            </div>

            <svg className='max-w-[70px] min-w-16 w-[40%] py-3 lg:py-5  h-auto  mx-auto text-amber-500 dark:text-white' width='26' height='30' viewBox='0 0 26 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path className='dark:hidden' d='M2.64369 26.4944L0.338013 0.631714H25.662L23.3535 26.4964L12.9938 29.3682L2.64369 26.4944Z' fill='#E34E26' />
              <path className='dark:hidden' d='M13 2.74573V27.1714L21.377 24.8494L23.3507 2.74573H13Z' fill='#EF662A' />
              <path className='dark:hidden' d='M5.05542 5.91797L5.91043 15.5103H16.9047L16.5357 19.6246L12.9958 20.5816L9.46264 19.626L9.22641 16.9842H6.04241L6.49771 22.0768L12.9951 23.8813L19.5007 22.0768L20.3728 12.3386H8.8116L8.52131 9.09029H20.6506H20.6603L20.9444 5.91797H5.05542Z' fill='white' />
              <path className='dark:hidden' d='M12.9999 5.91797H5.05542L5.91043 15.5103H12.9999V12.3386H8.8116L8.52131 9.09029H12.9999V5.91797Z' fill='#EBEBEB' />
              <path className='dark:hidden' d='M12.9999 20.5803L12.9958 20.5817L9.46258 19.626L9.22636 16.9843H6.04236L6.49765 22.0768L12.995 23.8814L12.9999 23.88V20.5803Z' fill='#EBEBEB' />

              <path className='hidden dark:block' d='M2.64369 26.4944L0.338013 0.631714H25.662L23.3535 26.4964L12.9938 29.3682L2.64369 26.4944Z' fill='white' />
              <path className='hidden dark:block' d='M13 2.74573V27.1714L21.377 24.8494L23.3507 2.74573H13Z' fill='#E4E6EA' />
              <path className='hidden dark:block' d='M5.05542 5.91797L5.91043 15.5103H16.9047L16.5357 19.6246L12.9958 20.5816L9.46264 19.626L9.22641 16.9842H6.04241L6.49771 22.0768L12.9951 23.8813L19.5007 22.0768L20.3728 12.3386H8.8116L8.52131 9.09029H20.6506H20.6603L20.9444 5.91797H5.05542Z' fill='#24303F' />
              <path className='hidden dark:block' d='M12.9999 5.91797H5.05542L5.91043 15.5103H12.9999V12.3386H8.8116L8.52131 9.09029H12.9999V5.91797Z' fill='#24303F' />
              <path className='hidden dark:block' d='M12.9999 20.5803L12.9958 20.5817L9.46258 19.626L9.22636 16.9843H6.04236L6.49765 22.0768L12.995 23.8814L12.9999 23.88V20.5803Z' fill='#24303F' />

            </svg>
          </div>

          <div className='relative p-4 md:p-7 bg-gray-100 rounded-lg dark:text-white group'>
            <div className='absolute w-[100%] -bottom-2 flex left-0'>
              <span style={{ clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)' }} className='group-hover:opacity-100 opacity-0 transition duration-300 group-hover:delay-0  ease-in-out absolute top-[-4px] left-1/2 block h-2 w-2 -translate-x-1/2 rotate-[315deg] bg-black dark:bg-white' />
              <span className='group-hover:opacity-100 opacity-0 transition duration-300 delay-50 group-hover:delay-0 ease-in-out rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black text-center mx-auto'>React</span>
            </div>

            <svg className='max-w-[70px] min-w-22 w-[43%] py-3 lg:py-5  h-auto  mx-auto text-sky-500 dark:text-white' width='36' height='40' viewBox='0 0 36 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_810_17136)'>
                <path d='M35.104 20.0036C35.104 17.6781 32.1918 15.4743 27.7269 14.1076C28.7572 9.55681 28.2993 5.93622 26.2815 4.77706C25.8164 4.50515 25.2726 4.37636 24.6787 4.37636V5.972C25.0078 5.972 25.2726 6.03639 25.4944 6.15803C26.4675 6.71615 26.8897 8.84128 26.5605 11.5746C26.4818 12.2472 26.353 12.9556 26.1956 13.6783C24.7932 13.3348 23.2619 13.0701 21.652 12.8983C20.686 11.5746 19.6843 10.3725 18.6754 9.32068C21.008 7.15262 23.1975 5.96484 24.6859 5.96484V4.3692C22.7181 4.3692 20.1422 5.77165 17.5377 8.20446C14.9332 5.78596 12.3572 4.39782 10.3895 4.39782V5.99346C11.8707 5.99346 14.0674 7.17409 16.4 9.32784C15.3982 10.3797 14.3965 11.5746 13.4448 12.8983C11.8277 13.0701 10.2965 13.3348 8.89406 13.6854C8.72949 12.9699 8.60785 12.2758 8.52199 11.6104C8.18569 8.87705 8.60069 6.75192 9.56666 6.18665C9.78132 6.05786 10.0604 6.00062 10.3895 6.00062V4.40498C9.78848 4.40498 9.24467 4.53378 8.77242 4.80568C6.76178 5.96484 6.31099 9.57828 7.34851 14.1147C2.8979 15.4886 0 17.6853 0 20.0036C0 22.3291 2.91221 24.5329 7.37713 25.8996C6.34677 30.4503 6.80471 34.0709 8.82251 35.2301C9.28761 35.502 9.83141 35.6308 10.4325 35.6308C12.4002 35.6308 14.9761 34.2283 17.5806 31.7955C20.1852 34.214 22.7611 35.6022 24.7288 35.6022C25.3298 35.6022 25.8736 35.4734 26.3459 35.2015C28.3565 34.0423 28.8073 30.4289 27.7698 25.8924C32.2061 24.5257 35.104 22.3219 35.104 20.0036ZM25.7878 15.231C25.523 16.154 25.1939 17.1057 24.8218 18.0573C24.5284 17.4849 24.2208 16.9125 23.8845 16.3401C23.5553 15.7676 23.2047 15.2095 22.8541 14.6657C23.8701 14.816 24.8504 15.002 25.7878 15.231ZM22.5106 22.8514C21.9525 23.8174 21.3801 24.7332 20.7862 25.5847C19.7201 25.6777 18.6396 25.7278 17.552 25.7278C16.4715 25.7278 15.3911 25.6777 14.3321 25.5919C13.7382 24.7404 13.1586 23.8317 12.6005 22.8729C12.0567 21.9355 11.563 20.9839 11.1122 20.025C11.5558 19.0662 12.0567 18.1074 12.5934 17.1701C13.1515 16.2041 13.7239 15.2882 14.3178 14.4367C15.3839 14.3437 16.4644 14.2936 17.552 14.2936C18.6325 14.2936 19.7129 14.3437 20.7719 14.4296C21.3658 15.2811 21.9454 16.1898 22.5035 17.1486C23.0473 18.086 23.541 19.0376 23.9918 19.9964C23.541 20.9552 23.0473 21.914 22.5106 22.8514ZM24.8218 21.9212C25.2082 22.88 25.5373 23.8388 25.8092 24.769C24.8719 24.998 23.8845 25.1912 22.8612 25.3414C23.2119 24.7905 23.5625 24.2252 23.8916 23.6456C24.2208 23.0732 24.5284 22.4936 24.8218 21.9212ZM17.5663 29.5559C16.9009 28.869 16.2354 28.1034 15.5771 27.2662C16.2211 27.2948 16.8794 27.3163 17.5448 27.3163C18.2174 27.3163 18.8829 27.302 19.534 27.2662C18.89 28.1034 18.2246 28.869 17.5663 29.5559ZM12.2428 25.3414C11.2267 25.1912 10.2464 25.0051 9.30907 24.7762C9.57382 23.8531 9.90296 22.9015 10.275 21.9498C10.5684 22.5222 10.8761 23.0947 11.2124 23.6671C11.5487 24.2395 11.8921 24.7976 12.2428 25.3414ZM17.5305 10.4512C18.196 11.1381 18.8614 11.9038 19.5197 12.7409C18.8757 12.7123 18.2174 12.6908 17.552 12.6908C16.8794 12.6908 16.214 12.7052 15.5628 12.7409C16.2068 11.9038 16.8722 11.1381 17.5305 10.4512ZM12.2356 14.6657C11.885 15.2167 11.5344 15.7819 11.2052 16.3615C10.8761 16.9339 10.5684 17.5064 10.275 18.0788C9.88865 17.12 9.55951 16.1612 9.28761 15.231C10.225 15.0092 11.2124 14.816 12.2356 14.6657ZM5.76003 23.6242C3.22705 22.5437 1.58848 21.127 1.58848 20.0036C1.58848 18.8802 3.22705 17.4563 5.76003 16.383C6.37539 16.1182 7.04799 15.8821 7.74206 15.6603C8.14991 17.0627 8.68656 18.5224 9.352 20.0179C8.69371 21.5062 8.16422 22.9587 7.76352 24.354C7.05515 24.1322 6.38255 23.8889 5.76003 23.6242ZM9.6096 33.8491C8.63647 33.291 8.21431 31.1659 8.54345 28.4325C8.62216 27.7599 8.75096 27.0516 8.90837 26.3289C10.3108 26.6723 11.8421 26.9371 13.452 27.1088C14.418 28.4325 15.4197 29.6346 16.4286 30.6865C14.096 32.8545 11.9065 34.0423 10.4181 34.0423C10.0962 34.0352 9.82425 33.9708 9.6096 33.8491ZM26.582 28.3968C26.9183 31.1301 26.5033 33.2552 25.5373 33.8205C25.3227 33.9493 25.0436 34.0065 24.7145 34.0065C23.2333 34.0065 21.0366 32.8259 18.704 30.6722C19.7058 29.6203 20.7075 28.4254 21.6592 27.1017C23.2763 26.9299 24.8075 26.6652 26.2099 26.3146C26.3745 27.0373 26.5033 27.7313 26.582 28.3968ZM29.3368 23.6242C28.7215 23.8889 28.0489 24.125 27.3548 24.3469C26.9469 22.9444 26.4103 21.4847 25.7448 19.9893C26.4031 18.501 26.9326 17.0484 27.3333 15.6531C28.0417 15.875 28.7143 16.1182 29.344 16.383C31.8769 17.4634 33.5155 18.8802 33.5155 20.0036C33.5084 21.127 31.8698 22.5509 29.3368 23.6242Z' fill='currentColor' />
                <path d='M17.5448 23.2736C19.3508 23.2736 20.8148 21.8095 20.8148 20.0036C20.8148 18.1976 19.3508 16.7336 17.5448 16.7336C15.7389 16.7336 14.2749 18.1976 14.2749 20.0036C14.2749 21.8095 15.7389 23.2736 17.5448 23.2736Z' fill='currentColor' />
              </g>
              <defs>
                <clipPath id='clip0_810_17136'>
                  <rect width='35.104' height='40' fill='currentColor' />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className='relative p-4 md:p-7 bg-gray-100 rounded-lg text-sky-500 dark:text-white group'>
            <div className='absolute w-[100%] -bottom-5 flex left-0'>
              <span style={{ clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)' }} className='group-hover:opacity-100 opacity-0 transition duration-300 group-hover:delay-0  ease-in-out absolute top-[-4px] left-1/2 block h-2 w-2 -translate-x-1/2 rotate-[315deg] bg-black dark:bg-white' />
              <span className='group-hover:opacity-100 opacity-0 transition duration-300 delay-50 group-hover:delay-0 ease-in-out rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black text-center mx-auto'>Tailwind</span>
            </div>

            <svg className='max-w-[70px] min-w-28 w-[50%] py-3 lg:py-5  h-auto  mx-auto text-gray-800 dark:text-white' width='37' height='22' viewBox='0 0 37 22' fill='none' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M18.1923 0C13.341 0 10.309 2.44444 9.09615 7.33333C10.9154 4.88889 13.0378 3.97222 15.4635 4.58333C16.8474 4.93167 17.8365 5.94407 18.9314 7.06377C20.715 8.88827 22.7795 11 27.2885 11C32.1397 11 35.1718 8.55556 36.3846 3.66667C34.5654 6.11111 32.4429 7.02778 30.0173 6.41667C28.6333 6.06833 27.6442 5.05593 26.5493 3.93623C24.7658 2.11173 22.7013 0 18.1923 0ZM9.09615 11C4.24487 11 1.21282 13.4444 0 18.3333C1.81923 15.8889 3.94167 14.9722 6.36731 15.5833C7.75127 15.9323 8.74039 16.9441 9.8353 18.0638C11.6188 19.8883 13.6833 22 18.1923 22C23.0436 22 26.0756 19.5556 27.2885 14.6667C25.4692 17.1111 23.3468 18.0278 20.9211 17.4167C19.5372 17.0683 18.5481 16.0559 17.4532 14.9362C15.6696 13.1117 13.6051 11 9.09615 11Z' fill='currentColor' /></svg>
          </div>

          <div className='relative p-4 md:p-7 bg-gray-100 rounded-lg text-sky-500 dark:text-white group'>
            <div className=' absolute w-[100%] -bottom-5 flex left-0 '>
              <span style={{ clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)' }} className='group-hover:opacity-100 opacity-0 transition duration-300 group-hover:delay-0  ease-in-out absolute top-[-4px] left-1/2 block h-2 w-2 -translate-x-1/2 rotate-[315deg] bg-black dark:bg-white' />
              <span className='group-hover:opacity-100 opacity-0 transition duration-300 delay-50 group-hover:delay-0 ease-in-out rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black text-center mx-auto'>JavaScript</span>
            </div>

            <svg className='max-w-[70px] min-w-20 w-[41%] py-3 lg:py-5  h-auto  mx-auto text-sky-500 dark:text-white' width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path className='dark:hidden' d='M0 0H26V26H0V0Z' fill='#F7DF1E' />
              <path className='dark:hidden' d='M6.83634 21.7275L8.82605 20.5234C9.2099 21.204 9.55908 21.7798 10.3967 21.7798C11.1995 21.7798 11.7057 21.4657 11.7057 20.2441V11.9365H14.149V20.2787C14.149 22.8093 12.6656 23.9612 10.5014 23.9612C8.54682 23.9612 7.41222 22.9489 6.8363 21.7273' fill='black' />
              <path className='dark:hidden' d='M15.4762 21.4657L17.4657 20.3139C17.9894 21.1691 18.67 21.7974 19.8742 21.7974C20.8866 21.7974 21.5322 21.2912 21.5322 20.5931C21.5322 19.7554 20.869 19.4586 19.752 18.9701L19.1413 18.7081C17.3785 17.9578 16.2091 17.0154 16.2091 15.0257C16.2091 13.1932 17.6053 11.7969 19.787 11.7969C21.3403 11.7969 22.4573 12.338 23.26 13.7517L21.3576 14.9733C20.9388 14.2229 20.4851 13.9262 19.787 13.9262C19.0715 13.9262 18.6177 14.38 18.6177 14.9733C18.6177 15.7063 19.0715 16.0031 20.1185 16.4569L20.7293 16.7187C22.8062 17.6088 23.9756 18.5163 23.9756 20.5582C23.9756 22.7574 22.2478 23.9615 19.9266 23.9615C17.6578 23.9615 16.1917 22.8795 15.4762 21.4657' fill='black' />

              <path className='hidden dark:block' d='M0 0H26V26H0V0Z' fill='white' />
              <path className='hidden dark:block' d='M6.83634 21.7275L8.82605 20.5234C9.2099 21.204 9.55908 21.7798 10.3967 21.7798C11.1995 21.7798 11.7057 21.4657 11.7057 20.2441V11.9365H14.149V20.2787C14.149 22.8093 12.6656 23.9612 10.5014 23.9612C8.54682 23.9612 7.41222 22.9489 6.8363 21.7273' fill='#24303F' />
              <path className='hidden dark:block' d='M15.4762 21.4657L17.4657 20.3139C17.9894 21.1691 18.67 21.7974 19.8742 21.7974C20.8866 21.7974 21.5322 21.2912 21.5322 20.5931C21.5322 19.7554 20.869 19.4586 19.752 18.9701L19.1413 18.7081C17.3785 17.9578 16.2091 17.0154 16.2091 15.0257C16.2091 13.1932 17.6053 11.7969 19.787 11.7969C21.3403 11.7969 22.4573 12.338 23.26 13.7517L21.3576 14.9733C20.9388 14.2229 20.4851 13.9262 19.787 13.9262C19.0715 13.9262 18.6177 14.38 18.6177 14.9733C18.6177 15.7063 19.0715 16.0031 20.1185 16.4569L20.7293 16.7187C22.8062 17.6088 23.9756 18.5163 23.9756 20.5582C23.9756 22.7574 22.2478 23.9615 19.9266 23.9615C17.6578 23.9615 16.1917 22.8795 15.4762 21.4657' fill='#24303F' />
            </svg>
          </div>

          <div className='p-4 md:p-7 bg-gray-100 rounded-lg dark:text-white relative group'>
            <div className='absolute w-[100%] -bottom-5 flex left-0'>
              <span style={{ clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)' }} className='group-hover:opacity-100 opacity-0 transition duration-300 group-hover:delay-0  ease-in-out absolute top-[-4px] left-1/2 block h-2 w-2 -translate-x-1/2 rotate-[315deg] bg-black dark:bg-white' />
              <span className='group-hover:opacity-100 opacity-0 transition duration-300 delay-50 group-hover:delay-0 ease-in-out rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black text-center mx-auto'>Node Js</span>
            </div>
            <svg className='min-w-21 w-[50%] max-w-[70px] py-3 lg:py-5  h-auto  mx-auto text-sky-500 dark:text-white' xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 32 32' preserveAspectRatio='xMidYMid'>
              <path className='dark:hidden' fill='#8cc84b' d='M14.656.427c.8-.453 1.82-.455 2.6 0L29.2 7.16c.747.42 1.247 1.253 1.24 2.114v13.5c.005.897-.544 1.748-1.332 2.16l-11.88 6.702a2.6 2.6 0 0 1-2.639-.073l-3.565-2.06c-.243-.145-.516-.26-.688-.495.152-.204.422-.23.642-.32.496-.158.95-.4 1.406-.656.115-.08.256-.05.366.022l3.04 1.758c.217.125.437-.04.623-.145l11.665-6.583c.144-.07.224-.222.212-.38V9.334c.016-.18-.087-.344-.25-.417L16.19 2.244a.41.41 0 0 0-.465-.001L3.892 8.93c-.16.073-.27.235-.25.415v13.37c-.014.158.07.307.215.375l3.162 1.785c.594.32 1.323.5 1.977.265a1.5 1.5 0 0 0 .971-1.409l.003-13.29c-.014-.197.172-.36.363-.34h1.52c.2-.005.357.207.33.405L12.18 23.88c.001 1.188-.487 2.48-1.586 3.063-1.354.7-3.028.553-4.366-.12l-3.4-1.88c-.8-.4-1.337-1.264-1.332-2.16v-13.5a2.46 2.46 0 0 1 1.282-2.141L14.656.427zM18.1 9.785c1.727-.1 3.576-.066 5.13.785 1.203.652 1.87 2.02 1.892 3.358-.034.18-.222.28-.394.267-.5-.001-1.002.007-1.504-.003-.213.008-.336-.188-.363-.376-.144-.64-.493-1.273-1.095-1.582-.924-.463-1.996-.44-3.004-.43-.736.04-1.527.103-2.15.535-.48.328-.624 1-.453 1.522.16.383.603.506.964.62 2.082.544 4.287.5 6.33 1.207.845.292 1.672.86 1.962 1.745.378 1.186.213 2.604-.63 3.556-.684.784-1.68 1.2-2.675 1.442-1.323.295-2.695.302-4.038.17-1.263-.144-2.577-.476-3.552-1.336-.834-.724-1.24-1.852-1.2-2.94.01-.184.193-.312.37-.297h1.5c.202-.014.35.16.36.35.093.6.322 1.25.854 1.6 1.026.662 2.313.616 3.487.635.973-.043 2.065-.056 2.86-.7.42-.367.543-.98.43-1.508-.123-.446-.6-.653-1-.8-2.055-.65-4.285-.414-6.32-1.15-.826-.292-1.625-.844-1.942-1.693-.443-1.2-.24-2.687.693-3.607.9-.915 2.22-1.268 3.47-1.394z' />
              <path className='hidden dark:block' fill='white' d='M14.656.427c.8-.453 1.82-.455 2.6 0L29.2 7.16c.747.42 1.247 1.253 1.24 2.114v13.5c.005.897-.544 1.748-1.332 2.16l-11.88 6.702a2.6 2.6 0 0 1-2.639-.073l-3.565-2.06c-.243-.145-.516-.26-.688-.495.152-.204.422-.23.642-.32.496-.158.95-.4 1.406-.656.115-.08.256-.05.366.022l3.04 1.758c.217.125.437-.04.623-.145l11.665-6.583c.144-.07.224-.222.212-.38V9.334c.016-.18-.087-.344-.25-.417L16.19 2.244a.41.41 0 0 0-.465-.001L3.892 8.93c-.16.073-.27.235-.25.415v13.37c-.014.158.07.307.215.375l3.162 1.785c.594.32 1.323.5 1.977.265a1.5 1.5 0 0 0 .971-1.409l.003-13.29c-.014-.197.172-.36.363-.34h1.52c.2-.005.357.207.33.405L12.18 23.88c.001 1.188-.487 2.48-1.586 3.063-1.354.7-3.028.553-4.366-.12l-3.4-1.88c-.8-.4-1.337-1.264-1.332-2.16v-13.5a2.46 2.46 0 0 1 1.282-2.141L14.656.427zM18.1 9.785c1.727-.1 3.576-.066 5.13.785 1.203.652 1.87 2.02 1.892 3.358-.034.18-.222.28-.394.267-.5-.001-1.002.007-1.504-.003-.213.008-.336-.188-.363-.376-.144-.64-.493-1.273-1.095-1.582-.924-.463-1.996-.44-3.004-.43-.736.04-1.527.103-2.15.535-.48.328-.624 1-.453 1.522.16.383.603.506.964.62 2.082.544 4.287.5 6.33 1.207.845.292 1.672.86 1.962 1.745.378 1.186.213 2.604-.63 3.556-.684.784-1.68 1.2-2.675 1.442-1.323.295-2.695.302-4.038.17-1.263-.144-2.577-.476-3.552-1.336-.834-.724-1.24-1.852-1.2-2.94.01-.184.193-.312.37-.297h1.5c.202-.014.35.16.36.35.093.6.322 1.25.854 1.6 1.026.662 2.313.616 3.487.635.973-.043 2.065-.056 2.86-.7.42-.367.543-.98.43-1.508-.123-.446-.6-.653-1-.8-2.055-.65-4.285-.414-6.32-1.15-.826-.292-1.625-.844-1.942-1.693-.443-1.2-.24-2.687.693-3.607.9-.915 2.22-1.268 3.47-1.394z' />
            </svg>
          </div>
        </div>
      </div>
      <div className='z-2 text-black dark:text-white z-1 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div className='md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32'>
          <div className='mt-5 lg:mt-0'>
            <div className='space-y-6 sm:space-y-8'>
              <div className='space-y-2 md:space-y-4'>
                <h4 className='mb-2.5 text-lg font-medium text-primary'>Created without limits</h4>
                <h2 className='font-bold text-4xl text-gray-800 dark:text-gray-200'>
                  By teachers for teachers
                </h2>
                <p className='text-gray-500'>
                  We have consulted in more than 50 educational centers and we have learned what the problems are. So we have developed the best solutions. We know firsthand how frustrating it is to waste time on management instead of focusing on educating students.
                </p>
              </div>

              <ul className='space-y-2 sm:space-y-4'>
                <li className='flex space-x-3 items-center'>
                  <span className='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500'>
                    <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12' /></svg>
                  </span>

                  <h5 className='text-xl font-semibold text-black dark:text-white'>Management of thousands of simultaneous requests</h5>
                </li>

                <li className='flex space-x-3 items-center'>
                  <span className='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500'>
                    <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12' /></svg>
                  </span>

                  <h5 className='text-xl font-semibold text-black dark:text-white'>Multi-platform support</h5>
                </li>

                <li className='flex space-x-3 items-center'>
                  <span className='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500'>
                    <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12' /></svg>
                  </span>

                  <h5 className='text-xl font-semibold text-black dark:text-white'>'Walk-in and work' solution without installations.</h5>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-12 sm:mt-10 lg:mt-0'>
            <img style={{ transform: 'scaleX(-1)' }} className='rounded-xl' src={Teacher1} alt='Teacher using the Zawee App on her computer' />
          </div>
        </div>
      </div>
      <div className='-z-1 bg-no-repeat w-[100%] relative h-[0] left-0 top-[70%] md:top-[130%] bg-center flex justify-center items-center overflow-visible'>
        <div className='absolute w-[100%] h-[500px] bg-top scale-150' style={{ backgroundImage: `url(${LightMesh})`, top: '-640px' }} alt='' />
        <div className='absolute w-[100%] h-[500px] bg-top scale-150' style={{ backgroundImage: `url(${LightMesh2})`, top: '107px', transform: 'translateX(5px) rotate(180deg) scale(1.5)' }} alt='' />
        <svg
          className='scale-x-[-1] absolute'
          xmlns='http://www.w3.org/2000/svg' width='1758' height='1500' viewBox='0 0 1758 473'
          style={{ backgroundColor: 'transparent' }}
          fill='none'
        >

          <g opacity='0.4' style={{ transform: 'translateY(-100%)' }}>
            <g className='dark:hidden block opacity-60' filter='url(#filter0_f_974_6198)'>
              <circle cx='1046.7' cy='711' r='311' fill='#3935FB' />
            </g>
            <g className='dark:hidden block opacity-60' filter='url(#filter0_f_974_6198)' style={{ transform: 'translateX(-376px)' }}>
              <circle cx='1046.7' cy='711' r='311' fill='#48DCFF' />
            </g>

            <g className='hidden dark:block opacity-80' filter='url(#filter0_f_974_6198)'>
              <circle cx='1046.7' cy='711' r='311' fill='#1027F7' />
            </g>
            <g className='hidden dark:block opacity-80' filter='url(#filter1_f_974_6198)'>
              <circle cx='711' cy='711' r='311' fill='#FD10BA' />
            </g>
          </g>
          <defs>
            <filter
              id='filter0_f_974_6198' x='335.704' y='0' width='1422' height='1422'
              filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
              <feGaussianBlur stdDeviation='200' result='effect1_foregroundBlur_974_6198' />
            </filter>
            <filter
              id='filter1_f_974_6198' x='0' y='0' width='1422' height='1422'
              filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
              <feGaussianBlur stdDeviation='200' result='effect1_foregroundBlur_974_6198' />
            </filter>
          </defs>
        </svg>
      </div>
      <div className='z-2 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div style={{ transform: 'scaleY(-1)' }} className='md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32'>
          <div style={{ transform: 'scaleY(-1)' }} className='order-2 md:order-none'>
            <img className='rounded-xl' src={Teacher2} alt='Picture of a Teacher explaining the use of the Zawee App' />
          </div>

          <div style={{ transform: 'scaleY(-1)' }} className='mt-12 sm:mt-10 lg:mt-0'>
            <div className='space-y-6 sm:space-y-8'>
              <div className='space-y-2 md:space-y-4'>
                <h4 className='mb-2.5 text-lg font-medium text-primary'>The keys to Zawee</h4>
                <h2 className='font-bold text-4xl text-black dark:text-white'>
                  The keys: robustness and versatility
                </h2>
                <p className='text-black dark:text-white'>
                  Your school's databases have never been so secure and fail-safe.
                </p>
              </div>

              <ul className='space-y-2 sm:space-y-4'>
                <li className='flex space-x-3'>

                  <span className='text-sm sm:text-base text-gray-500'>
                    <span className='font-bold text-2xl text-black dark:text-white'>Robustness</span>
                    <p className='text-black dark:text-white mt-2'>
                      Active data redundancy protection, never again worry about failures you can't control.
                    </p>
                  </span>
                </li>
                <li className='flex space-x-3'>

                  <span className='text-sm sm:text-base text-gray-800 dark:text-white'>
                    <span className='font-bold text-2xl text-black dark:text-white'>Versatility</span>
                    <p className='text-black dark:text-white mt-2'>
                      Forget about system crashes due to high traffic, our technology is prepared to handle thousands of simultaneous requests.
                    </p>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default AboutUSSection
