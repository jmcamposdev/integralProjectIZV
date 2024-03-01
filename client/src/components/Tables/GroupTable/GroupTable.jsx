import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import groupService from '../../../services/groupService'
import ConfirmModal from '../../Modals/ConfirmModal'
import FormModal from '../../Modals/FormModal'
import TableTemplate from '../TableTemplate'
import groupColumns from './groupColumns'
import useAlertToast from '../../../hooks/useToast'

const GroupTable = ({ formations, allGroups }) => {
  const { toast } = useAlertToast() // Show alert messages
  const { isAdmin } = useAuth() // Get the user role
  const [groups, setGroups] = useState([]) // Save the groups
  const [groupIdToDelete, setGroupIdToDelete] = useState(null) // Save the groups id to delete
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal
  const [viewCreateModal, setViewCreateModal] = useState(false) // Show or hide the create modal
  const [viewUpdateModal, setViewUpdateModal] = useState(false) // Show or hide the update modal
  const [hasLessons, setHasLessons] = useState(false) // Save if the group has lessons or not
  const [groupInputs, setGroupInputs] = useState({ // Save the inputs from the create modal and update modal
    schoolYear: '',
    formationId: '',
    course: '',
    denomination: '',
    letter: '',
    isMorning: false
  }) // Save the inputs from the create modal

  /**
   * Reset the inputs from the create modal and update modal
   */
  const resetGroupInputs = () => {
    setGroupInputs({
      schoolYear: '',
      formationId: '',
      course: '',
      denomination: '',
      letter: '',
      isMorning: false
    })
  }

  /**
   * Handle all the inputs from the create modal and update modal
   * @param {Event} e The event object
   */
  const handleGroupInputs = async (e) => {
    // Destructure the name, value, type, and checked from the event target
    let { name, value } = e.target
    // If the name is formationId, parse the value to an integer
    if (name === 'formationId' || name === 'course') {
      value = value === '' ? '' : parseInt(value)
    }

    // If the name is letter or course, update the denomination with the new value
    if (name === 'letter' || name === 'course') {
      // Destructure the letter and course from the groupInputs
      const letter = name === 'letter' ? value : groupInputs.letter
      const course = name === 'course' ? value : groupInputs.course
      // Find the formation acronym from the formations
      const formationAcronym = formations.find((formation) => formation.id === groupInputs.formationId)?.acronym
      // Create the denomination with the new values
      const denomination = `${course}${formationAcronym}${letter}`
      // Set the groupInputs with the new denomination and the new value
      setGroupInputs({ ...groupInputs, [name]: value, denomination })
      return
    }

    // If the name is isMorning, convert the value to a boolean
    if (name === 'isMorning') {
      value = value === 'true'
    }

    // Set the groupInputs with the new value
    setGroupInputs({ ...groupInputs, [name]: value })
  }

  /**
   * This only runs once when the component mounts
   * Get all the groups from the database
   * and save them in the groups state
   */
  useEffect(() => {
    async function getGroups () {
      try {
        // Fetch all the groups from the database
        const groups = await groupService.getAllGroups()
        // Add the letter to the groups
        groups.forEach(group => {
          group.letter = group.denomination.slice(-1)
        })
        // Save the groups in the state
        setGroups(groups)
      } catch (error) {
        // If there's an error, save the error message in the state
        toast.showError(error.message)
      }
    }

    // If allGroups is not declared, get the groups from the database
    if (!allGroups) {
      getGroups()
    } else {
      // If allGroups is declared, add the letter to the groups
      allGroups.forEach(group => {
        group.letter = group.denomination.slice(-1)
      })
      // Save the groups in the state
      setGroups(allGroups)
    }
  }, [])

  /**
   * ------------------------------------------------------------------------
   *  Delete Group Logic
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the groupIdToDelete changes
   * If the groupIdToDelete is not null, show the delete modal
   * If the groupIdToDelete is null, hide the delete modal
   */
  useEffect(() => {
    // If the groupIdToDelete is not null, show the delete modal
    if (groupIdToDelete) {
      setViewDeleteModal(true)
    } else { // If the groupIdToDelete is null, hide the delete modal
      setViewDeleteModal(false)
    }
  }, [groupIdToDelete])

  /**
   * This deletes a group from the database and the state
   * Get the group id from the state and delete the group
   * Then set the groupIdToDelete to null
   */
  const handleDeleteGroup = async () => {
    try {
      // Delete the group from the database
      await groupService.deleteGroup(groupIdToDelete)
      // Remove the group from the state
      setGroups(groups.filter(group => group.id !== groupIdToDelete))
      // Reset the groupIdToDelete
      setGroupIdToDelete(null)
      // Show a success message
      toast.showSuccess('Group deleted successfully')
    } catch (error) {
      // If there's an error, save the error message in the state
      toast.showError(error.message)
    }
  }

  /**
   * ------------------------------------------------------------------------
   *  Create|Update Group Logic (Modal)
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the viewCreateModal changes
   * It resets the groupInputs when the create modal is closed
   * and hides the update modal when the create modal is closed
   */
  useEffect(() => {
    // If the create modal is closed, reset the groupInputs
    if (!viewCreateModal) {
      setViewUpdateModal(false)
      setHasLessons(false)
      // If the update modal is closed, reset the groupInputs
    } else if (!viewUpdateModal) {
      resetGroupInputs()
    }
  }, [viewCreateModal])

  /**
   * This creates a new group and adds it to the state
   * @param {Event} event The event object
   */
  const handleCreateGroup = async (event) => {
    event.preventDefault()
    try {
      // Create the group in the database
      const group = await groupService.createGroup(groupInputs)
      // Add the group to the state
      setGroups([...groups, group])
      // Show a success message
      toast.showSuccess('Group created successfully')
    } catch (error) {
      // If there's an error, save the error message in the state
      toast.showError(error.message)
    }

    // Close the create modal
    setViewCreateModal(false)
  }

  /**
   * This updates a group and adds it to the state
   * @param {Event} event The event object
   */
  const handleUpdateGroup = async (event) => {
    event.preventDefault()

    // Remove the formationId and course if the group has lessons
    if (hasLessons) {
      delete groupInputs.formationId
      delete groupInputs.course
    }

    // Regenerate the denomination with the new values
    groupInputs.denomination = `${groupInputs.course}${formations.find((formation) => formation.id === groupInputs.formationId)?.acronym}${groupInputs.letter}`

    try {
      // Create the group in the database
      const updatedGroup = await groupService.updateGroup(groupInputs)
      // Set the letter to the updated group
      updatedGroup.letter = updatedGroup.denomination.slice(-1)
      // Add the group to the state
      setGroups(groups.map(group => (group.id === updatedGroup.id ? updatedGroup : group)))
      resetGroupInputs()
      // Show a success message
      toast.showSuccess('Group updated successfully')
    } catch (error) {
      // If there's an error, save the error message in the state
      toast.showError(error.message)
    }

    // Close the create modal
    setViewCreateModal(false)
  }

  /**
   * This runs when the user edits a group
   * It shows the create modal and the update modal
   * and sets the groupInputs with the group to update
   * @param {Object} group The group to update
   * @returns {void}
  */
  const handleUpdateClick = async (group) => {
    try {
      // Get the lessons from the group
      const lessons = await groupService.getGroupLessons(group.id)
      // Set the hasLessons state with the lessons length
      setHasLessons(lessons.length > 0)

      setViewCreateModal(true) // Show the create modal
      setViewUpdateModal(true) // Show the update modal
      setGroupInputs(group) // Set the groupInputs with the group to update
    } catch (error) {
      toast.showError(error.message)
    }
  }

  return (
    <>
      <TableTemplate data={groups} columns={groupColumns(formations)} onDelete={setGroupIdToDelete} onEdit={handleUpdateClick} />
      {// Only show the add groups button if the user is an admin
          isAdmin && (
            <button
              onClick={() => setViewCreateModal(true)}
              className='mt-8 flex ml-auto w-max items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            >
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z' /></svg>
              </span>Add Group
            </button>
          )
        }

      {/* <!-- ===== Start of Delete Modal ===== --> */}
      {isAdmin && (<ConfirmModal show={viewDeleteModal} handleClose={() => (setGroupIdToDelete(null))} handleConfirm={handleDeleteGroup} title='Delete Group' message='Are you sure you want to delete this group? You will delete all the Lessons related to this group.' />)}
      {/* <!-- ===== End of Delete Modal ===== --> */}

      {/* <!-- ===== Start of Create Modal ===== --> */}
      {isAdmin && (
        <FormModal
          isOpen={viewCreateModal} onClose={() => setViewCreateModal(false)} onSubmit={viewUpdateModal ? handleUpdateGroup : handleCreateGroup} title={viewUpdateModal ? 'Update Group' : 'Create Group'} submitText={viewUpdateModal ? 'Update Group' : 'Add new Group'} formFields={[
            {
              label: 'School Year',
              type: 'text',
              name: 'schoolYear',
              pattern: '^[0-9]{4}/[0-9]{4}$',
              title: 'The school year must be in the format: 2024/2025',
              value: groupInputs.schoolYear,
              handleInputsChange: handleGroupInputs,
              required: true
            },
            {
              label: 'Formation',
              type: 'select',
              name: 'formationId',
              value: groupInputs.formationId,
              handleInputsChange: handleGroupInputs,
              options: [
                { value: '', label: 'Select Formation', disabled: true },
                ...formations.map((formation) => ({ value: formation.id, label: formation.acronym }))
              ],
              required: true,
              disabled: hasLessons,
              disabledMessage: 'You can\'t change the formation if the group has lessons'
            },
            {
              label: 'Course',
              type: 'number',
              name: 'course',
              value: groupInputs.course,
              handleInputsChange: handleGroupInputs,
              required: true,
              disabled: hasLessons,
              disabledMessage: 'You can\'t change the course if the group has lessons'
            },
            {
              label: 'Letter',
              type: 'select',
              name: 'letter',
              value: groupInputs.letter,
              handleInputsChange: handleGroupInputs,
              options: [
                { value: '', label: 'Select Letter', disabled: true },
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' }
              ],
              required: true
            },
            {
              label: 'Shift',
              type: 'select',
              name: 'isMorning',
              value: groupInputs.isMorning,
              handleInputsChange: handleGroupInputs,
              options: [
                { value: false, label: 'Afternoon' },
                { value: true, label: 'Morning' }
              ]
            }
          ]}
        />
      )}
    </>
  )
}

export default GroupTable
