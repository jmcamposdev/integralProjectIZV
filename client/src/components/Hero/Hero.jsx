import useAuth from '../../hooks/useAuth'
import HeroImg from '../../images/frontpage/heroImg.jpg'

const Hero = () => {
  const { isLogged } = useAuth()

  return (
    <section id='home' className='static bg-cover min-h-screen relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] dark:bg-boxdark dark:drop-shadow-none'>
      <div className='absolute w-[100%] h-[100%] top-0 left-0 -z-1 brightness-75' style={{ backgroundImage: `url(${HeroImg})` }} />
      <div className='flex justify-start px-[7%] mt-[30%]'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='wow fadeInUp mx-auto max-w-[800px] ' data-wow-delay='.2s'>
              <h1 className='mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight'>Free and Open-Source Next.js Template for Startup &amp; SaaS</h1>
              <p className='mb-12 text-base font-medium !leading-relaxed text-black dark:text-white dark:opacity-90 sm:text-lg md:text-xl'>Startup is free Next.js template for startups and SaaS business websites comes with all the essential pages, components, and sections you need to launch a complete business website, built-with Next 13.x and Tailwind CSS.</p>
              <div className='flex flex-col items-center justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                {isLogged
                  ? (
                    <a
                      href='/dashboard'
                      className='rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80'
                    >
                      Dashboard
                    </a>
                    )
                  : null}
                {!isLogged
                  ? (
                    <a
                      href='/signup'
                      className='rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80'
                    >
                      Sign Up
                    </a>
                    )
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
