import '../../css/style.css'
import '../../css/satoshi.css'
import LightGradient from '../../images/frontpage/gradient1light.svg'
import LightMesh from '../../images/frontpage/mesh1light.svg'

const AboutUSSection = () => {
  return (
    <section className='relative py-17.5 sm:py-22.5 xl:py-27.5 bg-white dark:bg-boxdark flex flex-col gap-[100px] font-medium leading-relaxed font-satoshi bg-primary text-white bg-gray  text-black dark:text-white justify-center items-center'>
      <div className='z-1 mx-auto max-w-[55rem] px-4 text-center sm:px-8 xl:px-0'>
        <span className='text-2xl font-heading mb-5 inline-block text-title-6 font-medium text-primary dark:text-black-5'>About Us</span>
        <h2 className='text-4xl xl:text-5xl font-semibold text-black dark:text-white'>Ultimate Tailwind Dashboard Crafted for your favourite Tech Stack</h2>
      </div>

      <div className='z-1 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div className='aspect-w-16 aspect-h-7'>
          <img className=' max-h-[400px] w-full object-cover rounded-xl' src='https://images.unsplash.com/photo-1624571409412-1f253e1ecc89?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=987&amp;q=80' alt='Image Description' />
        </div>

        <div className='z-2 mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12'>
          <div className='lg:col-span-1'>
            <h2 className='font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200'>
              We tackle the challenges start-ups face
            </h2>
            <p className='mt-2 md:mt-4 text-gray-500'>
              Besides working with start-up enterprises as a partner for digitalization, we have built enterprise products for common pain points that we have encountered in various products and projects.
            </p>
          </div>

          <div className='lg:col-span-2'>
            <div className='grid sm:grid-cols-2 gap-8 md:gap-12'>
              <div className='flex gap-x-5'>
                <svg className='flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='10' x='3' y='11' rx='2' /><circle cx='12' cy='5' r='2' /><path d='M12 7v4' /><line x1='8' x2='8' y1='16' y2='16' /><line x1='16' x2='16' y1='16' y2='16' /></svg>
                <div className='grow'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    Creative minds
                  </h3>
                  <p className='mt-1 text-gray-600 dark:text-gray-400'>
                    We choose our teams carefully. Our people are the secret to great work.
                  </p>
                </div>
              </div>

              <div className='flex gap-x-5'>
                <svg className='flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7 10v12' /><path d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z' /></svg>
                <div className='grow'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    Simple and affordable
                  </h3>
                  <p className='mt-1 text-gray-600 dark:text-gray-400'>
                    From boarding passes to movie tickets, there's pretty much nothing you can't store with Preline.
                  </p>
                </div>
              </div>

              <div className='flex gap-x-5'>
                <svg className='flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' /><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' /></svg>
                <div className='grow'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    Industry-leading documentation
                  </h3>
                  <p className='mt-1 text-gray-600 dark:text-gray-400'>
                    Our documentation and extensive Client libraries contain everything a business needs to build a custom integration.
                  </p>
                </div>
              </div>

              <div className='flex gap-x-5'>
                <svg className='flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' /><circle cx='9' cy='7' r='4' /><path d='M22 21v-2a4 4 0 0 0-3-3.87' /><path d='M16 3.13a4 4 0 0 1 0 7.75' /></svg>
                <div className='grow'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    Designing for people
                  </h3>
                  <p className='mt-1 text-gray-600 dark:text-gray-400'>
                    We actively pursue the right balance between functionality and aesthetics, creating delightful experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='z-1 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div className='md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32'>
          <div className='mt-5 sm:mt-10 lg:mt-0'>
            <div className='space-y-6 sm:space-y-8'>
              <div className='space-y-2 md:space-y-4'>
                <h2 className='font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200'>
                  We tackle the challenges start-ups face
                </h2>
                <p className='text-gray-500'>
                  Besides working with start-up enterprises as a partner for digitalization, we have built enterprise products for common pain points that we have encountered in various products and projects.
                </p>
              </div>

              <ul role='list' className='space-y-2 sm:space-y-4'>
                <li className='flex space-x-3'>
                  <span className='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500'>
                    <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12' /></svg>
                  </span>

                  <span className='text-sm sm:text-base text-gray-500'>
                    <span className='font-bold'>Easy &amp; fast</span> designing
                  </span>
                </li>

                <li className='flex space-x-3'>
                  <span className='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500'>
                    <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12' /></svg>
                  </span>

                  <span className='text-sm sm:text-base text-gray-500'>
                    Powerful <span className='font-bold'>features</span>
                  </span>
                </li>

                <li className='flex space-x-3'>
                  <span className='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500'>
                    <svg className='flex-shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12' /></svg>
                  </span>

                  <span className='text-sm sm:text-base text-gray-500'>
                    User Experience Design
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <img className='rounded-xl' src='https://images.unsplash.com/photo-1648737963503-1a26da876aca?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=900&amp;h=900&amp;q=80' alt='Image Description' />
          </div>
        </div>
      </div>
      <div className='z-0 bg-no-repeat w-[100%] h-[100%] absolute left-0 top-0 bg-bottom' style={{ backgroundImage: `url(${LightGradient})` }} />
      <div className='z-0 bg-no-repeat w-[100%] h-[100%] absolute left-0 top-0 bg-bottom' style={{ backgroundImage: `url(${LightMesh})` }} />
    </section>
  )
}

export default AboutUSSection
