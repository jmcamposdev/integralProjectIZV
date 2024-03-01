const FormModal = ({ isOpen, onClose, onSubmit, title, submitText, formFields }) => {
  return (
    <>
      {/* <!-- ===== Start of Add Professor Modal ===== --> */}
      <div id='crud-modal' tabIndex='-1' aria-hidden='true' className={`${!isOpen && 'hidden'} fixed left-0 top-0 z-9999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5`}>
        <div className='bg-white dark:bg-boxdark rounded-lg shadow-md max-w-md w-full'>
          <div className='flex items-center justify-between p-4 md:p-5  rounded-t border-b border-stroke dark:border-strokedark'>
            <h3 className='text-lg font-semibold text-black dark:text-white'>
              {title}
            </h3>
            <button onClick={onClose} type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white' data-modal-toggle='crud-modal'>
              <svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <form onSubmit={onSubmit} className='p-4 md:p-5'>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              {formFields.map((field, index) => (
                <div key={index} className={`col-span-${field.colSpan || 2}`}>
                  <label htmlFor={field.id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{field.label}</label>
                  {field.type === 'select'
                    ? (
                      <div>
                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                          <select
                            onChange={field.handleInputsChange}
                            id={field.id}
                            name={field.name}
                            className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary '
                            value={field.value}
                            disabled={field.disabled}
                            required={field.required}
                          >
                            {field.options.map((option, i) => (
                              <option key={i} value={option.value} disabled={option.disabled}>{option.label}</option>
                            ))}
                          </select>
                          <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 icon-[ep--arrow-down]' style={{ fontSize: '22px' }} />
                        </div>
                        {field.disabled && (
                          <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                            {field.disabledMessage}
                          </span>
                        )}
                      </div>

                      )
                    : (
                      <>
                        <input
                          onChange={field.handleInputsChange}
                          type={field.type}
                          name={field.name}
                          id={field.id}
                          value={field.value}
                          title={field.title}
                          pattern={field.pattern}
                          placeholder={`Enter ${field.label}`}
                          autoComplete={field.autoComplete}
                          className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white disabled:text-bodydark disabled:dark:text-bodydark dark:focus:border-primary dark:disabled:bg-black'
                          required={field.required}
                          disabled={field.disabled}
                        />
                        {field.disabled && (
                          <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                            {field.disabledMessage}
                          </span>
                        )}
                      </>

                      )}
                </div>
              ))}
            </div>
            <button
              type='submit'
              className='w-full flex justify-center text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <svg className='me-1 -ms-1 w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule='evenodd' />
              </svg>
              {submitText}
            </button>
          </form>
        </div>
      </div>
      {/* <!-- ===== End of Add Professor Modal ===== --> */}
    </>
  )
}

export default FormModal
