import { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../../layout/DefaultLayout'
import lessonService from '../../../services/lessonService'
import moduleService from '../../../services/moduleService'
import professorService from '../../../services/professorService'
import groupService from '../../../services/groupService'
import TableRowLoading from '../../../components/Loading/TableRowLoading'
import LessonTable from '../../../components/Tables/LessonTable/LessonTable'
import useAlertToast from '../../../hooks/useToast'

const LessonIndex = () => {
  const { toast } = useAlertToast() // Show alert messages
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
        toast.showError(error.message)
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
        toast.showError(error.message)
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
        toast.showError(error.message)
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
        toast.showError(error.message)
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
      {
      isLoading
        ? (
          <TableRowLoading columns={2} rows={5} />
          )
        : professors.lengh === 0 || modules.length === 0 || groups.length === 0
          ? (
            <div className='text-center'>
              <p className='text-2xl font-semibold'>To create lessons you need to have at least one Professor, one Module and one Group</p>
              <p className='text-gray-500 mt-5'>If you have not created any of these, you can create one by clicking the button below</p>
              <div className='flex gap-3 justify-center'>
                <button type='button' className='mt-5 bg-primary text-white py-2 px-4 rounded-md' onClick={() => { window.location.href = '/dashboard/professors' }}>Create Professor</button>
                <button type='button' className='mt-5 bg-primary text-white py-2 px-4 rounded-md' onClick={() => { window.location.href = '/dashboard/modules' }}>Create Module</button>
                <button type='button' className='mt-5 bg-primary text-white py-2 px-4 rounded-md' onClick={() => { window.location.href = '/dashboard/groups' }}>Create Group</button>
              </div>
            </div>
            )
          : (
            <LessonTable lessons={lessons} professors={professors} modules={modules} groups={groups} />
            )

      }
    </DefaultLayout>
  )
}

export default LessonIndex
