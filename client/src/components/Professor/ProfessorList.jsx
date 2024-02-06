import { useEffect, useState } from 'react'
import professorService from '../../services/professorService'

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]) // Save all professors from the database
  const [professorIdToDelete, setProfessorIdToDelete] = useState(null) // Save the professor Id to delete
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal

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

  return (
    <>
      {/* <!-- ===== Start of Professor Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Professors List
        </h4>

        <div className='flex flex-col'>
          <div className='grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4'>
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
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Actions
              </h5>
            </div>
          </div>

        </div>
        {professors.length <= 0
          ? (
            <div className='text-center'>Loading...</div>
            )
          : (
              professors.map((professor) => (
                <div
                  className='grid grid-cols-2 sm:grid-cols-4 '
                  key={professor.id}
                >
                  <div className='p-2.5 xl:p-5'>
                    <p className='text-black dark:text-white'>{professor.name}</p>
                  </div>

                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-meta-3'>${professor.senecaUser}</p>
                  </div>

                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{professor.specialty}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                    <button onClick={() => setProfessorIdToDelete(professor.id)}>
                      <svg className='fill-current duration-300 ease-in-out hover:text-red-500' xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M7.615 20q-.666 0-1.14-.475Q6 19.051 6 18.385V6h-.5q-.213 0-.356-.144T5 5.499q0-.212.144-.356Q5.288 5 5.5 5H9q0-.31.23-.54q.23-.23.54-.23h4.46q.31 0 .54.23q.23.23.23.54h3.5q.213 0 .356.144q.144.144.144.357q0 .212-.144.356Q18.713 6 18.5 6H18v12.385q0 .666-.475 1.14q-.474.475-1.14.475zM17 6H7v12.385q0 .269.173.442t.442.173h8.77q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .356-.144q.144-.144.144-.356v-8q0-.213-.144-.356T10.307 8q-.213 0-.356.144t-.143.356v8q0 .213.144.356t.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356T13.692 8q-.213 0-.356.144q-.144.144-.144.356v8q0 .213.144.356t.357.144M7 6v13z' /></svg>
                    </button>

                  </div>
                </div>

              )))}
      </div>
      {/* <!-- ===== Start of Delete Modal ===== --> */}
      <div
        id='popup-modal'
        tabIndex={-1}
        className={`${!viewDeleteModal && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full`}
      >
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50' />
        <div className='relative p-4 w-full max-w-md'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button
              onClick={handleCloseDeleteModal}
              type='button'
              className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='popup-modal'
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='p-4 md:p-5 text-center'>
              <svg
                className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this product?
              </h3>
              <button
                onClick={handleDeleteProfessor}
                data-modal-hide='popup-modal'
                type='button'
                className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2'
              >
                Yes, I'm sure
              </button>
              <button
                onClick={handleCloseDeleteModal}
                data-modal-hide='popup-modal'
                type='button'
                className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ===== End of Professor Table ===== --> */}
    </>
  )
}

export default ProfessorList
