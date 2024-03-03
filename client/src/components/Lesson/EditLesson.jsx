import React, { useState } from 'react'
import HoursCounter from './HoursCounter'
import lessonService from '../../services/lessonService'
import CircularProgressBar from '../ProgressBars/CircularProgressBar'
import useAlertToast from '../../hooks/useToast'

const EditLesson = ({ currentGroup, currentModule, onClose, allLessons, professors }) => {
  const { toast } = useAlertToast() // Show alert messages
  // Filter the lessons that belong to the current group and module
  const [lessons, setLessons] = useState(allLessons.filter((currentLesson) => currentLesson.groupId === currentGroup.id && currentLesson.moduleId === currentModule.id))
  // Filter the professors that have the same specialty as the module
  const availableProfessors = professors.filter(professor => professor.specialty === currentModule.specialty)
  // State to store the lessons that were removed only if they were already in the database (have an id)
  const [lessonsToDel, setLessonsToDel] = useState([])
  // State to store the current hour
  const [currentHour, setCurrentHour] = useState(lessons.reduce((acc, lesson) => acc + lesson.hours, 0))
  // State to store the error message
  const maxHour = currentModule.hours

  /**
   * Check if the professor is already assigned to another lesson and update the professor of the lesson
   * @param {Number} index The index of the lesson to update
   * @param {Number} selectedProfessorId The id of the selected professor
   * @returns
   */
  const handleProfessorChange = (index, selectedProfessorId) => {
    // Check if the professor is already assigned to another lesson
    const professorAlreadyAssigned = lessons.some((lesson, i) => i !== index && lesson.professorId === selectedProfessorId)
    // If the professor is already assigned to another lesson, show an error message
    if (professorAlreadyAssigned) {
      toast.showError('The professor is already assigned to another lesson')
      return
    }

    // Update the professor of the lesson
    const updatedLessons = [...lessons] // Create a copy of the lessons to avoid modifying the state directly
    updatedLessons[index].professorId = selectedProfessorId // Update the professor of the lesson
    setLessons(updatedLessons) // Update the state with the new lessons
  }

  /**
   * Update the hours of the lesson
   * @param {Number} index The index of the lesson to update
   * @param {Number} selectedHours The selected hours
   */
  const handleHoursChange = (index, selectedHours) => {
    const updatedLessons = [...lessons] // Create a copy of the lessons to avoid modifying the state directly
    updatedLessons[index].hours = selectedHours // Update the hours of the lesson
    setLessons(updatedLessons) // Update the state with the new lessons
    setCurrentHour(updatedLessons.reduce((acc, lesson) => acc + lesson.hours, 0)) // Update the current hour
  }

  /**
   * Delete the lesson from the list of lessons
   * Also, add the lesson to the list of lessons to delete if it was already in the database
   * @param {Number} index The index of the lesson to delete
   */
  const handleLessonDelete = (index) => {
    const lessonToDelete = lessons[index] // Get the lesson to delete
    // If the lesson was already in the database, add it to the list of lessons to delete
    if (lessonToDelete.id) {
      setLessonsToDel([...lessonsToDel, lessonToDelete.id])
    }
    // Remove the lesson from the list of lessons
    const updatedLessons = lessons.filter((lesson, i) => i !== index)
    setLessons(updatedLessons)

    // Update the current hour
    setCurrentHour(updatedLessons.reduce((acc, lesson) => acc + lesson.hours, 0))
  }

  const handleDeleteAllLessons = async () => {
    const lessonsToDelete = lessons.map((lesson) => lesson.id)

    for (const lessonId of lessonsToDelete) {
      try {
        await lessonService.deleteLesson(lessonId)
      } catch (error) {
        toast.showError('Error deleting lessons')
      }
    }

    window.location.reload()
  }

  /**
   * Add a new lesson to the list of lessons
   * Only add a new lesson if the last lesson has a professor and hours
   * Also, don't add a new lesson if all hours are already assigned
   */
  const handleAddLesson = () => {
    // Only add a new lesson if the last lesson has a professor and hours
    const lastLesson = lessons[lessons.length - 1] // Get the last lesson
    // If the last lesson doesn't have a professor or hours, show an error message
    if (lastLesson && (!lastLesson.professorId || !lastLesson.hours)) {
      toast.showError('Please fill the last lesson before adding a new one')
      return
    }

    // If all hours are already assigned, don't add a new lesson
    if (currentHour === maxHour) {
      toast.showError('All hours are already assigned')
      return
    }

    // Add a new lesson to the list of lessons
    const newLesson = {
      groupId: currentGroup.id,
      moduleId: currentModule.id,
      professorId: null,
      hours: 0
    }
    // Update the state with the new lessons
    setLessons([...lessons, newLesson])
  }

  /**
   * Save the changes made to the lessons
   * - Delete the lessons that were removed from the list of lessons
   * - Update the lessons that were modified
   * - Create the new lessons
   * Also, validate that all lessons have a professor and hours
   * And validate that the total hours assigned are equal to the module hours
   * Finally, refresh the page
   */
  const saveChanges = async () => {
    // Validate that all lessons have a professor and hours
    const invalidLessons = lessons.filter((lesson) => !lesson.professorId || !lesson.hours)
    if (invalidLessons.length > 0) {
      toast.showError('All lessons must have a professor and hours')
      return
    }

    // Validate that the total hours assigned are equal to the module hours
    if (currentHour !== maxHour) {
      toast.showError('The total hours assigned must be equal to the module hours')
      return
    }

    // First, delete the lessons that were removed
    for (const lessonId of lessonsToDel) {
      try {
        await lessonService.deleteLesson(lessonId)
      } catch (error) {
        toast.showError('Error deleting lessons')
      }
    }

    // Then, update the lessons that were modified
    for (const lesson of lessons.filter((lesson) => lesson.id)) {
      try {
        await lessonService.updateLesson(lesson)
      } catch (error) {
        toast.showError('Error updating lessons')
      }
    }

    // Finally, create the new lessons
    for (const lesson of lessons.filter((lesson) => !lesson.id)) {
      try {
        await lessonService.createLesson(lesson)
      } catch (error) {
        toast.showError('Error creating lessons')
      }
    }

    // Refresh the page
    window.location.reload()
  }

  return (
    <div className='relative'>
      {/* Close Button */}
      <button className='absolute top-3 right-3 fill-current duration-300 ease-in-out hover:text-red-500' onClick={onClose}>
        <span className='icon-[lets-icons--close-round-light]' style={{ fontSize: '40px' }} />
      </button>
      {/* End Close Button */}

      {/* Start of Lesson Info */}
      <div className='flex items-center gap-10 mb-12'>
        <div>
          <h4 className='mb-3 text-xl font-semibold text-black dark:text-white duration-300 ease-linear'>Editing Lesson</h4>
          <h5 className='text-lg font-medium text-gray-500'><span className='text-black dark:text-white duration-300 ease-linear'>Group:</span> {currentGroup.denomination}</h5>
          <h5 className='text-lg font-medium text-gray-500'><span className='text-black dark:text-white duration-300 ease-linear'>Module:</span> {currentModule.denomination}</h5>
        </div>
        <CircularProgressBar current={currentHour} max={maxHour} />
      </div>
      {/* End of Lesson Info */}

      {/* Start of All Lessons */}
      <div className='lessons-container flex flex-wrap justify-start items-center'>
        {lessons.length >= 0 && (
          <>
            {lessons.map((lesson, index) => (
              <div key={index} className='grow-0 shrink-0 basis-1/3'>
                <div className='relative rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6 m-5 duration-300 ease-linear'>
                  <button className='absolute top-3 right-3 fill-current duration-300 ease-in-out hover:text-red-500' onClick={() => handleLessonDelete(index)}>
                    <span className='icon-[lets-icons--close-round-light]' style={{ fontSize: '25px' }} />
                  </button>
                  <div className='lesson mb-4 relative'>
                    <h5 className='text-lg font-medium text-gray-500 mb-3'>Lesson {index + 1}</h5>
                    {/* Mostrar detalles de la lección y permitir la modificación */}
                    <div className='relative z-20 bg-transparent dark:bg-form-input duration-300 ease-linear'>
                      <select
                        className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary duration-300 ease-linear'
                        value={lesson.professorId || ''}
                        onChange={(e) => handleProfessorChange(index, Number(e.target.value))}
                      >
                        <option value='' disabled>Select Professor</option>
                        {availableProfessors.map((professor) => (
                          <option key={professor.id} value={professor.id}>
                            {professor.name}
                          </option>
                        ))}
                      </select>
                      <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 icon-[ep--arrow-down]' style={{ fontSize: '22px' }} />
                    </div>
                    <HoursCounter
                      index={index}
                      maxHour={lesson.professorId ? currentModule.hours - currentHour + lesson.hours : 0}
                      minHour={0}
                      currentHour={lesson.hours}
                      handleHourChange={handleHoursChange}
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Permitir agregar más lecciones si no se exceden las horas */}
            {currentHour < maxHour && (
              <div className='grow-0 shrink-0 basis-1/3 flex justify-center'>
                <button className='inline-flex items-center justify-center rounded-full bg-primary py-4 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4 duration-300 ease-in-out' onClick={handleAddLesson}>
                  <span className='icon-[ph--plus]' style={{ fontSize: '28px' }} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* End of All Lessons */}

      {/* Start of Save Lessons Button */}
      <div className='flex justify-center items-center mt-6'>
        <div>
          <button
            className='inline-flex items-center justify-center rounded-md bg-red-500 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 duration-300 ease-in-out'
            onClick={handleDeleteAllLessons}
          >Delete All
          </button>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <button
            className={`inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 duration-300 ease-in-out ${currentHour !== maxHour ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={saveChanges}
            disabled={currentHour !== maxHour}
          >Save Lessons
          </button>
        </div>
      </div>
      {/* End of Save Lessons Button */}
    </div>
  )
}

export default EditLesson
