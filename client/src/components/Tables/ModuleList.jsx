import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import moduleService from '../../services/moduleService'
import ErrorAlert from '../Alerts/ErrorAlert'
import ConfirmModal from '../Modals/ConfirmModal'

const ModuleList = () => {
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
    modulesId: '',
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
      modulesId: '',
      id: ''
    })
  }

  /**
   * Handle the module inputs
   * @param {Event} e The event object
   */
  const handleModuleInputs = (e) => {
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

  return (
    <>
      {/* <!-- ===== Start of Module Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Modules List
        </h4>
        <div className='flex flex-col'>
          <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-${isAdmin ? '7' : '6'}`}>
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
                    <p className='text-black dark:text-white'>{modules.formationId}</p>
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
    </>
  )
}

export default ModuleList
