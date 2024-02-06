const Welcome = () => {
  return (
    <div className='px-4 py-4'>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold text-gray-800'>Welcome to TailAdmin</h1>
        <p className='text-gray-500'>A Tailwind CSS Admin Dashboard Template</p>
        {/* Button to Sign In or Sing Up */}
        <div className='flex justify-center mt-6'>
          <a
            href='/login'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Sign In
          </a>
          <a
            href='/signup'
            className='bg-gray-200 text-gray-700 px-4 py-2 ml-2 rounded-md hover:bg-gray-300'
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}

export default Welcome
