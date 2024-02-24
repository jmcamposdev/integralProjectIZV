import { useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import useAuth from '../../../hooks/useAuth'
import userThree from '../../../images/user/user-03.png'
import DefaultLayout from '../../../layout/DefaultLayout'
import ErrorAlert from '../../../components/Alerts/ErrorAlert'
import authService from '../../../services/authService'
import userService from '../../../services/userService'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

const Profile = () => {
  const { authId, name, firstSurname, lastSurname, senecaUser } = useAuth()
  const signIn = useSignIn()
  const [error, setError] = useState(null)
  const [user, setUser] = useState({
    id: authId,
    name,
    firstSurname,
    lastSurname,
    senecaUser
  })

  const resetUserInputs = () => {
    setUser({
      id: authId,
      name,
      firstSurname,
      lastSurname,
      senecaUser
    })
  }

  const handleInputsChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    try {
      // Update user profile
      const updatedUser = await userService.updateUser(user)
      console.log(updatedUser)
      // Refresh token
      const refresedToken = await authService.refreshToken(updatedUser.senecaUser)

      signIn({
        auth: {
          token: refresedToken,
          type: 'Bearer'
        },
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          firstSurname: updatedUser.firstSurname,
          lastSurname: updatedUser.lastSurname,
          senecaUser: updatedUser.senecaUser
        }
      })

      resetUserInputs()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <DefaultLayout>
      <div className='mx-auto max-w-270'>
        <Breadcrumb pageName='Profile' />

        {/* ERROR MESSAGE */}
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        <div className='grid grid-cols-5 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                  Personal Information
                </h3>
              </div>
              <div className='p-7'>
                <form action='#'>

                  {/* SENECA INPUT */}
                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='senecaUser'
                    >
                      Seneca User
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='senecaUser'
                      id='senecaUser'
                      placeholder='Your Seneca User'
                      defaultValue={user.senecaUser}
                      onChange={handleInputsChange}
                    />
                  </div>
                  {/* END SENECA INPUT */}

                  {/* NAME INPUT */}
                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='name'
                    >
                      Name
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Your Name'
                      defaultValue={user.name}
                      onChange={handleInputsChange}
                    />
                  </div>
                  {/* NAME INPUT */}

                  {/* SURNAMES INPUTS */}
                  <div className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                    <div className='w-full sm:w-1/2'>
                      <label className='mb-3 block text-sm font-medium text-black dark:text-white' htmlFor='firstSurname'> First Surname </label>
                      <div className='relative'>
                        <input
                          className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                          type='text'
                          name='firstSurname'
                          id='firstSurname'
                          placeholder='Your First Surname'
                          defaultValue={user.firstSurname}
                          onChange={handleInputsChange}
                        />
                      </div>
                    </div>
                    <div className='w-full sm:w-1/2'>
                      <label
                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                        htmlFor='lastSurname'
                      >
                        Last Surname
                      </label>
                      <input
                        className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                        type='text'
                        name='lastSurname'
                        id='lastSurname'
                        placeholder='Your Last Surname'
                        defaultValue={user.lastSurname}
                        onChange={handleInputsChange}
                      />
                    </div>
                  </div>
                  {/* SURNAMES INPUTS */}

                  <div className='flex justify-end gap-4.5'>
                    <button
                      className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                      type='submit'
                    >
                      Cancel
                    </button>
                    <button
                      className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90'
                      type='submit'
                      onClick={handleUpdateProfile}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col-span-5 xl:col-span-2'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                  Your Photo
                </h3>
              </div>
              <div className='p-7'>
                <form action='#'>
                  <div className='mb-4 flex items-center gap-3'>
                    <div className='h-14 w-14 rounded-full'>
                      <img src={userThree} alt='User' />
                    </div>
                    <div>
                      <span className='mb-1.5 text-black dark:text-white'>
                        Edit your photo
                      </span>
                      <span className='flex gap-2.5'>
                        <button className='text-sm hover:text-primary'>
                          Delete
                        </button>
                        <button className='text-sm hover:text-primary'>
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id='FileUpload'
                    className='relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5'
                  >
                    <input
                      type='file'
                      accept='image/*'
                      className='absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none'
                    />
                    <div className='flex flex-col items-center justify-center space-y-3'>
                      <span className='flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z'
                            fill='#3C50E0'
                          />
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z'
                            fill='#3C50E0'
                          />
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z'
                            fill='#3C50E0'
                          />
                        </svg>
                      </span>
                      <p>
                        <span className='text-primary'>Click to upload</span> or
                        drag and drop
                      </p>
                      <p className='mt-1.5'>SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className='flex justify-end gap-4.5'>
                    <button
                      className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                      type='submit'
                    >
                      Cancel
                    </button>
                    <button
                      className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90'
                      type='submit'
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Profile
