const Hero = () => {
  return (
    <section id='home' className='min-h-screen relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] dark:bg-boxdark dark:drop-shadow-none'>
      <div className='flex justify-start'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='wow fadeInUp mx-auto max-w-[800px] text-center' data-wow-delay='.2s'>
              <h1 className='mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight'>Free and Open-Source Next.js Template for Startup &amp; SaaS</h1>
              <p className='mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl'>Startup is free Next.js template for startups and SaaS business websites comes with all the essential pages, components, and sections you need to launch a complete business website, built-with Next 13.x and Tailwind CSS.</p>
              <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                <a className='rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80' href='https://nextjstemplates.com/templates/saas-starter-startup'>🔥 Get Pro</a>
                <a className='rounded-md bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30' href='https://github.com/NextJSTemplates/startup-nextjs'>Star on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
