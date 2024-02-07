import { useEffect, useState } from 'react'
import professorService from '../../services/professorService'
import ConfirmModal from '../Modals/ConfirmModal'
import ErrorAlert from '../Alerts/ErrorAlert'
import useAuth from '../../hooks/useAuth'

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
                <div
                  className={`grid grid-cols-2 sm:grid-cols-${isAdmin ? '4' : '3'}`}
                  key={professor.id}
                >
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
                            <svg className='fill-current duration-300 ease-in-out hover:text-red-500' xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M7.615 20q-.666 0-1.14-.475Q6 19.051 6 18.385V6h-.5q-.213 0-.356-.144T5 5.499q0-.212.144-.356Q5.288 5 5.5 5H9q0-.31.23-.54q.23-.23.54-.23h4.46q.31 0 .54.23q.23.23.23.54h3.5q.213 0 .356.144q.144.144.144.357q0 .212-.144.356Q18.713 6 18.5 6H18v12.385q0 .666-.475 1.14q-.474.475-1.14.475zM17 6H7v12.385q0 .269.173.442t.442.173h8.77q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .356-.144q.144-.144.144-.356v-8q0-.213-.144-.356T10.307 8q-.213 0-.356.144t-.143.356v8q0 .213.144.356t.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356T13.692 8q-.213 0-.356.144q-.144.144-.144.356v8q0 .213.144.356t.357.144M7 6v13z' /></svg>
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
                            <svg className='ml-6 fill-current duration-300 ease-in-out hover:text-meta-3' xmlns='http://www.w3.org/2000/svg' width='21px' height='21px' viewBox='0 0 24 24'><path fill='currentColor' d='m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z' /><path fill='currentColor' d='M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z' /></svg>
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
        <div id='crud-modal' tabIndex='-1' aria-hidden='true' className={`${!viewCreateModal && 'hidden'} fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50`}>
          <div className='bg-white dark:bg-boxdark-2 rounded-lg shadow-md max-w-md w-full'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                {viewUpdateModal ? 'Update Professor' : 'Create Professor'}
              </h3>
              <button onClick={handleCloseCreateModal} type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white' data-modal-toggle='crud-modal'>
                <svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <form onSubmit={viewUpdateModal ? handleUpdateProfessor : handleCreateProfessor} className='p-4 md:p-5'>
              <div className='grid gap-4 mb-4 grid-cols-2'>
                <div className='col-span-2'>
                  <label htmlFor='senecaUser' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Seneca User</label>
                  <input
                    onChange={handleCreateInputs}
                    type='text'
                    name='senecaUser'
                    id='senecaUser'
                    value={createInputs.senecaUser}
                    required
                    placeholder='Enter Seneca User'
                    className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                  />
                </div>
                <div className='col-span-2'>
                  <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
                  <input
                    onChange={handleCreateInputs}
                    type='text'
                    name='name'
                    id='name'
                    value={createInputs.name}
                    className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    placeholder='Enter Name'
                    required
                  />
                </div>
                <div className='col-span-2'>
                  <label htmlFor='firstSurname' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>First Surname</label>
                  <input
                    onChange={handleCreateInputs}
                    type='text'
                    name='firstSurname'
                    id='firstSurname'
                    value={createInputs.firstSurname}
                    className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    placeholder='Enter First Surname'
                    required
                  />
                </div>
                <div className='col-span-2'>
                  <label htmlFor='lastSurname' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Last Surname</label>
                  <input
                    onChange={handleCreateInputs}
                    type='text'
                    name='lastSurname'
                    id='lastSurname'
                    value={createInputs.lastSurname}
                    className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    placeholder='Enter Last Surname'
                    required
                  />
                </div>
                <div className='col-span-2'>
                  <label htmlFor='specialty' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Specialty</label>
                  <select
                    onChange={handleCreateInputs}
                    id='specialty'
                    name='specialty'
                    className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={createInputs.specialty} // Cambié defaultValue a value
                    disabled={viewUpdateModal}
                  >
                    <option value='' disabled>Select Specialty</option>
                    <option value='FP'>FP</option>
                    <option value='Secondary'>Secondary</option>
                  </select>
                </div>
              </div>
              <button
                type='submit'
                className='w-full flex justify-center text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <svg className='me-1 -ms-1 w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule='evenodd' />
                </svg>
                {viewUpdateModal ? 'Update Professor' : 'Add new Professor'}
              </button>
            </form>
          </div>
        </div>)}

      {/* <!-- ===== End of Add Professor Modal ===== --> */}
    </>
  )
}

export default ProfessorList
