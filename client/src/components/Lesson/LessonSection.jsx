import { useEffect, useState } from 'react'
import lessonService from '../../services/lessonService'

const LessonSection = () => {
  const [lessons, setLessons] = useState([])
  const [allGroups, setAllGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [groupLessons, setGroupLessons] = useState([])
  const [groupModules, setGroupModules] = useState([])
  const [moduleLessons, setModuleLessons] = useState([])

  /**
   * This useEffect runs only once when the component is mounted
   * Fetch the current year lessons and set the lessons state
   * Fetch the distinct groups from the lessons array and set the allGroups state
   */
  useEffect(() => {
    const fetchCurrentYearLessons = async () => {
      try {
        // Get the current year lessons
        const currentLessons = await lessonService.getCurrentYearLessons()
        // Get all distinct groups from the current year lessons
        getAllDistinctGroups(currentLessons)
        // Set the lessons state
        setLessons(currentLessons)
        console.log('Current year lessons:', currentLessons)
      } catch (error) { // Catch and log any error
        console.error('Error getting current year lessons:', error.message)
      }
    }
    fetchCurrentYearLessons()
  }, [])

  /**
   * This useEffect runs when the selectedGroup state changes
   * Set the selectedLessons state to the lessons that have the selected group
   */
  useEffect(() => {
    // Reset all data
    setGroupLessons([])
    setGroupModules([])
    setModuleLessons([])
    // If the selectedGroup is not null
    if (selectedGroup) {
      // Get the lessons that have the selected group
      const groupLessons = lessons.filter(lesson => lesson.group.id === selectedGroup.id)
      // Set the groupLessons state
      setGroupLessons(groupLessons)
      console.log('Selected Lessons:', groupLessons)
    }
  }, [selectedGroup])

  /**
   * This useEffect runs when the groupLessons state changes
   * Set the selectedModules state to the distinct modules from the selectedLessons state
   */
  useEffect(() => {
    // If the groupLessons array is not empty
    if (groupLessons.length > 0) {
      // Get all modules from the groupLessons array
      const modules = groupLessons.map(lesson => lesson.module)
      // Remove duplicates how has the same id
      const distinctModules = modules.filter((module, index, self) =>
        index === self.findIndex((m) => (
          m.id === module.id
        ))
      )
      // Set the groupModules state
      setGroupModules(distinctModules)
      console.log('Distinct modules:', distinctModules)
    }
  }, [groupLessons])

  /**
   * Get all distinct groups from the lessons array
   * @param {Array[Object]} lessons - The lessons array
   */
  const getAllDistinctGroups = (lessons) => {
    // Get all groups from the lessons array
    const groups = lessons.map(lesson => lesson.group)
    // Remove duplicates how has the same id
    const distinctGroups = groups.filter((group, index, self) =>
      index === self.findIndex((g) => (
        g.id === group.id
      ))
    )
    // Set the allGroups state
    setAllGroups(distinctGroups)
    console.log('Distinct groups:', distinctGroups)
  }

  const handleSelectModule = (module) => {
    const lessons = groupLessons.filter(lesson => lesson.module.id === module.id)
    setModuleLessons(lessons)
    console.log('Module lessons:', lessons)
  }

  return (
    <section className='overflow-hidden z-0 relative py-17.5 sm:py-22.5 xl:py-27.5 bg-white dark:bg-boxdark-2 flex flex-col gap-[2.5rem] font-medium leading-relaxed font-satoshi text-black dark:text-white justify-center items-center'>
      <div className='z-1 mx-auto max-w-[55rem] px-4 text-center sm:px-8 xl:px-0'>
        <span className='text-2xl font-heading mb-5 inline-block text-title-6 font-medium text-primary'>Classes</span><h2 className='text-4xl xl:text-5xl font-semibold text-black dark:text-white'>Explore your classes meet the teachers and modules</h2>
      </div>
      <div className='w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        {lessons.length === 0
          ? (
            <div className='text-center text-lg font-medium text-black dark:text-white'>No lessons available yet...</div>
            )
          : (
            <>
              <div className='buttons-container flex gap-6 flex-wrap justify-center items-center pb-14'>
                {allGroups.map(group => (
                  <button
                    key={group.id} className={`inline-flex items-center justify-center rounded-md border dark:border-form-strokedark border-stroke py-2 px-6 text-center font-medium text-black dark:text-white hover:bg-opacity-90 hover:bg-gray-2 dark:hover:bg-opacity-90 dark:hover:bg-meta-4 transition-colors ${selectedGroup && selectedGroup.id === group.id ? 'bg-primary dark:bg-primary hover:bg-primary dark:hover:bg-primary text-white' : ''}`}
                    onClick={() => setSelectedGroup(group)}
                  >{group.denomination}
                  </button>
                ))}
              </div>
              <div className='tables-container flex gap-10 flex-col md:flex-row'>
                <div className='w-full'>
                  <h2 className='text-2xl font-semibold text-black dark:text-white mb-6'>Modules</h2>
                  <table className='w-full bg-gray dark:bg-boxdark datatable-table table-auto !border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8 rounded-md'>
                    <thead>
                      <tr className='border-b border-stroke dark:border-strokedark'>
                        <th className='pt-8 pl-8 pr-2.5 pb-6 select-none text-left'>Denomination
                        </th>
                        <th className='pt-8 pl-8 pr-2.5 pb-6 select-none text-left'>Acronym </th>
                      </tr>
                    </thead>
                    <tbody className='rounded-md'>
                      {groupLessons.length === 0 && (
                        <tr className='border-b border-stroke dark:border-strokedark'>
                          <td className='pl-8 py-5 pr-2 text-center' colSpan='2'>No Group Selected</td>
                        </tr>
                      )}
                      {groupModules.map(module => (
                        <tr
                          className={`border-b border-stroke dark:border-strokedark hover:bg-blue-200 hover:bg-opacity-10 cursor-pointer rounded-md transition-colors ${moduleLessons.length > 0 && moduleLessons[0].module.id === module.id ? 'bg-blue-400 dark:bg-blue-200 dark:text-white bg-opacity-10 dark:bg-opacity-20' : ''}`}
                          key={module.id}
                          onClick={() => handleSelectModule(module)}
                        >
                          <td className='pl-8 py-5 pr-2'>{module.denomination}</td>
                          <td className='pl-8 py-5 pr-2'>{module.acronym}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className='w-full'>
                  <h2 className='text-2xl font-semibold text-black dark:text-white mb-6'>Lessons</h2>
                  <table className='w-full bg-gray dark:bg-boxdark datatable-table table-auto !border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8 rounded-md'>
                    <thead>
                      <tr className='border-b border-stroke dark:border-strokedark'>
                        <th className='pt-8 pl-8 pr-2.5 pb-6 select-none text-left'>Professor</th>
                        <th className='pt-8 pl-8 pr-2.5 pb-6 select-none text-left'>Hours</th>
                      </tr>
                    </thead>
                    <tbody className='rounded-md'>
                      {moduleLessons.length === 0 && (
                        <tr className='border-b border-stroke dark:border-strokedark'>
                          <td className='pl-8 py-5 pr-2 text-center' colSpan='2'>No Module Selected</td>
                        </tr>
                      )}
                      {moduleLessons.map((lesson, index) => (
                        <tr
                          key={lesson.id}
                          className={`border-b border-stroke dark:border-strokedark hover:bg-blue-200 hover:bg-opacity-10 transition-colors ${
                      index === moduleLessons.length - 1 ? 'rounded-b-md' : ''
                    }`}
                        >
                          <td className='pl-8 py-5 pr-2'>{`${lesson.professor.firstSurname} ${lesson.professor.lastSurname}, ${lesson.professor.name}`}</td>
                          <td className='pl-8 py-5 pr-2'>{lesson.hours}h <span className='text-xs font-normal text-slate-700 dark:text-slate-300'>/week</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
            )}

      </div>
    </section>
  )
}

export default LessonSection
