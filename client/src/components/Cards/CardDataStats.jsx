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
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='rounded-full bg-slate-200 dark:bg-slate-700 h-11.5 w-11.5' />
          <div className='mt-4 flex items-end justify-between'>
            <div className='animate-pulse'>
              <div className='h-4 w-34 bg-slate-200 dark:bg-slate-700 rounded' />
              <h4 className='text-title-md font-bold text-black dark:text-white mt-4'>
                <div className='h-4 w-10 bg-slate-200 dark:bg-slate-700 rounded' />
              </h4>
            </div>

            <span
              className='flex items-center gap-1 text-sm font-medium'
            >
              <div className='h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded' />

            </span>
          </div>
        </div>
        )
      : (
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
            {children}
          </div>

          <div className='mt-4 flex items-end justify-between'>
            <div>
              <span className='text-sm font-medium'>{title}</span>
              <h4 className='text-title-md font-bold text-black dark:text-white mt-4'>
                {total}
              </h4>
            </div>

            <span
              className='flex items-center gap-1 text-sm font-medium'
            >
              <NavLink
                to={route}
                className='inline-flex items-center justify-center rounded-md border dark:border-form-strokedark border-stroke py-2 px-6 text-center font-medium text-black dark:text-white hover:bg-opacity-90 hover:bg-gray-2 dark:hover:bg-opacity-90 dark:hover:bg-meta-4 transition-colors '
              >View All
              </NavLink>
            </span>
          </div>
        </div>
        )

  )
}

export default CardDataStats
