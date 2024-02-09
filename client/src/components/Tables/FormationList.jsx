import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import formationService from '../../services/formationService'
import ErrorAlert from '../Alerts/ErrorAlert'
import ConfirmModal from '../Modals/ConfirmModal'
import FormModal from '../Modals/FormModal'
import TableRowLoading from '../Loading/TableRowLoading'

const FormationList = () => {
  const { isAdmin } = useAuth() // Check if the user is an admin
  const [isLoading, setIsLoading] = useState(true) // Check if the data is loading
  const [error, setError] = useState(null) // Save the error message
  const [formations, setFormations] = useState([]) // Save the formations
  const [formationIdToDelete, setFormationIdToDelete] = useState(null) // Save the formation id to delete
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal
  const [viewCreateModal, setViewCreateModal] = useState(false) // Show or hide the create modal
  const [viewUpdateModal, setViewUpdateModal] = useState(false) // Show or hide the update modal
  const [formationInputs, setFormationInputs] = useState({ // Save the inputs from the create modal and update modal
    denomination: '',
    acronym: '',
    id: ''
  }) // Save the inputs from the create modal

  /**
   * Reset the formation inputs
   */
  const resetFormationInputs = () => {
    setFormationInputs({
      denomination: '',
      acronym: '',
      id: ''
    })
  }

  /**
   * Change the formationInputs state when the user types in the input
   * @param {Event} e The event object
   */
  const handleFormationInputs = (e) => {
    setFormationInputs({
      ...formationInputs,
      [e.target.name]: e.target.value
    })
  }

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
        // Set the isLoading state to false
        setIsLoading(false)
      } catch (error) {
        // If there's an error, set the error message
        setError(error.message)
      }
    }

    getFormations()
  }, [])

  /**
   * ------------------------------------------------------------------------
   *  Delete Formation Logic
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the formationIdToDelete changes
   * It shows the delete modal if the formationIdToDelete is not null
   * and hides it if it is null
   */
  useEffect(() => {
    // If the formationIdToDelete is not null, show the delete modal
    if (formationIdToDelete) {
      setViewDeleteModal(true)
    } else { // If the formationIdToDelete is null, hide the delete modal
      setViewDeleteModal(false)
    }
  }, [formationIdToDelete])

  /**
   * This function deletes a formation from the database
   * and updates the state to remove the deleted formation from the list
   * It also hides the delete modal
   */
  const handleDeleteFormation = async () => {
    try {
      // Delete the formation using the formationIdToDelete
      await formationService.deleteFormation(formationIdToDelete)
      // Update the state to remove the deleted formation from the list
      setFormations(formations.filter((formation) => formation.id !== formationIdToDelete))
    } catch (error) {
      // If there's an error, set the error message
      setError(error.message)
    }
    // Hide the modal active the useEffect to hide the delete modal
    setFormationIdToDelete(null)
  }

  /**
   * ------------------------------------------------------------------------
   *  Create|Update Formation Logic (Modal)
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the viewCreateModal changes
   * It resets the formationInputs when the create modal is closed
   * and hides the update modal when the create modal is closed
   */
  useEffect(() => {
    // If the create modal is closed, reset the formationInputs
    if (!viewCreateModal) {
      setViewUpdateModal(false)
      // If the update modal is closed, reset the formationInputs
    } else if (!viewUpdateModal) {
      resetFormationInputs()
    }
  }, [viewCreateModal])

  /**
   * This function creates a new formation
   * and updates the state to add the new formation to the list
   * It also hides the create modal
   * @param {Event} event The event object
   */
  const handleCreateFormation = async (event) => {
    event.preventDefault()

    try {
      const newFormation = await formationService.createFormation(formationInputs)
      setFormations([...formations, newFormation])
    } catch (error) {
      setError(error.message)
    }

    // Hide the modal
    setViewCreateModal(false)
  }

  /**
   * This function updates a formation
   * and updates the state to replace the old formation with the updated formation
   * It also hides the update modal
   * @param {Event} event The event object
   */
  const handleUpdateFormation = async (event) => {
    event.preventDefault() // Prevent the default form submission

    try {
      // Update the formation
      const updatedFormation = await formationService.updateFormation(formationInputs)
      // Update the state to replace the old formation with the updated formation
      setFormations(formations.map((formation) => (formation.id === updatedFormation.id ? updatedFormation : formation)))
    } catch (error) {
      // If there's an error, set the error message
      setError(error.message)
    }

    // Hide the modal
    setViewCreateModal(false)
  }

  /**
   * This function shows the create modal and sets the formationInputs to the formation to update
   * @param {Object} formation The formation to update
   */
  const handleUpdateClick = (formation) => {
    setViewUpdateModal(true) // Show the update modal
    setViewCreateModal(true) // Show the create modal and active the useEffect to reset the formationInputs
    setFormationInputs(formation) // Set the formationInputs to the formation to update
  }

  return (
    <>
      {/* <!-- ===== Start of Formation Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Formations List
        </h4>
        <div className='flex flex-col'>
          <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 ${isAdmin ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
            <div className='p-2.5 xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Denomination
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Acronym
              </h5>
            </div>
            {// Only show the actions column if the user is an admin
              isAdmin && (
                <div className='p-2.5 text-center xl:p-5'>
                  <h5 className='text-sm font-medium uppercase xsm:text-base'>
                    Actions
                  </h5>
                </div>
              )
            }

          </div>

        </div>
        {isLoading
          ? (
            <TableRowLoading columns={isAdmin ? 3 : 2} rows={5} />
            )
          : formations.length <= 0
            ? (
              <div className='text-center p-10'>No formations yet...</div>
              )
            : (
                formations.map((formation) => (
                  <div className={`grid grid-cols-2 sm:grid-cols-${isAdmin ? '3' : '2'}`} key={formation.id}>
                    <div className='p-2.5 xl:p-5'>
                      <p className='text-black dark:text-white'>{formation.denomination}</p>
                    </div>
                    <div className='p-2.5 text-center xl:p-5'>
                      <p className='text-black dark:text-white'>{formation.acronym}</p>
                    </div>
                    {
                      isAdmin && (
                        <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                          {/* Delete Formation Modal */}
                          <button onClick={() => setFormationIdToDelete(formation.id)}>
                            <i className='icon-[material-symbols-light--delete-outline-rounded] fill-current duration-300 ease-in-out hover:text-red-500' style={{ fontSize: '27px' }} />
                          </button>

                          <button onClick={() => handleUpdateClick(formation)}>
                            <i className='icon-[lucide--edit] ml-6 fill-current duration-300 ease-in-out hover:text-meta-3' style={{ fontSize: '20px' }} />
                          </button>
                        </div>
                      )
                    }

                  </div>

                )))}
        {// Only show the add formation button if the user is an admin
          isAdmin && (
            <button
              onClick={() => setViewCreateModal(true)}
              className='mt-8 flex ml-auto w-max items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            >
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z' /></svg>
              </span>Add Formation
            </button>
          )
        }

      </div>
      {/* <!-- ===== End of Formation Table ===== --> */}

      {/* <!-- ===== Start of Delete Modal ===== --> */}
      {isAdmin && (<ConfirmModal show={viewDeleteModal} handleClose={() => (setFormationIdToDelete(null))} handleConfirm={handleDeleteFormation} message='Are you sure you want to delete this formation?' />)}
      {/* <!-- ===== End of Delete Modal ===== --> */}

      {/* <!-- ===== Start of Create|Update Formation Modal ===== --> */}
      {isAdmin && (
        <FormModal
          isOpen={viewCreateModal} onClose={() => setViewCreateModal(false)} onSubmit={viewUpdateModal ? handleUpdateFormation : handleCreateFormation} title={viewUpdateModal ? 'Update Formation' : 'Create Formation'} submitText={viewUpdateModal ? 'Update Formation' : 'Add new Professor'} formFields={[
            {
              colSpan: 2,
              label: 'Denomination',
              type: 'text',
              name: 'denomination',
              value: formationInputs.denomination,
              handleInputsChange: handleFormationInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Acronym',
              type: 'text',
              name: 'acronym',
              value: formationInputs.acronym,
              handleInputsChange: handleFormationInputs,
              required: true
            }
          ]}
        />
      )}
    </>
  )
}

export default FormationList
