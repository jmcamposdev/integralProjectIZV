import { useEffect, useState } from 'react'
import professorService from '../../services/professorService'
import ConfirmModal from '../Modals/ConfirmModal'
import ErrorAlert from '../Alerts/ErrorAlert'
import useAuth from '../../hooks/useAuth'
import FormModal from '../Modals/FormModal'

const ProfessorList = () => {
  const { isAdmin } = useAuth()
  const [error, setError] = useState(null) // Save the error message if there is one
  const [professors, setProfessors] = useState([]) // Save all professors from the database
  const [professorIdToDelete, setProfessorIdToDelete] = useState(null) // Save the professor Id to delete
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal
  const [viewCreateModal, setViewCreateModal] = useState(false) // Show or hide the create modal
  const [viewUpdateModal, setViewUpdateModal] = useState(false) // Show or hide the update modal
  const [createInputs, setCreateInputs] = useState({
    senecaUser: '',
    name: '',
    firstSurname: '',
    lastSurname: '',
    specialty: '',
    id: ''
  }) // Save the inputs from the create modal

  const resetCreateInputs = () => {
    setCreateInputs({
      senecaUser: '',
      name: '',
      firstSurname: '',
      lastSurname: '',
      specialty: '',
      id: ''
    })
  }

  const handleCreateInputs = (event) => {
    setCreateInputs({
      ...createInputs,
      [event.target.name]: event.target.value
    })
  }

  /**
   * This only runs once when the component mounts
   * It fetches all professors from the database
   * and saves them to the state
   */
  useEffect(() => {
    async function getProfessors () {
      try {
        const professors = await professorService.getAllProfessors()
        setProfessors(professors)
      } catch (error) {
        console.error('Error getting professors:', error.message)
      }
    }

    getProfessors()
  }
  , [])

  /**
   * ------------------------------------------------------------------------
   *  Delete Professor Logic
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the professorIdToDelete changes
   * It shows the delete modal if the professorIdToDelete is not null
   * and hides it if it is null
   */
  useEffect(() => {
    if (professorIdToDelete) {
      setViewDeleteModal(true)
    } else {
      setViewDeleteModal(false)
    }
  }, [professorIdToDelete])

  /**
   * This function deletes a professor from the database
   * and updates the state to remove the deleted professor from the list
   * It also hides the delete modal
   */
  const handleDeleteProfessor = async () => {
    try {
      await professorService.deleteProfessor(professorIdToDelete)
      setProfessors(professors.filter((professor) => professor.id !== professorIdToDelete))
      handleCloseDeleteModal()
    } catch (error) {
      console.error('Error deleting professor:', error.message)
    }
  }

  /**
   * This function hides the delete modal
   */
  const handleCloseDeleteModal = () => {
    setProfessorIdToDelete(null)
  }

  /**
   * ------------------------------------------------------------------------
   *  Create Professor Logic
   * ------------------------------------------------------------------------
   */

  /**
   * This function shows the create modal
   */
  const handleShowCreateModal = () => {
    setViewCreateModal(true)
  }

  /**
   * This function hides the create modal
   */
  const handleCloseCreateModal = () => {
    setViewCreateModal(false)
    setViewUpdateModal(false)
    // Reset the inputs
    resetCreateInputs()
  }

  /**
   * This function creates a new professor
   * and adds it to the state
   * @param {Event} event The event object
   */
  const handleCreateProfessor = async (event) => {
    event.preventDefault()

    try {
      const professor = await professorService.createProfessor(createInputs)
      setProfessors([...professors, professor])
      handleCloseCreateModal()
    } catch (error) {
      handleCloseCreateModal()
      setError(error.message)
      console.error('Error creating professor:', error.message)
    }
    // Reset the inputs
    resetCreateInputs()
  }

  const handleUpdateProfessor = async (event) => {
    event.preventDefault()
    try {
      const professor = await professorService.updateProfessor(createInputs)
      const newProfessorsList = professors.map((prof) => {
        if (prof.id === professor.id) {
          return professor
        }
        return prof
      })
      setProfessors(newProfessorsList)
      handleCloseCreateModal()
    } catch (error) {
      handleCloseCreateModal()
      setError(error.message)
      console.error('Error updating professor:', error.message)
    }
    // Reset the inputs
    setCreateInputs({
      senecaUser: '',
      name: '',
      firstSurname: '',
      lastSurname: '',
      specialty: ''
    })
    // Reset the viewUpdateModal
    setViewUpdateModal(false)
  }

  return (
    <>
      {/* <!-- ===== Start of Professor Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Professors List
        </h4>
        <div className='flex flex-col'>
          <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-${isAdmin ? '4' : '3'}`}>
            <div className='p-2.5 xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Name
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Seneca User
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Specialty
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
        {professors.length <= 0
          ? (
            <div className='text-center p-10'>No professors found</div>
            )
          : (
              professors.map((professor) => (
                <div className={`grid grid-cols-2 sm:grid-cols-${isAdmin ? '4' : '3'}`} key={professor.id}>
                  <div className='p-2.5 xl:p-5'>
                    <p className='text-black dark:text-white'>{professor.firstSurname} {professor.lastSurname}, {professor.name}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{professor.senecaUser}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{professor.specialty}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                    {
                      isAdmin && (
                        <>
                          <button onClick={() => setProfessorIdToDelete(professor.id)}>
                            <i className='icon-[material-symbols-light--delete-outline-rounded] fill-current duration-300 ease-in-out hover:text-red-500' style={{ fontSize: '27px' }} />
                          </button>

                          <button onClick={() => {
                            setViewUpdateModal(true)
                            setCreateInputs({
                              senecaUser: professor.senecaUser,
                              name: professor.name,
                              firstSurname: professor.firstSurname,
                              lastSurname: professor.lastSurname,
                              specialty: professor.specialty,
                              id: professor.id
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
        {// Only show the add professor button if the user is an admin
          isAdmin && (
            <button
              onClick={handleShowCreateModal}
              className='mt-8 flex ml-auto w-max items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            >
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z' /></svg>
              </span>Add Professor
            </button>
          )
        }

      </div>
      {/* <!-- ===== End of Professor Table ===== --> */}

      {/* <!-- ===== Start of Delete Modal ===== --> */}
      {isAdmin && (<ConfirmModal show={viewDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleDeleteProfessor} message='Are you sure you want to delete this professor?' />)}

      {/* <!-- ===== Start of Add Professor Modal ===== --> */}
      {isAdmin && (
        <FormModal
          isOpen={viewCreateModal} onClose={handleCloseCreateModal} onSubmit={viewUpdateModal ? handleUpdateProfessor : handleCreateProfessor} title={viewUpdateModal ? 'Update Professor' : 'Create Professor'} submitText={viewUpdateModal ? 'Update Professor' : 'Add new Professor'} formFields={[ // Add the form fields
            {
              colSpan: 2,
              label: 'Seneca User',
              type: 'text',
              name: 'senecaUser',
              value: createInputs.senecaUser,
              handleInputsChange: handleCreateInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Name',
              type: 'text',
              name: 'name',
              value: createInputs.name,
              handleInputsChange: handleCreateInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'First Surname',
              type: 'text',
              name: 'firstSurname',
              value: createInputs.firstSurname,
              handleInputsChange: handleCreateInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Last Surname',
              type: 'text',
              name: 'lastSurname',
              value: createInputs.lastSurname,
              handleInputsChange: handleCreateInputs,
              required: true
            },
            {
              colSpan: 2,
              label: 'Specialty',
              type: 'select',
              name: 'specialty',
              value: createInputs.specialty,
              handleInputsChange: handleCreateInputs,
              options: [
                { value: '', label: 'Select Specialty' },
                { value: 'FP', label: 'FP' },
                { value: 'Secondary', label: 'Secondary' }
              ],
              disabled: viewUpdateModal
            }
          ]}
        />)}
      {/* <!-- ===== End of Add Professor Modal ===== --> */}
    </>
  )
}

export default ProfessorList
