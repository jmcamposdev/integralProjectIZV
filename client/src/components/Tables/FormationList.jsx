import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import formationService from '../../services/formationService'
import ErrorAlert from '../Alerts/ErrorAlert'
import ConfirmModal from '../Modals/ConfirmModal'

const FormationList = () => {
  const { isAdmin } = useAuth() // Check if the user is an admin
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
        const formations = await formationService.getAllFormations()
        setFormations(formations)
      } catch (error) {
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
    if (formationIdToDelete) {
      setViewDeleteModal(true)
    } else {
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
      await formationService.deleteFormation(formationIdToDelete)
      setFormations(formations.filter((formation) => formation.id !== formationIdToDelete))
      setFormationIdToDelete(null)
    } catch (error) {
      console.error('Error deleting formation:', error.message)
    }
  }

  const handleShowCreateModal = () => {
    setViewCreateModal(true)
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
          <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-${isAdmin ? '3' : '2'}`}>
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
        {formations.length <= 0
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
                  <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                    {
                      isAdmin && (
                        <>
                          {/* Delete Formation Modal */}
                          <button onClick={() => setFormationIdToDelete(formation.id)}>
                            <i className='icon-[material-symbols-light--delete-outline-rounded] fill-current duration-300 ease-in-out hover:text-red-500' style={{ fontSize: '27px' }} />
                          </button>

                          <button onClick={() => {
                            setViewUpdateModal(true)
                            setFormationInputs({
                              denomination: formation.denomination,
                              acronym: formation.acronym
                            })
                            setViewCreateModal(true)
                          }}
                          >
                            <i className='icon-[lucide--edit] ml-6 fill-current duration-300 ease-in-out hover:text-meta-3' style={{ fontSize: '20px' }} />
                          </button>
                        </>
                      )
                    }

                  </div>
                </div>

              )))}
        {// Only show the add formation button if the user is an admin
          isAdmin && (
            <button
              onClick={handleShowCreateModal}
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
    </>
  )
}

export default FormationList
