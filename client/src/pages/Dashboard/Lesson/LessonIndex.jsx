import { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../../layout/DefaultLayout'
import lessonService from '../../../services/lessonService'
import moduleService from '../../../services/moduleService'
import professorService from '../../../services/professorService'
import groupService from '../../../services/groupService'
import ErrorAlert from '../../../components/Alerts/ErrorAlert'
import TableRowLoading from '../../../components/Loading/TableRowLoading'

const LessonIndex = () => {
  const [error, setError] = useState(null) // Save the error message
  const [isLoading, setIsLoading] = useState(true) // Save the loading state
  const [professors, setProfessors] = useState([]) // Save the professors
  const [modules, setModules] = useState([]) // Save the modules
  const [groups, setGroups] = useState([]) // Save the groups
  const [lessons, setLessons] = useState([]) // Save the lessons

  useEffect(() => {
    async function getProfessors () {
      try {
        // Fetch the professors from the server
        const professors = await professorService.getAllProfessors()
        // Save the professors in the state
        setProfessors(professors)
      } catch (error) {
        // If there's an error, set the error message
        setError(error.message)
      }
    }

    async function getModules () {
      try {
        // Fetch the modules from the server
        const modules = await moduleService.getAllModules()
        // Save the modules in the state
        setModules(modules)
      } catch (error) {
        // If there's an error, set the error message
        setError(error.message)
      }
    }

    async function getGroups () {
      try {
        // Fetch the groups from the server
        const groups = await groupService.getAllGroups()
        // Save the groups in the state
        setGroups(groups)
      } catch (error) {
        // If there's an error, set the error message
        setError(error.message)
      }
    }

    async function getLessons () {
      try {
        // Fetch the lessons from the server
        const lessons = await lessonService.getAllLessons()
        // Save the lessons in the state
        setLessons(lessons)
      } catch (error) {
        // If there's an error, set the error message
        setError(error.message)
      }
    }

    async function getAllData () {
      await getProfessors()
      await getModules()
      await getGroups()
      await getLessons()
      setIsLoading(false)
    }

    getAllData()
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName='Lessons' />
      {error && <ErrorAlert message={error} />}
      {
      isLoading
        ? (
          <TableRowLoading columns={2} rows={5} />
          )
        : (
          <p>Desarrollo</p>
          )

      }
    </DefaultLayout>
  )
}

export default LessonIndex
