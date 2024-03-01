import { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../../layout/DefaultLayout'
import formationService from '../../../services/formationService'
import TableRowLoading from '../../../components/Loading/TableRowLoading'
import GroupTable from '../../../components/Tables/GroupTable/GroupTable'
import useAlertToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'
import { NavLink } from 'react-router-dom'

const GroupIndex = () => {
  const { isAdmin } = useAuth() // Check if the user is an admin
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
      <Breadcrumb pageName='Groups' />
      {
      // If the loading state is true, show the loading component
        isLoading
          ? (
            <TableRowLoading columns={2} rows={5} />
            )
          // If the formations array is empty and the user is an admin, show the message below
          : formations.length === 0 && isAdmin
            ? (
              <div className='text-center'>
                <h2 className='text-2xl font-semibold'>No Groups Available</h2>
                <p className='text-gray-500 mt-5'>If you have not created any formations, you can create one by clicking the button below</p>

                <NavLink to='/dashboard/formations' className='inline-block mt-5 bg-primary text-white py-2 px-4 rounded-md'>Create Formation</NavLink>
              </div>
              )
            // If the formations array is empty and the user is not an admin, show the message below
            : formations.length === 0 && !isAdmin
              ? (
                <div className='text-center'>
                  <h2 className='text-2xl font-semibold'>No Groups Available</h2>
                  <p className='text-gray-500 mt-5'>Please, wait until the Administrator creates a new groups</p>

                </div>
                )
              // If the formations array is not empty, show the formations in a table
              : (
                <GroupTable formations={formations} />
                )
        }
    </DefaultLayout>
  )
}

export default GroupIndex
