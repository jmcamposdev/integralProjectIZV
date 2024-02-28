import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Loader from './common/Loader'
import PageTitle from './components/PageTitle'
import SignIn from './pages/Authentication/SignIn'
import ECommerce from './pages/Dashboard/DashboardHome'
import Profile from './pages/Dashboard/Settings/Profile'
import ProfessorIndex from './pages/Dashboard/Professor/ProfessorIndex'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import Welcome from './pages/Welcome/Welcome'
import FormationIndex from './pages/Dashboard/Formation/FormationIndex'
import ModuleIndex from './pages/Dashboard/Module/ModuleIndex'
import GroupIndex from './pages/Dashboard/Group/GroupIndex'
import LessonIndex from './pages/Dashboard/Lesson/LessonIndex'

function App () {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return loading
    ? (
      <Loader />
      )
    : (
      <>
        <Routes>

          {/* START GLOBAL ROUTES */}
          <Route index element={<><PageTitle title='Zawee' /><Welcome /></>} />
          <Route path='/login' element={<><PageTitle title='Zawee | Login' /><SignIn /></>} />
          {/* END GLOBAL ROUTES */}

          {/* START DASHBOARD ROUTES - ADMIN | PROFESSOR */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.USER]} />}>
            <Route path='/dashboard' element={<><PageTitle title='Zawee | Dashboard' /><ECommerce /></>} />
            <Route path='/dashboard/professors' element={<><PageTitle title='Zawee | Professors' /><ProfessorIndex /></>} />
            <Route path='/dashboard/formations' element={<><PageTitle title='Zawee | Formations' /><FormationIndex /></>} />
            <Route path='/dashboard/modules' element={<><PageTitle title='Zawee | Modules' /><ModuleIndex /></>} />
            <Route path='/dashboard/groups' element={<><PageTitle title='Zawee | Groups' /><GroupIndex /></>} />
            <Route path='/dashboard/lessons' element={<><PageTitle title='Zawee | Lessons' /><LessonIndex /></>} />
          </Route>
          {/* END DASHBOARD ROUTES */}

          {/* START ONLY ADMIN */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path='/dashboard/profile' element={<><PageTitle title='Zawee | Profile' /><Profile /></>} />
          </Route>
          {/* END ONLY ADMIN */}
        </Routes>
      </>
      )
}

export default App
