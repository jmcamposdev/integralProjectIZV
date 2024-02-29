import { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../../layout/DefaultLayout'
import formationService from '../../../services/formationService'
import TableRowLoading from '../../../components/Loading/TableRowLoading'
import ModuleTable from '../../../components/Tables/ModuleTable/ModuleTable'
import useAlertToast from '../../../hooks/useToast'

const ModuleIndex = () => {
  const { toast } = useAlertToast() // Show alert messages
  const [isLoading, setIsLoading] = useState(true) // Save the loading state
  const [formations, setFormations] = useState([]) // Save the formations

  /**
   * This only runs once when the component mounts
   * It fetches the formations from the server
   * and saves in the formations state
   */
  useEffect(() => {
    async function getFormations () {
      try {
        // Fetch the formations from the server
        const formations = await formationService.getAllFormations()
        // Save the formations in the state
        setFormations(formations)
        // Set the loading state to false
        setIsLoading(false)
      } catch (error) {
        // If there's an error, set the error message
        toast.showError(error.message)
      }
    }

    getFormations()
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Modules' />
      {
      isLoading
        ? (
          <TableRowLoading columns={2} rows={5} />
          )
        : formations.length === 0
          ? (
            <div className='text-center'>
              <h2 className='text-2xl font-semibold'>No formations available</h2>
              <p className='text-gray-500 mt-5'>If you have not created any formations, you can create one by clicking the button below</p>

              <button type='button' className='mt-5 bg-primary text-white py-2 px-4 rounded-md' onClick={() => { window.location.href = '/dashboard/formations' }}>Create Formation</button>
            </div>
            )
          : (
            <ModuleTable formations={formations} />
            )
        }
    </DefaultLayout>
  )
}

export default ModuleIndex
