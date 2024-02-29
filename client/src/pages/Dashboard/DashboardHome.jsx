import React, { useEffect, useState } from 'react'
import CardDataStats from '../../components/Cards/CardDataStats.jsx'
import DefaultLayout from '../../layout/DefaultLayout.jsx'
import useAuth from '../../hooks/useAuth.jsx'
import professorService from '../../services/professorService.js'
import formationService from '../../services/formationService.js'
import moduleService from '../../services/moduleService.js'
import groupService from '../../services/groupService.js'
import LessonTable from '../../components/Tables/LessonTable/LessonTable.jsx'
import lessonService from '../../services/lessonService.js'
import TableRowLoading from '../../components/Loading/TableRowLoading.jsx'
import GroupTable from '../../components/Tables/GroupTable/GroupTable.jsx'
import ModuleTable from '../../components/Tables/ModuleTable/ModuleTable.jsx'
import useAlertToast from '../../hooks/useToast.jsx'

const DashboardHome = () => {
  const { toast } = useAlertToast()
  const { isAdmin, isUser, senecaUser, name } = useAuth() // Get the user info
  const [professors, setProfessors] = useState([]) // Save the professors
  const [formations, setFormations] = useState([]) // Save the formations
  const [modules, setModules] = useState([]) // Save the modules
  const [groups, setGroups] = useState([]) // Save the groups
  const [lessons, setLessons] = useState([]) // Save the lessons
  const [isLoading, setIsLoading] = useState(true) // Save the loading state

  /**
   * Get all data from the server when the component mounts
   * Assign the data to the useState hooks
   */
  useEffect(() => {
    const getAllData = async () => {
      try {
        // Get all the professors from the server
        const professorData = await professorService.getAllProfessors()
        // Save the professors in the state
        setProfessors(professorData)

        // Get all the formations from the server
        const formationData = await formationService.getAllFormations()
        // Save the formations in the state
        setFormations(formationData)

        // Get all the modules from the server
        const moduleData = await moduleService.getAllModules()
        // Save the modules in the state
        setModules(moduleData)

        // Get all the groups from the server
        const groupData = await groupService.getAllGroups()
        // Save the groups in the state
        setGroups(groupData)

        // Get all the lessons from the server
        const lessonData = await lessonService.getAllLessons()
        // Save the lessons in the state
        setLessons(lessonData)

        // Validate if the user is a professor only show the lessons of the professor
        if (isUser) {
          // Find the professor by the senecaUser
          const professor = professorData.find((professor) => professor.senecaUser === senecaUser)
          // Filter the lessons of the professor
          const userLessons = lessonData.filter((lesson) => lesson.professorId === professor.id)
          setLessons(userLessons)

          // Filter the groups of the professor the group that the groupID are in the userLessons
          const userGroups = groupData.filter((group) => userLessons.find((lesson) => lesson.groupId === group.id))
          setGroups(userGroups)

          // Filter the modules of the professor the module that the moduleID are in the userLessons
          const userModules = moduleData.filter((module) => userLessons.find((lesson) => lesson.moduleId === module.id))
          setModules(userModules)
        }

        // Set the loading state to false
        setIsLoading(false)
      } catch (error) {
        // If there's an error, set the error message
        console.error('Error getting data:', error.message)
        toast.showError(error.message)
      }
    }
    // Call the function to get all the data
    getAllData()
  }, [])
  return (
    <DefaultLayout>
      {/* Show a welcome message with the user's name and role */}
      <div className='flex flex-col items-center justify-center mt-5 mb-10'>
        <h1 className='text-4xl font-bold mb-5'>Welcome, {`${name}`}</h1>
        <h2 className='text-xl font-medium'>Role: {isAdmin ? 'Administrator' : isUser ? 'Professor' : 'Unknown'}</h2>
      </div>
      {/* End of welcome message */}

      {/* Show the data stats cards */}
      {isAdmin && (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5'>
          <CardDataStats title='Total Professors' total={professors.length} route='/dashboard/professors' loading={isLoading}>
            <i className='icon-[lucide--user]' style={{ fontSize: '22px' }} />
          </CardDataStats>
          <CardDataStats title='Total Formations' total={formations.length} route='/dashboard/formations' loading={isLoading}>
            <i className='icon-[cil--education]' style={{ fontSize: '22px' }} />
          </CardDataStats>
          <CardDataStats title='Total Modules' total={modules.length} route='/dashboard/modules' loading={isLoading}>
            <i className='icon-[heroicons--book-open]' style={{ fontSize: '22px' }} />
          </CardDataStats>
          <CardDataStats title='Total Groups' total={groups.length} route='/dashboard/groups' loading={isLoading}>
            <i className='icon-[tabler--users-group]' style={{ fontSize: '22px' }} />
          </CardDataStats>
        </div>
      )}
      {/* End of data stats cards */}

      {/* Show the Group Table if is a Professor */}
      <div className='mt-7.5'>
        {isLoading
          ? (
            <TableRowLoading columns={2} rows={5} />
            )
          : isUser
            ? (
              <>
                <h2 className='text-2xl font-semibold mb-5'>{isUser && ('Your')} Groups</h2>
                {isUser && groups.length <= 0
                  ? (
                    <p className='text-lg font-medium text-center'>You don't have any groups assigned yet.</p>
                    )
                  : (
                    <GroupTable formations={formations} allGroups={groups} />
                    )}
              </>
              )
            : null}
      </div>

      {/* Show the Module Table if is a Professor */}
      <div className='mt-7.5'>
        {isLoading
          ? (
            <TableRowLoading columns={2} rows={5} />
            )
          : isUser
            ? (
              <>
                <h2 className='text-2xl font-semibold mb-5'>{isUser && ('Your')} Modules</h2>
                {isUser && modules.length <= 0
                  ? (
                    <p className='text-lg font-medium text-center'>You don't have any modules assigned yet.</p>
                    )
                  : (
                    <ModuleTable formations={formations} allModules={modules} />
                    )}
              </>
              )
            : null}
      </div>

      {/* Show the lessons table */}
      <div className='mt-7.5'>
        {isLoading
          ? (
            <TableRowLoading columns={2} rows={5} />
            )
          : (
            <>
              <h2 className='text-2xl font-semibold mb-5'>{isUser && ('Your')} Lessons</h2>
              {isUser && lessons.length <= 0
                ? (
                  <p className='text-lg font-medium text-center'>You don't have any lessons yet.</p>
                  )
                : (
                  <LessonTable lessons={lessons} professors={professors} modules={modules} groups={groups} />
                  )}
            </>
            )}
      </div>
      {/* End of lessons table */}
    </DefaultLayout>
  )
}

export default DashboardHome
