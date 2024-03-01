import { useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import useAuth from '../../../hooks/useAuth'
import DefaultLayout from '../../../layout/DefaultLayout'
import authService from '../../../services/authService'
import userService from '../../../services/userService'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useAlertToast from '../../../hooks/useToast'

const Profile = () => {
  const { toast } = useAlertToast()
  const { authId, name, firstSurname, lastSurname, senecaUser } = useAuth()
  const signIn = useSignIn()
  const [user, setUser] = useState({
    id: authId,
    name,
    firstSurname,
    lastSurname,
    senecaUser
  })
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
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

  const resetPasswordInputs = () => {
    setPasswords({
      password: '',
      confirmPassword: ''
    })
  }

  const handleInputsChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordInputsChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    })
  }

  const refreshTokens = async (user) => {
    // Refresh token
    const refresedToken = await authService.refreshToken(user.senecaUser)

    signIn({
      auth: {
        token: refresedToken,
        type: 'Bearer'
      },
      user: {
        id: user.id,
        name: user.name,
        firstSurname: user.firstSurname,
        lastSurname: user.lastSurname,
        senecaUser: user.senecaUser
      }
    })
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    try {
      // Update user profile
      const updatedUser = await userService.updateUser(user)

      // Refresh token
      await refreshTokens(updatedUser)

      resetUserInputs()

      // Show success message
      toast.showSuccess('Profile updated successfully')
    } catch (error) {
      toast.showError(error.message)
    }
  }

  const handleUpdatePassword = async (e) => {
    // Prevent form submission
    e.preventDefault()

    // Check if passwords match
    if (passwords.password !== passwords.confirmPassword) {
      toast.showError('Passwords do not match')
      return
    }

    try {
      const userNewPassword = user
      // Add password to user object
      userNewPassword.password = passwords.password
      // Update user password
      const updatedUser = await userService.updateUser(userNewPassword)
      // Refresh token
      await refreshTokens(updatedUser)
      // Reset password inputs
      resetPasswordInputs()
      // Show success message
      toast.showSuccess('Password updated successfully')
    } catch (error) {
      toast.showError(error.message)
    }
  }

  return (
    <DefaultLayout>
      <div className='mx-auto max-w-270'>
        <Breadcrumb pageName='Profile' />
        <div className='grid grid-cols-5 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark duration-300 ease-linear'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark duration-300 ease-linear'>
                <h3 className='font-medium text-black dark:text-white duration-300 ease-linear'>
                  Personal Information
                </h3>
              </div>
              <div className='p-7'>
                <form action='#'>

                  {/* SENECA INPUT */}
                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white duration-300 ease-linear'
                      htmlFor='senecaUser'
                    >
                      Seneca User
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary duration-300 ease-linear'
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
                      className='mb-3 block text-sm font-medium text-black dark:text-white duration-300 ease-linear'
                      htmlFor='name'
                    >
                      Name
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary duration-300 ease-linear'
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
                      <label className='mb-3 block text-sm font-medium text-black dark:text-white duration-300 ease-linear' htmlFor='firstSurname'> First Surname </label>
                      <div className='relative'>
                        <input
                          className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary duration-300 ease-linear'
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
                        className='mb-3 block text-sm font-medium text-black dark:text-white duration-300 ease-linear'
                        htmlFor='lastSurname'
                      >
                        Last Surname
                      </label>
                      <input
                        className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary duration-300 ease-linear'
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
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark duration-300 ease-linear'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark duration-300 ease-linear'>
                <h3 className='font-medium text-black dark:text-white duration-300 ease-linear'>
                  Change Password
                </h3>
              </div>
              <div className='p-7'>
                <form onSubmit={handleUpdatePassword}>
                  <div className='mb-5.5'>
                    <label className='mb-3 block text-sm font-medium text-black dark:text-white duration-300 ease-linear' htmlFor='senecaUser'>New Password</label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary duration-300 ease-linear' type='password'
                      name='password'
                      id='password'
                      placeholder='Your New Password'
                      onChange={handlePasswordInputsChange}
                      value={passwords.password}
                    />
                  </div>

                  <div className='mb-5.5'>
                    <label className='mb-3 block text-sm font-medium text-black dark:text-white duration-300 ease-linear' htmlFor='senecaUser'>Confirm Password</label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary duration-300 ease-linear' type='password'
                      name='confirmPassword'
                      id='confirmPassword'
                      placeholder='Confirm New Password'
                      onChange={handlePasswordInputsChange}
                      value={passwords.confirmPassword}
                    />
                  </div>
                  <div className='flex justify-end gap-4.5'><button className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90' type='submit'>Save</button></div>
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
