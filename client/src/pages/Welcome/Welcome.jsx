import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuth from '../../hooks/useAuth'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
import Hero from '../../components/Hero/Hero'

const Welcome = () => {
  const { name, isLogged } = useAuth()
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
    window.location.reload()
  }
  return (
    <>
      <Hero />
      <HeaderMain />
      <div className='px-4 py-4'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold text-gray-800'>Welcome to TailAdmin</h1>
          <p className='text-gray-500'>A Tailwind CSS Admin Dashboard Template</p>
          {/* Button to Sign In or Sing Up */}
          <div className='flex justify-center mt-6'>
            {isLogged && (<p className='text-gray-500'>Welcome back! {name}</p>)}
            {isLogged
              ? (
                <button
                  onClick={handleSignOut}
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                >
                  Sign Out
                </button>
                )
              : (
                <a
                  href='/login'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >
                  Sign In
                </a>
                )}

            {isLogged
              ? (
                <a
                  href='/dashboard'
                  className='bg-gray-200 text-gray-700 px-4 py-2 ml-2 rounded-md hover:bg-gray-300'
                >
                  Dashboard
                </a>
                )
              : null}
            {!isLogged
              ? (
                <a
                  href='/signup'
                  className='bg-gray-200 text-gray-700 px-4 py-2 ml-2 rounded-md hover:bg-gray-300'
                >
                  Sign Up
                </a>
                )
              : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
