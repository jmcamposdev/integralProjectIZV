import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import ErrorAlert from '../Alerts/ErrorAlert'

const LessonList = ({ lessons, professors, modules, groups }) => {
  const { isAdmin } = useAuth()
  const [error, setError] = useState(null) // Save the error message

  return (
    <>
      {/* <!-- ===== Start of Lesson Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Lessons List
        </h4>
        <div className='flex flex-col'>
          <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 ${isAdmin ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
            <div className='p-2.5 xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Group
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Module
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Professor
              </h5>
            </div>
            {// Only show the actions column if the user is an admin
              isAdmin && (
                <div className='p-2.5 text-center xl:p-5'>
                  <h5 className='text-sm font-medium uppercase xsm:text-base'>
                    Actions
                  </h5>
                </div>
              )
            }

          </div>

        </div>
        {lessons.length <= 0
          ? (
            <div className='text-center p-10'>No lessons yet...</div>
            )
          : (
              lessons.map((lessons) => (
                <div className={`grid grid-cols-2 sm:grid-cols-${isAdmin ? '4' : '3'}`} key={lessons.id}>
                  <div className='p-2.5 xl:p-5'>
                    <p className='text-black dark:text-white'>
                      {groups.find((group) => group.id === lessons.groupId)?.denomination}
                    </p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>
                      {modules.find((module) => module.id === lessons.moduleId)?.acronym}
                    </p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>
                      {professors.find((professor) => professor.id === lessons.professorId)?.name || 'No professor'}
                    </p>
                  </div>
                  {
                      isAdmin && (
                        <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                          <button>
                            <i className='icon-[lucide--edit] fill-current duration-300 ease-in-out hover:text-meta-3' style={{ fontSize: '20px' }} />
                          </button>
                        </div>
                      )
                    }

                </div>

              )))}
        {// Only show the add lessons button if the user is an admin
          isAdmin && (
            <button
              onClick={() => setViewCreateModal(true)}
              className='mt-8 flex ml-auto w-max items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            >
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z' /></svg>
              </span>Add Lesson
            </button>
          )
        }

      </div>
      {/* <!-- ===== End of Lesson Table ===== --> */}
    </>
  )
}

export default LessonList
