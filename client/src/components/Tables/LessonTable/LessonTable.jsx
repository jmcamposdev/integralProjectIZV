import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import ErrorAlert from '../../Alerts/ErrorAlert'
import EditLesson from '../../Lesson/EditLesson'
import TableTemplate from '../TableTemplate'
import lessonColumns from './lessonColumns'

const LessonTable = ({ lessons, professors, modules, groups }) => {
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
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {
        lessonToEdit
          ? (
            <EditLesson currentModule={lessonToEdit.module} currentGroup={lessonToEdit.group} allLessons={lessons} professors={professors} onClose={() => setLessonToEdit(null)} />
            )
          : (
            <div>
              <TableTemplate data={lessons} columns={lessonColumns(groups, modules, professors)} onEdit={handleEditLesson} />
              {// Only show the add lessons button if the user is an admin
                  isAdmin && (
                    <form className='flex gap-5 justify-end mt-8' onSubmit={handleFormSubmit}>
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
              {/* <!-- ===== End of Lesson Table ===== --> */}
            </div>
            )
      }
    </>
  )
}

export default LessonTable
