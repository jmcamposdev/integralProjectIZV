import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useAlertToast = () => {
  const showError = (message) => {
    toast.error(message)
  }

  const showSuccess = (message) => {
    toast.success(message)
  }

  const showInfo = (message) => {
    toast.info(message)
  }

  const showWarning = (message) => {
    toast.warning(message)
  }

  return {
    toast: {
      showError,
      showSuccess,
      showInfo,
      showWarning
    }
  }
}

export default useAlertToast
