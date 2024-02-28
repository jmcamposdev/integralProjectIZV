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
  const [hasLessons, setHasLessons] = useState(false)
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal
  const [viewCreateModal, setViewCreateModal] = useState(false) // Show or hide the create modal
  const [viewUpdateModal, setViewUpdateModal] = useState(false) // Show or hide the update modal
  const [viewChangePasswordModal, setViewChangePasswordModal] = useState(false) // Show or hide the change password modal
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
    // If is the senecaUser input, convert the value to lowercase and remove the spaces and only letters and numbers
    if (event.target.name === 'senecaUser') {
      event.target.value = event.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')
    }

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
        console.log(professors)
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

  const onDelete = async (id) => {
    // Check if the professor has lessons
    const hasLessons = await professorService.getProfessorLessons(id)
    if (hasLessons.length > 0) {
      setError('You can\'t delete a professor with assigned lessons.')
      return
    }
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
   * This runs when the viewCreateModal changes
   * It resets the groupInputs when the create modal is closed
   * and hides the update modal when the create modal is closed
   */
  useEffect(() => {
    // If the create modal is closed, reset the moduleInputs
    if (!viewCreateModal) {
      setViewUpdateModal(false)
      setHasLessons(false)
      // If the update modal is closed, reset the moduleInputs
    } else if (!viewUpdateModal) {
      resetCreateInputs()
    }
  }, [viewCreateModal])

  /**
   * This function creates a new professor
   * and adds it to the state
   * @param {Event} event The event object
   */
  const handleCreateProfessor = async (event) => {
    event.preventDefault()

    // Validate that the password and confirmPassword are the same
    if (createInputs.password !== createInputs.confirmPassword) {
      setViewCreateModal(false)
      setError('The passwords do not match.')
      return
    }

    try {
      const professor = await professorService.createProfessor(createInputs)
      // Add the password and confirmPassword to the professor object
      professor.password = ''
      professor.confirmPassword = ''
      setProfessors([...professors, professor])
    } catch (error) {
      setError(error.message)
      console.error('Error creating professor:', error.message)
    }

    // Close the create modal the useEffect will reset the inputs
    setViewCreateModal(false)
  }

  /**
   * Handles the edit professor button
   * It shows the create modal with the professor data
   * to be edited
   * @param {Object} professor The professor to edit
   */
  const handleEditProfessorButton = async (professor) => {
    try {
      // Check if the professor has lessons
      const lessons = await professorService.getProfessorLessons(professor.id)
      // If the professor has lessons, disable the specialty input
      setHasLessons(lessons.length > 0)
      // Set the inputs with the professor data and the password and confirmPassword empty to prevent uncontrolled inputs warning
      // Update the inputs with the professor data
      setCreateInputs({ ...professor, password: '', confirmPassword: '' })

      setViewCreateModal(true) // Show the create modal
      setViewUpdateModal(true) // Set the viewUpdateModal to true
    } catch (error) {
      setError(error.message)
    }
  }

  const handleUpdateProfessor = async (event) => {
    event.preventDefault() // Prevent the default form behavior
    // Create a copy of the inputs
    const professorInputs = createInputs
    // Remove the password and confirmPassword from the inputs if they are empty
    if (professorInputs.password === '' && professorInputs.confirmPassword === '') {
      delete professorInputs.password
      delete professorInputs.confirmPassword
    }
    // If the professor has lessons, remove the specialty input to avoid changing it
    if (hasLessons) {
      delete professorInputs.specialty
    }
    // If the senecaUser is the same, remove it from the inputs
    if (professorInputs.senecaUser === professors.find((prof) => prof.id === professorInputs.id).senecaUser) {
      delete professorInputs.senecaUser
    }

    try {
      // Update the professor
      const professor = await professorService.updateProfessor(professorInputs)
      // Update the state with the new professor
      setProfessors(professors.map((prof) => (prof.id === professor.id ? professor : prof)))
      resetCreateInputs() // Reset the inputs
    } catch (error) {
      setError(error.message)
    }

    // Close the create modal the useEffect will reset the inputs
    setViewCreateModal(false)
  }

  const handleChangePasswordButton = (professor) => {
    setCreateInputs({ ...professor, password: '', confirmPassword: '' }) // Clear the inputs
    setViewChangePasswordModal(true) // Show the change password modal
  }

  const handleChangePassword = async (event) => {
    event.preventDefault() // Prevent the default form behavior
    // Extract the password and confirmPassword from the inputs
    const { password, confirmPassword } = createInputs

    // Check if the password or confirmPassword are empty
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setError('The password and confirmPassword can\'t be empty.')
      setViewChangePasswordModal(false) // Close the change password modal
      return
    }

    // Check if the password and confirmPassword are the same
    if (password !== confirmPassword) {
      setError('The passwords do not match.')
      setViewChangePasswordModal(false) // Close the change password modal
      return
    }

    try {
      // Update the professor password
      await professorService.changeProfessorPassword(createInputs.senecaUser, password)
      // Close the change password modal
      setViewChangePasswordModal(false)
    } catch (error) {
      setError(error.message)
    }
  }

  const onUpgradeRole = async (professor) => {
    try {
      const updatedProfessor = await professorService.updateProfessor({ roleId: 2, id: professor.id })
      setProfessors(professors.map((prof) => (prof.id === updatedProfessor.id ? updatedProfessor : prof)))
    } catch (error) {
      setError(error.message)
    }
  }

  const onDowngradeRole = async (professor) => {
    try {
      const updatedProfessor = await professorService.updateProfessor({ roleId: 1, id: professor.id })
      setProfessors(professors.map((prof) => (prof.id === updatedProfessor.id ? updatedProfessor : prof)))
    } catch (error) {
      setError(error.message)
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
              <TableTemplate data={professors} columns={professorColumns} onDelete={onDelete} onEdit={handleEditProfessorButton} onChangePassword={handleChangePasswordButton} onUpgrade={onUpgradeRole} onDowngrade={onDowngradeRole} />
              {// Only show the add professor button if the user is an admin
              isAdmin && (
                <button
                  onClick={() => setViewCreateModal(true)}
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
          isOpen={viewCreateModal} onClose={() => setViewCreateModal(false)} onSubmit={viewUpdateModal ? handleUpdateProfessor : handleCreateProfessor} title={viewUpdateModal ? 'Update Professor' : 'Create Professor'} submitText={viewUpdateModal ? 'Update Professor' : 'Add new Professor'} formFields={[ // Add the form fields
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
              required: true,
              autoComplete: 'username'
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
              disabled: hasLessons,
              disabledMessage: 'You can\'t change the specialty of a professor with assigned lessons.'
            },
            !viewUpdateModal && {
              colSpan: 2,
              label: 'Password',
              type: 'password',
              name: 'password',
              value: createInputs.password,
              handleInputsChange: handleCreateInputs,
              required: true,
              autoComplete: 'new-password'
            },
            !viewUpdateModal && {
              colSpan: 2,
              label: 'Confirm Password',
              type: 'password',
              name: 'confirmPassword',
              value: createInputs.confirmPassword,
              handleInputsChange: handleCreateInputs,
              required: true,
              autoComplete: 'new-password'
            }
          ].filter(Boolean)} // Remove the null values
        />)}
      {/* <!-- ===== End of Add Professor Modal ===== --> */}

      {/* <!-- ===== Start Change Password Modal ===== --> */}
      {isAdmin && (
        <FormModal
          isOpen={viewChangePasswordModal}
          onClose={() => setViewChangePasswordModal(false)}
          onSubmit={handleChangePassword}
          title='Change Password'
          submitText='Change Password'
          formFields={[
            {
              colSpan: 2,
              label: 'Password',
              type: 'password',
              name: 'password',
              value: createInputs.password,
              handleInputsChange: handleCreateInputs,
              required: true,
              autoComplete: 'new-password'
            },
            {
              colSpan: 2,
              label: 'Confirm Password',
              type: 'password',
              name: 'confirmPassword',
              value: createInputs.confirmPassword,
              handleInputsChange: handleCreateInputs,
              required: true,
              autoComplete: 'new-password'
            }
          ]}
        />
      )}
      {/* <!-- ===== End Change Password Modal ===== --> */}

    </>
  )
}

export default ProfessorTable
