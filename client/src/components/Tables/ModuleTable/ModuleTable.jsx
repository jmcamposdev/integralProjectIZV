import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import moduleService from '../../../services/moduleService'
import ErrorAlert from '../../Alerts/ErrorAlert'
import ConfirmModal from '../../Modals/ConfirmModal'
import FormModal from '../../Modals/FormModal'
import TableTemplate from '../TableTemplate'
import moduleColumns from './moduleColumns'

const ModuleTable = ({ formations }) => {
  const { isAdmin } = useAuth()
  const [error, setError] = useState(null) // Save the error message
  const [modules, setModules] = useState([]) // Save the modules
  const [moduleIdToDelete, setModuleIdToDelete] = useState(null) // Save the modules id to delete
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal
  const [viewCreateModal, setViewCreateModal] = useState(false) // Show or hide the create modal
  const [viewUpdateModal, setViewUpdateModal] = useState(false) // Show or hide the update modal
  const [modulesInputs, setModulesInputs] = useState({ // Save the inputs from the create modal and update modal
    denomination: '',
    acronym: '',
    course: '',
    hours: '',
    specialty: '',
    formationId: '',
    id: ''
  }) // Save the inputs from the create modal

  /**
   * Reset the module inputs
   */
  const resetModuleInputs = () => {
    setModulesInputs({
      denomination: '',
      acronym: '',
      course: '',
      hours: '',
      specialty: '',
      formationId: '',
      id: ''
    })
  }

  /**
   * Handle the module inputs
   * @param {Event} e The event object
   */
  const handleModuleInputs = (e) => {
    const { name, value } = e.target
    // If the input is a number, save it as a number
    if (name === 'formationId' || name === 'hours' || name === 'course') {
      setModulesInputs({
        ...modulesInputs,
        [name]: value.trim() === '' ? '' : parseInt(value)
      })
      return
    }
    // Save the input in the state
    setModulesInputs({
      ...modulesInputs,
      [name]: value
    })
  }

  /**
   * This only runs once when the component mounts
   * Get all the modules from the database
   * and save them in the modules state
   */
  useEffect(() => {
    async function getModules () {
      try {
        // Fetch all the modules from the database
        const modules = await moduleService.getAllModules()
        // Save the modules in the state
        setModules(modules)
      } catch (error) {
        // If there's an error, save the error message in the state
        setError(error.message)
      }
    }
    getModules()
  }, [])

  /**
   * ------------------------------------------------------------------------
   *  Delete Formation Logic
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the moduleIdToDelete changes
   * If the moduleIdToDelete is not null, show the delete modal
   * If the moduleIdToDelete is null, hide the delete modal
   */
  useEffect(() => {
    // If the moduleIdToDelete is not null, show the delete modal
    if (moduleIdToDelete) {
      setViewDeleteModal(true)
    } else { // If the moduleIdToDelete is null, hide the delete modal
      setViewDeleteModal(false)
    }
  }, [moduleIdToDelete])

  /**
   * This function deletes a module from the database
   * and removes it from the modules state
   * It also hides the delete modal
   */
  const handleDeleteModule = async () => {
    try {
      // Delete the module from the database
      await moduleService.deleteModule(moduleIdToDelete)
      setModules(modules.filter((module) => module.id !== moduleIdToDelete))
      // Hide the delete modal
      setModuleIdToDelete(null)
    } catch (error) {
      // If there's an error, save the error message in the state
      setError(error.message)
    }
  }

  /**
   * ------------------------------------------------------------------------
   *  Create|Update Module Logic (Modal)
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the viewCreateModal changes
   * It resets the moduleInputs when the create modal is closed
   * and hides the update modal when the create modal is closed
   */
  useEffect(() => {
    // If the create modal is closed, reset the moduleInputs
    if (!viewCreateModal) {
      setViewUpdateModal(false)
      // If the update modal is closed, reset the moduleInputs
    } else if (!viewUpdateModal) {
      resetModuleInputs()
    }
  }, [viewCreateModal])

  const handleCreateModule = async (event) => {
    event.preventDefault()
    try {
      // Create the module in the database
      const savedModule = await moduleService.createModule(modulesInputs)
      // Save the module in the state
      setModules([...modules, savedModule])
      // Hide the create modal
      setViewCreateModal(false)
    } catch (error) {
      // If there's an error, save the error message in the state
      setError(error.message)
    }

    // Hide the modal
    setViewCreateModal(false)
  }

  /**
   * This function updates a module
   * and updates the module in the modules state
   * It also hides the update modal
   * @param {Event} event The event object
   */
  const handleUpdateModule = async (event) => {
    event.preventDefault()
    try {
      // Update the module in the database
      const updatedModule = await moduleService.updateModule(modulesInputs)
      // Save the module in the state
      setModules(modules.map((currentModule) => (currentModule.id === updatedModule.id ? updatedModule : currentModule)))
    } catch (error) {
      // If there's an error, save the error message in the state
      setError(error.message)
    }
    // Hide the update modal
    setViewCreateModal(false)
  }

  /**
   * This function shows the create modal and sets the formationInputs to the formation to update
   * @param {Object} formation The formation to update
   */
  const handleUpdateClick = (module) => {
    setViewUpdateModal(true) // Show the update modal
    setViewCreateModal(true) // Show the create modal and active the useEffect to reset the formationInputs
    setModulesInputs(module) // Set the formationInputs to the formation to update
  }

  return (
    <>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      <TableTemplate data={modules} columns={moduleColumns(formations)} onDelete={setModuleIdToDelete} onEdit={handleUpdateClick} />
      {// Only show the add modules button if the user is an admin
          isAdmin && (
            <button
              onClick={() => setViewCreateModal(true)}
              className='mt-8 flex ml-auto w-max items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            >
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z' /></svg>
              </span>Add Module
            </button>
          )
        }

      {/* <!-- ===== Start of Delete Modal ===== --> */}
      {isAdmin && (<ConfirmModal show={viewDeleteModal} handleClose={() => (setModuleIdToDelete(null))} handleConfirm={handleDeleteModule} title='Delete Module' message='Are you sure you want to delete this Module? You will delete all the Lessons related to this module.' />)}
      {/* <!-- ===== End of Delete Modal ===== --> */}

      {/* <!-- ===== Start of Create|Update Modal ===== --> */}
      {isAdmin && (
        <FormModal
          isOpen={viewCreateModal} onClose={() => setViewCreateModal(false)} onSubmit={viewUpdateModal ? handleUpdateModule : handleCreateModule} title={viewUpdateModal ? 'Update Module' : 'Create Module'} submitText={viewUpdateModal ? 'Update Module' : 'Add new Module'} formFields={[
            {
              colSpan: 2,
              label: 'Denomination',
              type: 'text',
              name: 'denomination',
              value: modulesInputs.denomination,
              handleInputsChange: handleModuleInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Acronym',
              type: 'text',
              name: 'acronym',
              value: modulesInputs.acronym,
              handleInputsChange: handleModuleInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Course',
              type: 'number',
              name: 'course',
              value: modulesInputs.course,
              handleInputsChange: handleModuleInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Hours',
              type: 'number',
              name: 'hours',
              value: modulesInputs.hours,
              handleInputsChange: handleModuleInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Specialty',
              type: 'select',
              name: 'specialty',
              value: modulesInputs.specialty,
              handleInputsChange: handleModuleInputs,
              options: [
                { value: '', label: 'Select Specialty' },
                { value: 'FP', label: 'FP' },
                { value: 'Secondary', label: 'Secondary' }
              ],
              disabled: viewUpdateModal
            },
            {
              colSpan: 2,
              label: 'Formation',
              type: 'select',
              name: 'formationId',
              value: modulesInputs.formationId,
              handleInputsChange: handleModuleInputs,
              options: [
                { value: '', label: 'Select Formation' },
                ...formations.map((formation) => ({ value: formation.id, label: formation.acronym }))
              ],
              required: true
            }
          ]}
        />
      )}
    </>
  )
}

export default ModuleTable