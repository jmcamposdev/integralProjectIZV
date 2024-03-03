import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import EditLesson from '../../Lesson/EditLesson'
import TableTemplate from '../TableTemplate'
import lessonColumns from './lessonColumns'
import useAlertToast from '../../../hooks/useToast'
import lessonService from '../../../services/lessonService'

const LessonTable = ({ receivedLessons, professors, modules, groups }) => {
  const { toast } = useAlertToast()
  const { isAdmin } = useAuth()
  const [lessons, setLessons] = useState(receivedLessons || [])
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
        toast.showError('No modules available for this group yet. Please add a module with the same course and formation.')
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
        toast.showError('No module selected')
        setCreateLessonInput({ ...createLessonInput, module: null })
        return
      }

      // Get the professors that are available for the module with the same specialty
      const filteredProfessors = professors.filter((professor) => professor.specialty === module.specialty)
      if (filteredProfessors.length <= 0) {
        toast.showError('No professors available for this module yet. Please add a professor with the same specialty.')
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

  const handleGenerateLessonsButton = async () => {
    try {
      const generatedLessons = await lessonService.generateLessons()
      setLessons(generatedLessons)
      toast.showSuccess('Lessons generated successfully')
    } catch (error) {
      toast.showError(error.message)
    }
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
              <TableTemplate data={lessons} columns={lessonColumns(groups, modules, professors)} onEdit={handleEditLesson} />
              {// Only show the add lessons button if the user is an admin
                  isAdmin && (
                    <div className='flex gap-5 justify-end mt-8 flex-col md:flex-row'>
                      {lessons.length === 0 && professors.length > 0 && modules.length > 0 && groups.length > 0 && (
                        <button className='inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 duration-300 ease-in-out mr-auto' onClick={handleGenerateLessonsButton}>
                          Generate Lesson
                        </button>
                      )}

                      <form className='flex gap-5 justify-end flex-col md:flex-row' onSubmit={handleFormSubmit}>
                        {/* <!-- Select to select the Group --> */}
                        <div className='relative z-20 bg-gray dark:bg-form-input duration-300 ease-linear'>
                          <select className='relative z-20 w-full md:w-50 h-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary duration-300 ease-linear ' name='groupId' id='groupId' onChange={handleLessonInputChange}>
                            <option value='' disabled>Select Group</option>
                            {groups.map((group) => (
                              <option key={group.id} value={group.id}>{group.denomination}</option>
                            ))}
                          </select>
                          <i className='absolute top-1/2 right-4 z-30 -translate-y-1/2 icon-[ep--arrow-down]' style={{ fontSize: '22px' }} />
                        </div>
                        {/* <!-- Select to Modules only show the modules with the same course --> */}
                        <div className='relative z-20 bg-gray dark:bg-form-input duration-300 ease-linear'>
                          <select className='relative z-20 w-full md:w-50 h-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary duration-300 ease-linear' name='moduleId' id='moduleId' onChange={handleLessonInputChange} disabled={availableModules.length <= 0}>
                            <option value='' disabled>Select Module</option>
                            {availableModules.map((module) => (
                              <option key={module.id} value={module.id}>{module.acronym}</option>
                            ))}
                          </select>
                          <i className='absolute top-1/2 right-4 z-30 -translate-y-1/2 icon-[ep--arrow-down]' style={{ fontSize: '22px' }} />
                        </div>
                        <div className='flex justify-end '>
                          <button type='submit' className={`inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 duration-300 ease-in-out ${createLessonInput.group === null || createLessonInput.module === null ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={createLessonInput.group === null || createLessonInput.module === null}>
                            Create Lesson
                          </button>
                        </div>
                      </form>
                    </div>

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
