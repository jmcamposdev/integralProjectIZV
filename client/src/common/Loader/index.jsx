import useColorMode from '../../hooks/useColorMode'

const Loader = () => {
  useColorMode() // Call the useColorMode hook
  return (
    <div className='flex h-screen items-center justify-center bg-white dark:bg-boxdark'>
      <div className='h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent' />
    </div>
  )
}

export default Loader
