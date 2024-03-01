import { NavLink } from 'react-router-dom'

const CardDataStats = ({
  title,
  total,
  route,
  loading,
  children
}) => {
  return (
    loading
      ? (
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark duration-300 ease-linear'>
          <div className='rounded-full bg-slate-200 dark:bg-slate-700 h-11.5 w-11.5 duration-300 ease-linear' />
          <div className='mt-4 flex items-end justify-between'>
            <div className='animate-pulse'>
              <div className='h-4 w-34 bg-slate-200 dark:bg-slate-700 rounded duration-300 ease-linear' />
              <h4 className='text-title-md font-bold text-black dark:text-white mt-4 duration-300 ease-linear'>
                <div className='h-4 w-10 bg-slate-200 dark:bg-slate-700 rounded duration-300 ease-linear' />
              </h4>
            </div>

            <span
              className='flex items-center gap-1 text-sm font-medium'
            >
              <div className='h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded duration-300 ease-linear' />

            </span>
          </div>
        </div>
        )
      : (
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark duration-300 ease-linear'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 duration-300 ease-linear'>
            {children}
          </div>

          <div className='mt-4 flex items-end justify-between'>
            <div>
              <span className='text-sm font-medium'>{title}</span>
              <h4 className='text-title-md font-bold text-black dark:text-white mt-4 duration-300 ease-linear'>
                {total}
              </h4>
            </div>

            <span
              className='flex items-center gap-1 text-sm font-medium'
            >
              <NavLink
                to={route}
                className='inline-flex items-center justify-center rounded-md border dark:border-form-strokedark border-stroke py-2 px-6 text-center font-medium text-black dark:text-white hover:bg-opacity-90 hover:bg-gray-2 dark:hover:bg-opacity-90 dark:hover:bg-meta-4 transition-colors duration-300 ease-linear'
              >View All
              </NavLink>
            </span>
          </div>
        </div>
        )

  )
}

export default CardDataStats
