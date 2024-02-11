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

  /**
   * Handle the Select inputs change (Group and Module)
   * - If the input is the group, filter the available modules and set the group to the input
   * - If the input is the module, set the module to the input
   * @param {Event} e The event object
   */
  const handleLessonInputChange = (e) => {
    // If the input is the group, filter the available modules
    if (e.target.name === 'groupId') {
      // Find the group
      const group = groups.find((group) => group.id === Number(e.target.value))
      // Find the modules with the same course and formationId
      const availableModules = modules.filter((currentModule) => currentModule.course === group.course && currentModule.formationId === group.formationId)
      // If there are no available modules, set the error message
      if (availableModules.length <= 0) {
        setError('No modules available for this group. Please add a module to the group course.')
        setCreateLessonInput({ ...createLessonInput, group: null })
        return
      }
      // Save the available modules
      setAvailableModules(availableModules)
      // Set the group to the input
      setCreateLessonInput({ ...createLessonInput, group })
    }

    if (e.target.name === 'moduleId') {
      const module = modules.find((module) => module.id === Number(e.target.value))
      if (!module) {
        setError('No module selected')
        setCreateLessonInput({ ...createLessonInput, module: null })
        return
      }
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
                    <form className='flex gap-5 justify-end' onSubmit={handleFormSubmit}>
                      {/* <!-- Select to select the Group --> */}
                      <div className='relative z-20 bg-transparent dark:bg-form-input'>
                        <select className='relative z-20 w-64 h-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ' name='groupId' id='groupId' onChange={handleLessonInputChange}>
                          <option value=''>Select Group</option>
                          {groups.map((group) => (
                            <option key={group.id} value={group.id}>{group.denomination}</option>
                          ))}
                        </select>
                        <i className='absolute top-1/2 right-4 z-30 -translate-y-1/2 icon-[ep--arrow-down]' style={{ fontSize: '22px' }} />
                      </div>
                      {/* <!-- Select to Modules only show the modules with the same course --> */}
                      <div className='relative z-20 bg-transparent dark:bg-form-input'>
                        <select className='relative z-20 w-64 h-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ' name='moduleId' id='moduleId' onChange={handleLessonInputChange} disabled={availableModules.length <= 0}>
                          <option value=''>Select Module</option>
                          {availableModules.map((module) => (
                            <option key={module.id} value={module.id}>{module.acronym}</option>
                          ))}
                        </select>
                        <i className='absolute top-1/2 right-4 z-30 -translate-y-1/2 icon-[ep--arrow-down]' style={{ fontSize: '22px' }} />
                      </div>
                      <div className='flex justify-end '>
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
