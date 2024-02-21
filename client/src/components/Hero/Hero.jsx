import useAuth from '../../hooks/useAuth'
import HeroImg from '../../images/frontpage/heroImg.jpg'

const Hero = () => {
  const { isLogged } = useAuth()

  return (
    <section id='home' className='flex align-center static bg-cover min-h-screen relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] dark:bg-boxdark dark:drop-shadow-none'>
      <div className='absolute w-[100%] h-[100%] top-0 left-0 -z-1 brightness-75' style={{ backgroundImage: `url(${HeroImg})` }} />
      <div className='flex justify-start px-[7%]'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='wow fadeInUp mx-auto max-w-[800px] ' data-wow-delay='.2s'>
              <h1 className='mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight'>Free and Open-Source Next.js Template for Startup &amp; SaaS</h1>
              <div className='flex flex-col items-center justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
