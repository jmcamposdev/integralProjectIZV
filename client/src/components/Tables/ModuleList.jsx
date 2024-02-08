import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import moduleService from '../../services/moduleService'
import ErrorAlert from '../Alerts/ErrorAlert'
import ConfirmModal from '../Modals/ConfirmModal'
import formationService from '../../services/formationService'
import FormModal from '../Modals/FormModal'

const ModuleList = () => {
  const { isAdmin } = useAuth()
  const [error, setError] = useState(null) // Save the error message
  const [modules, setModules] = useState([]) // Save the modules
  const [formations, setFormations] = useState([]) // Save the formations
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
    // If the input is a number, save it as a number
    if (e.target.name === 'formationId' || e.target.name === 'hours' || e.target.name === 'course') {
      setModulesInputs({
        ...modulesInputs,
        [e.target.name]: Number(e.target.value)
      })
      return
    }
    // Save the input in the state
    setModulesInputs({
      ...modulesInputs,
      [e.target.name]: e.target.value
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

    async function getFormations () {
      try {
        // Fetch the formations from the server
        const formations = await formationService.getAllFormations()
        // Save the formations in the state
        setFormations(formations)
      } catch (error) {
        // If there's an error, set the error message
        setError(error.message)
      }
    }

    getFormations()
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
      {/* <!-- ===== Start of Module Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Modules List
        </h4>
        <div className='flex flex-col'>
          <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 ${isAdmin ? 'sm:grid-cols-7' : 'sm:grid-cols-6'}`}>
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
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Course
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Hours
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Specialty
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Formation
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
        {modules.length <= 0
          ? (
            <div className='text-center p-10'>No modules yet...</div>
            )
          : (
              modules.map((modules) => (
                <div className={`grid grid-cols-2 sm:grid-cols-${isAdmin ? '7' : '6'}`} key={modules.id}>
                  <div className='p-2.5 xl:p-5'>
                    <p className='text-black dark:text-white'>{modules.denomination}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{modules.acronym}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{modules.course}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{modules.hours}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{modules.specialty}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>
                      {formations.find((formation) => formation.id === modules.formationId)?.acronym}
                    </p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                    {
                      isAdmin && (
                        <>
                          {/* Delete Modules Modal */}
                          <button onClick={() => setModuleIdToDelete(modules.id)}>
                            <i className='icon-[material-symbols-light--delete-outline-rounded] fill-current duration-300 ease-in-out hover:text-red-500' style={{ fontSize: '27px' }} />
                          </button>

                          <button onClick={() => handleUpdateClick(modules)}>
                            <i className='icon-[lucide--edit] ml-6 fill-current duration-300 ease-in-out hover:text-meta-3' style={{ fontSize: '20px' }} />
                          </button>
                        </>
                      )
                    }

                  </div>
                </div>

              )))}
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

      </div>
      {/* <!-- ===== End of Module Table ===== --> */}

      {/* <!-- ===== Start of Delete Modal ===== --> */}
      {isAdmin && (<ConfirmModal show={viewDeleteModal} handleClose={() => (setModuleIdToDelete(null))} handleConfirm={handleDeleteModule} message='Are you sure you want to delete this module?' />)}
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

export default ModuleList
