import { useEffect, useState } from 'react'
import professorService from '../../services/professorService'

const ProfessorList = () => {
  const [professors, setProfessors] = useState([])

  useEffect(() => {
    async function getProfessors () {
      try {
        const professors = await professorService.getAllProfessors()
        setProfessors(professors)
      } catch (error) {
        console.error('Error getting professors:', error.message)
      }
    }

    getProfessors()
  }
  , [])

  return (
    <>
      {/* <!-- ===== Start of Professor Table ===== --> */}
      <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
        <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Professors List
        </h4>

        <div className='flex flex-col'>
          <div className='grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4'>
            <div className='p-2.5 xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Name
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Seneca User
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Specialty
              </h5>
            </div>
            <div className='p-2.5 text-center xl:p-5'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Actions
              </h5>
            </div>
          </div>

        </div>
        {professors.length <= 0
          ? (
            <div className='text-center'>Loading...</div>
            )
          : (
              professors.map((professor) => (
                <div
                  className='grid grid-cols-2 sm:grid-cols-4 '
                  key={professor.id}
                >
                  <div className='p-2.5 xl:p-5'>
                    <p className='text-black dark:text-white'>{professor.name}</p>
                  </div>

                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-meta-3'>${professor.senecaUser}</p>
                  </div>

                  <div className='p-2.5 text-center xl:p-5'>
                    <p className='text-black dark:text-white'>{professor.specialty}</p>
                  </div>
                  <div className='p-2.5 text-center xl:p-5 flex align-center justify-center'>
                    <button>
                      <svg className='fill-current duration-300 ease-in-out hover:text-red-500' xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path fill='currentColor' d='M7.615 20q-.666 0-1.14-.475Q6 19.051 6 18.385V6h-.5q-.213 0-.356-.144T5 5.499q0-.212.144-.356Q5.288 5 5.5 5H9q0-.31.23-.54q.23-.23.54-.23h4.46q.31 0 .54.23q.23.23.23.54h3.5q.213 0 .356.144q.144.144.144.357q0 .212-.144.356Q18.713 6 18.5 6H18v12.385q0 .666-.475 1.14q-.474.475-1.14.475zM17 6H7v12.385q0 .269.173.442t.442.173h8.77q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .356-.144q.144-.144.144-.356v-8q0-.213-.144-.356T10.307 8q-.213 0-.356.144t-.143.356v8q0 .213.144.356t.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356T13.692 8q-.213 0-.356.144q-.144.144-.144.356v8q0 .213.144.356t.357.144M7 6v13z' /></svg>
                    </button>

                  </div>
                </div>

              )))}
      </div>
      {/* <!-- ===== End of Professor Table ===== --> */}
    </>
  )
}

export default ProfessorList
