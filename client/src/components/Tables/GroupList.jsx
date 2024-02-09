import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import formationService from '../../services/formationService'
import groupService from '../../services/groupService'
import ErrorAlert from '../Alerts/ErrorAlert'
import ConfirmModal from '../Modals/ConfirmModal'

const GroupList = () => {
  const { isAdmin } = useAuth()
  const [error, setError] = useState(null) // Save the error message
  const [groups, setGroups] = useState([]) // Save the groups
  const [formations, setFormations] = useState([]) // Save the formations
  const [groupIdToDelete, setGroupIdToDelete] = useState(null) // Save the groups id to delete
  const [viewDeleteModal, setViewDeleteModal] = useState(false) // Show or hide the delete modal
  const [viewCreateModal, setViewCreateModal] = useState(false) // Show or hide the create modal
  const [viewUpdateModal, setViewUpdateModal] = useState(false) // Show or hide the update modal
  const [GroupsInputs, setGroupsInputs] = useState({ // Save the inputs from the create modal and update modal
    schoolYear: '',
    formationId: '',
    course: '',
    denomination: '',
    isMorning: false
  }) // Save the inputs from the create modal

  /**
   * Reset the inputs from the create modal and update modal
   */
  const resetGroupInputs = () => {
    setGroupsInputs({
      schoolYear: '',
      formationId: '',
      course: '',
      denomination: '',
      isMorning: false
    })
  }

  const handleGroupInputs = (e) => {
    if (e.target.name === 'isMorning') {
      setGroupsInputs({
        ...GroupsInputs,
        [e.target.name]: e.target.checked
      })
      return
    }

    if (e.target.name === 'formationId') {
      const formation = formations.find(formation => formation.id === e.target.value)
      setGroupsInputs({
        ...GroupsInputs,
        formationId: e.target.value,
        course: formation.course,
        denomination: formation.denomination
      })
      return
    }
    setGroupsInputs({
      ...GroupsInputs,
      [e.target.name]: e.target.value
    })
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
        // Save the groups in the state
        setGroups(groups)
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
    getGroups()
  }, [])

  /**
   * ------------------------------------------------------------------------
   *  Delete Group Logic
   * ------------------------------------------------------------------------
   */

  /**
   * This runs when the moduleIdToDelete changes
   * If the moduleIdToDelete is not null, show the delete modal
   * If the moduleIdToDelete is null, hide the delete modal
   */
  useEffect(() => {
    // If the moduleIdToDelete is not null, show the delete modal
    if (groupIdToDelete) {
      setViewDeleteModal(true)
    } else { // If the moduleIdToDelete is null, hide the delete modal
      setViewDeleteModal(false)
    }
  }, [groupIdToDelete])

  const handleDeleteGroup = async () => {
    try {
      // Delete the group from the database
      await groupService.deleteGroup(groupIdToDelete)
      // Remove the group from the state
      setGroups(groups.filter(group => group.id !== groupIdToDelete))
      // Reset the moduleIdToDelete
      setGroupIdToDelete(null)
    } catch (error) {
      // If there's an error, save the error message in the state
      setError(error.message)
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
    // If the create modal is closed, reset the moduleInputs
    if (!viewCreateModal) {
      setViewUpdateModal(false)
      // If the update modal is closed, reset the moduleInputs
    } else if (!viewUpdateModal) {
      resetGroupInputs()
    }
  }, [viewCreateModal])

  return (
    <>
      {/* <!-- ===== Start of Group Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6'>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Groups List
        </h4>
        <div className='flex flex-col'>
          <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 ${isAdmin ? 'sm:grid-cols-6' : 'sm:grid-cols-5'}`}>
            <div className='p-2.5 xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Course
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Denomination
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Formation
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                School Year
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Shift
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
        {groups.length <= 0
          ? (
            <div className='text-center p-10'>No groups yet...</div>
            )
          : (
              groups.map((group) => (
                <div className={`grid grid-cols-2 ${isAdmin ? 'sm:grid-cols-6' : 'sm:grid-cols-5'}`} key={group.id}>
                  <div className='p-2.5 xl:p-5'>
                    <p className='text-black dark:text-white'>{group.course}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{group.denomination}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>
                      {formations.find((formation) => formation.id === group.formationId)?.acronym}
                    </p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{group.schoolYear}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{group.isMorning ? 'Morning' : 'Afternoon'}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                    {
                      isAdmin && (
                        <>
                          {/* Delete Modules Modal */}
                          <button onClick={() => setGroupIdToDelete(group.id)}>
                            <i className='icon-[material-symbols-light--delete-outline-rounded] fill-current duration-300 ease-in-out hover:text-red-500' style={{ fontSize: '27px' }} />
                          </button>

                          <button onClick={() => handleUpdateClick(group)}>
                            <i className='icon-[lucide--edit] ml-6 fill-current duration-300 ease-in-out hover:text-meta-3' style={{ fontSize: '20px' }} />
                          </button>
                        </>
                      )
                    }

                  </div>
                </div>

              )))}
        {// Only show the add groups button if the user is an admin
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
      {isAdmin && (<ConfirmModal show={viewDeleteModal} handleClose={() => (setGroupIdToDelete(null))} handleConfirm={handleDeleteGroup} message='Are you sure you want to delete this group?' />)}
      {/* <!-- ===== End of Delete Modal ===== --> */}
    </>
  )
}

export default GroupList
