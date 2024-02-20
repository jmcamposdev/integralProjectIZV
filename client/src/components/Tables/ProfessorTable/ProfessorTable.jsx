import { useEffect, useState } from 'react'
import professorService from '../../../services/professorService'
import ConfirmModal from '../../Modals/ConfirmModal'
import ErrorAlert from '../../Alerts/ErrorAlert'
import useAuth from '../../../hooks/useAuth'
import FormModal from '../../Modals/FormModal'
import TableRowLoading from '../../Loading/TableRowLoading'
import TableTemplate from '../TableTemplate'
import professorColumns from '../ProfessorTable/professorColumns'

const ProfessorTable = () => {
  const { isAdmin } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null) // Save the error message if there is one
  const [professors, setProfessors] = useState([]) // Save all professors from the database
  const [professorIdToDelete, setProfessorIdToDelete] = useState(null) // Save the professor Id to delete
  const [isSpecialtyDisabled, setIsSpecialtyDisabled] = useState(false)
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal
  const [viewCreateModal, setViewCreateModal] = useState(false) // Show or hide the create modal
  const [viewUpdateModal, setViewUpdateModal] = useState(false) // Show or hide the update modal
  const [createInputs, setCreateInputs] = useState({
    senecaUser: '',
    name: '',
    firstSurname: '',
    lastSurname: '',
    specialty: '',
    id: '',
    password: '',
    confirmPassword: ''
  }) // Save the inputs from the create modal

  const resetCreateInputs = () => {
    setCreateInputs({
      senecaUser: '',
      name: '',
      firstSurname: '',
      lastSurname: '',
      specialty: '',
      id: '',
      password: '',
      confirmPassword: ''
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
        setIsLoading(false)
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
    } catch (error) {
      setError(error.message)
    }
    handleCloseDeleteModal()
  }

  const onDelete = (id) => {
    setProfessorIdToDelete(id)
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
    isSpecialtyDisabled && setIsSpecialtyDisabled(false)
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

  useEffect(() => {
    const fetchProfessorLessons = async () => {
      const lessons = await getProfessorLessons(createInputs.id)
      setIsSpecialtyDisabled(lessons.length > 0)
    }

    if (viewUpdateModal) {
      fetchProfessorLessons()
    }
  }, [createInputs.id, viewUpdateModal])

  /**
   * Handles the edit professor button
   * It shows the create modal with the professor data
   * to be edited
   * @param {Object} professor The professor to edit
   */
  const handleEditProfessorButton = (professor) => {
    setViewUpdateModal(true) // Set the viewUpdateModal to true
    // Update the inputs with the professor data
    setCreateInputs({
      senecaUser: professor.senecaUser,
      name: professor.name,
      firstSurname: professor.firstSurname,
      lastSurname: professor.lastSurname,
      specialty: professor.specialty,
      id: professor.id
    })
    // Show the create modal
    setViewCreateModal(true)
  }

  const handleUpdateProfessor = async (event) => {
    event.preventDefault() // Prevent the default form behavior
    const professorInputs = createInputs
    if (isSpecialtyDisabled) {
      delete professorInputs.specialty
    }

    // If the senecaUser is the same, remove it from the inputs
    if (professorInputs.senecaUser === professors.find((prof) => prof.id === professorInputs.id).senecaUser) {
      delete professorInputs.senecaUser
    }

    try {
      const professor = await professorService.updateProfessor(professorInputs)
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
    resetCreateInputs()
    // Reset the viewUpdateModal
    setViewUpdateModal(false)
  }

  const getProfessorLessons = async (professorId) => {
    try {
      const lessons = await professorService.getProfessorLessons(professorId)
      return lessons
    } catch (error) {
      setError(error.message)
      console.error('Error getting professor lessons:', error.message)
    }
  }

  return (
    <>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {
        isLoading
          ? <TableRowLoading columns={professorColumns.length} />
          : (
            <>
              <TableTemplate data={professors} columns={professorColumns} onDelete={onDelete} onEdit={handleEditProfessorButton} />
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
            </>
            )
        }

      {/* <!-- ===== Start of Delete Modal ===== --> */}
      {isAdmin && (<ConfirmModal show={viewDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleDeleteProfessor} title='Delete Professor' message='Are you sure you want to delete this professor?' />)}

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
                { value: '', label: 'Select Specialty', disabled: true },
                { value: 'FP', label: 'FP' },
                { value: 'Secondary', label: 'Secondary' }
              ],
              disabled: isSpecialtyDisabled
            },
            !viewUpdateModal && {
              colSpan: 2,
              label: 'Password',
              type: 'password',
              name: 'password',
              value: createInputs.password,
              handleInputsChange: handleCreateInputs,
              required: true
            },
            !viewUpdateModal && {
              colSpan: 2,
              label: 'Confirm Password',
              type: 'password',
              name: 'confirmPassword',
              value: createInputs.confirmPassword,
              handleInputsChange: handleCreateInputs,
              required: true
            }
          ].filter(Boolean)} // Remove the null values
        />)}
      {/* <!-- ===== End of Add Professor Modal ===== --> */}
    </>
  )
}

export default ProfessorTable
