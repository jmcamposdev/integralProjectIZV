import React, { useEffect, useState } from 'react'
import CardDataStats from '../../components/CardDataStats'
import ChartOne from '../../components/Charts/ChartOne'
import ChartThree from '../../components/Charts/ChartThree'
import ChartTwo from '../../components/Charts/ChartTwo'
import MapOne from '../../components/Maps/MapOne'
import TableOne from '../../components/Tables/TableOne'
import DefaultLayout from '../../layout/DefaultLayout'
import useAuth from '../../hooks/useAuth'
import professorService from '../../services/professorService.js'
import formationService from '../../services/formationService.js'
import moduleService from '../../services/moduleService.js'
import groupService from '../../services/groupService.js'

const ECommerce = () => {
  const { isAdmin, isUser, name } = useAuth()
  const [professor, setProfessor] = useState([])
  const [formations, setFormations] = useState([])
  const [modules, setModules] = useState([])
  const [groups, setGroups] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAllData = async () => {
      try {
        const professorData = await professorService.getAllProfessors()
        setProfessor(professorData)
        console.log(professorData)

        const formationData = await formationService.getAllFormations()
        setFormations(formationData)
        console.log(formationData)

        const moduleData = await moduleService.getAllModules()
        setModules(moduleData)
        console.log(moduleData)

        const groupData = await groupService.getAllGroups()
        setGroups(groupData)
        console.log(groupData)

        setIsLoading(false)
      } catch (error) {
        console.error('Error getting data:', error.message)
      }
    }

    getAllData()
  }, [])
  return (
    <DefaultLayout>
      <div className='flex flex-col items-center justify-center mt-5 mb-10'>
        <h1 className='text-4xl font-bold mb-5'>Welcome, {`${name}`}</h1>
        <h2 className='text-xl font-medium'>Role: {isAdmin ? 'Administrator' : isUser ? 'User' : 'Unknown'}</h2>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5'>
        <CardDataStats title='Total Professors' total={professor.length} route='/dashboard/professors' loading={isLoading}>
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

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default ECommerce
