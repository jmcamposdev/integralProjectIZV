import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import ErrorAlert from '../Alerts/ErrorAlert'
import EditLesson from '../Lesson/EditLesson'

const LessonList = ({ lessons, professors, modules, groups }) => {
  const { isAdmin } = useAuth()
  const [error, setError] = useState(null) // Save the error message
  const [lessonToEdit, setLessonToEdit] = useState(null) // Save the lesson to edit
  const [availableModules, setAvailableModules] = useState([]) // Save the available modules
  const [createLessonInput, setCreateLessonInput] = useState({
    group: null,
    module: null
  }) // Save the input to create a lesson

  const handleLessonInputChange = (e) => {
    if (e.target.name === 'groupId') {
      const group = groups.find((group) => group.id === Number(e.target.value))
      const availableModules = modules.filter((currentModule) => currentModule.course === group.course && currentModule.formationId === group.formationId)
      if (availableModules.length <= 0) {
        setError('No modules available for this group. Please add a module to the group course.')
      }
      setAvailableModules(availableModules)
      setCreateLessonInput({ ...createLessonInput, group })
    }

    if (e.target.name === 'moduleId') {
      const module = modules.find((module) => module.id === Number(e.target.value))
      setCreateLessonInput({ ...createLessonInput, module })
    }
  }

  const handleEditLesson = (lesson) => {
    const group = groups.find((group) => group.id === lesson.groupId)
    const module = modules.find((module) => module.id === lesson.moduleId)
    setLessonToEdit({ group, module })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setLessonToEdit(createLessonInput)
  }

  return (
    <>
      {
        lessonToEdit
          ? (
            <EditLesson currentModule={lessonToEdit.module} currentGroup={lessonToEdit.group} allLessons={lessons} professors={professors} onClose={() => setLessonToEdit(null)} />
            )
          : (
            <div>
              {/* <!-- ===== Start of Lesson Table ===== --> */}
              <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
                {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
                <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
                  Lessons List
                </h4>
                <div className='flex flex-col'>
                  <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 ${isAdmin ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
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
                    <div className='p-2.5 text-center xl:p-5'>
                      <h5 className='text-sm font-medium uppercase xsm:text-base'>
                        Hours
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
                      lessons.map((lesson) => (
                        <div className={`grid grid-cols-2 sm:grid-cols-${isAdmin ? '5' : '4'}`} key={lesson.id}>
                          <div className='p-2.5 xl:p-5'>
                            <p className='text-black dark:text-white'>
                              {groups.find((group) => group.id === lesson.groupId)?.denomination}
                            </p>
                          </div>
                          <div className='p-2.5 text-center xl:p-5'>
                            <p className='text-black dark:text-white'>
                              {modules.find((module) => module.id === lesson.moduleId)?.acronym}
                            </p>
                          </div>
                          <div className='p-2.5 text-center xl:p-5'>
                            <p className='text-black dark:text-white'>
                              {professors.find((professor) => professor.id === lesson.professorId)?.name || 'No professor'}
                            </p>
                          </div>
                          <div className='p-2.5 text-center xl:p-5'>
                            <p className='text-black dark:text-white'>
                              {lesson.hours}
                            </p>
                          </div>
                          {
                            isAdmin && (
                              <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                                <button onClick={() => { handleEditLesson(lesson) }}>
                                  <i className='icon-[lucide--edit] fill-current duration-300 ease-in-out hover:text-meta-3' style={{ fontSize: '20px' }} />
                                </button>
                              </div>
                            )
                          }
                        </div>
                      ))
                    )}
                {// Only show the add lessons button if the user is an admin
                  isAdmin && (
                    <form className='' onSubmit={handleFormSubmit}>
                      {/* <!-- Select to select the Group --> */}
                      <select className='w-full mt-5 border border-stroke dark:border-strokedark rounded-sm bg-gray-2 dark:bg-meta-4' name='groupId' id='groupId' onChange={handleLessonInputChange}>
                        <option value=''>Select Group</option>
                        {groups.map((group) => (
                          <option key={group.id} value={group.id}>{group.denomination}</option>
                        ))}
                      </select>
                      {/* <!-- Select to Modules only show the modules with the same course --> */}
                      <select className='w-full mt-5 border border-stroke dark:border-strokedark rounded-sm bg-gray-2 dark:bg-meta-4' name='moduleId' id='moduleId' onChange={handleLessonInputChange} disabled={availableModules.length <= 0}>
                        <option value=''>Select Module</option>
                        {availableModules.map((module) => (
                          <option key={module.id} value={module.id}>{module.acronym}</option>
                        ))}
                      </select>
                      <div className='flex justify-end mt-5'>
                        <button type='submit' className='bg-primary text-white py-2 px-4 rounded-md' disabled={createLessonInput.group === null || createLessonInput.module === null}>
                          Create Lesson
                        </button>
                      </div>
                    </form>
                  )
                }

              </div>
              {/* <!-- ===== End of Lesson Table ===== --> */}
            </div>
            )
      }
    </>
  )
}

export default LessonList
