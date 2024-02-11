import React, { useState } from 'react'
import ErrorAlert from '../Alerts/ErrorAlert'
import HoursCounter from './HoursCounter'
import lessonService from '../../services/lessonService'

const EditLesson = ({ currentGroup, currentModule, onClose, allLessons, professors }) => {
  const [lessons, setLessons] = useState(allLessons.filter((currentLesson) => currentLesson.groupId === currentGroup.id && currentLesson.moduleId === currentModule.id))
  const [availableProfessors, setAvailableProfessors] = useState(professors.filter(professor => professor.specialty === currentModule.specialty))
  const [lessonsToDel, setLessonsToDel] = useState([])
  const [currentHour, setCurrentHour] = useState(lessons.reduce((acc, lesson) => acc + lesson.hours, 0))
  const [maxHour, setMaxHour] = useState(currentModule.hours)
  const [error, setError] = useState(null)

  const handleProfessorChange = (index, selectedProfessorId) => {
    // Check if the professor is already assigned to another lesson
    const professorAlreadyAssigned = lessons.some((lesson, i) => i !== index && lesson.professorId === selectedProfessorId)
    if (professorAlreadyAssigned) {
      setError('The professor is already assigned to another lesson')
      return
    }

    // Update the professor of the lesson
    const updatedLessons = [...lessons]
    updatedLessons[index].professorId = selectedProfessorId
    setLessons(updatedLessons)
  }

  const handleHoursChange = (index, selectedHours) => {
    const updatedLessons = [...lessons]
    updatedLessons[index].hours = selectedHours
    setLessons(updatedLessons)
    setCurrentHour(updatedLessons.reduce((acc, lesson) => acc + lesson.hours, 0))
  }

  const handleLessonDelete = (index) => {
    const lessonToDelete = lessons[index]
    // If the lesson was already in the database, add it to the list of lessons to delete
    if (lessonToDelete.id) {
      setLessonsToDel([...lessonsToDel, lessonToDelete.id])
    }
    const updatedLessons = lessons.filter((lesson, i) => i !== index)
    setLessons(updatedLessons)

    // Update the current hour
    setCurrentHour(updatedLessons.reduce((acc, lesson) => acc + lesson.hours, 0))
  }

  const handleAddLesson = () => {
    // Only add a new lesson if the last lesson has a professor and hours
    const lastLesson = lessons[lessons.length - 1]
    if (lastLesson && (!lastLesson.professorId || !lastLesson.hours)) {
      setError('Please fill the last lesson before adding a new one')
      return
    }

    // If all hours are already assigned, don't add a new lesson
    if (currentHour === maxHour) {
      setError('All hours are already assigned')
      return
    }

    if (currentHour < maxHour) {
      const newLesson = {
        groupId: currentGroup.id,
        moduleId: currentModule.id,
        professorId: null,
        hours: 0
      }
      setLessons([...lessons, newLesson])
    }
  }

  const saveChanges = async () => {
    // Create a lessons copy to avoid modifying the state directly
    const lessonsCopy = [...lessons]
    // Validate that all lessons have a professor and hours
    const invalidLessons = lessons.filter((lesson) => !lesson.professorId || !lesson.hours)
    if (invalidLessons.length > 0) {
      setError('Please fill all the lessons before submitting')
      return
    }

    // Validate that the total hours assigned are equal to the module hours
    if (currentHour !== maxHour) {
      setError('The total hours assigned must be equal to the module hours')
      return
    }

    // First, delete the lessons that were removed
    if (lessonsToDel.length > 0) {
      lessonsToDel.forEach(async (lessonId) => {
        await lessonService.deleteLesson(lessonId)
      })
    }

    // Then, update the lessons that were modified
    const lessonsToUpdate = lessons.filter((lesson) => lesson.id)
    if (lessonsToUpdate.length > 0) {
      lessonsToUpdate.forEach(async (lesson) => {
        try {
          await lessonService.updateLesson(lesson)
        } catch (error) {
          setError('Error updating lessons')
        }
      })
    }

    // Finally, create the new lessons
    const newLessons = lessons.filter((lesson) => !lesson.id)
    if (newLessons.length > 0) {
      newLessons.forEach(async (lesson) => {
        try {
          const newLesson = await lessonService.createLesson(lesson)
          // Replace the new lesson with the old one that match the professorId and hours
          const oldLessonIndex = lessonsCopy.findIndex((oldLesson) => oldLesson.professorId === lesson.professorId && oldLesson.hours === lesson.hours)
          lessonsCopy[oldLessonIndex] = newLesson
        } catch (error) {
          setError('Error creating lessons')
        }
      })
    }

    // Refresh the page
    window.location.reload()
  }

  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      <h4 className='mb-3 text-xl font-semibold text-black dark:text-white'>Editing Lesson</h4>
      <h5 className='text-lg font-medium text-gray-500'><span className='text-black dark:text-white'>Group:</span> {currentGroup.denomination}</h5>

      {/* Mostrar todas las lecciones */}
      {lessons.length >= 0 && (
        <div>
          {lessons.map((lesson, index) => (
            <div key={index}>
              {/* Mostrar detalles de la lección y permitir la modificación */}
              <select
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
              <HoursCounter
                index={index}
                maxHour={lesson.professorId ? currentModule.hours - currentHour + lesson.hours : 0}
                minHour={0}
                currentHour={lesson.hours}
                handleHourChange={handleHoursChange}
              />

              <button onClick={() => handleLessonDelete(index)}>Delete</button>
            </div>
          ))}
          {/* Permitir agregar más lecciones si no se exceden las horas */}
          {currentHour < maxHour && (
            <button onClick={handleAddLesson}>Add Lesson</button>
          )}
          <div className='d-flex justify-content-between'>
            <h5>Hours</h5>
            <h5>{currentHour}/{maxHour}</h5>
          </div>
          <div className='progress' style={{ height: '4px', maxWidth: '450px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}>
            <div
              className='progress-bar'
              role='progressbar'
              style={{ width: `${(currentHour / maxHour) * 100}%`, backgroundColor: '#FFD700', height: '4px', borderRadius: '4px', transition: 'width 0.6s ease' }}
              aria-valuenow={(currentHour / maxHour) * 100}
              aria-valuemin='0'
              aria-valuemax='100'
            />
          </div>
        </div>
      )}

      <button onClick={onClose}>Close</button>
      <button onClick={saveChanges}>Save</button>
    </div>
  )
}

export default EditLesson
