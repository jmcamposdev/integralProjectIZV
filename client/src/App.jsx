import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Loader from './common/Loader'
import PageTitle from './components/PageTitle'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import Chart from './pages/Chart'
import ECommerce from './pages/Dashboard/ECommerce'
import FormElements from './pages/Form/FormElements'
import FormLayout from './pages/Form/FormLayout'
import Profile from './pages/Dashboard/Settings/Profile'
import Tables from './pages/Tables'
import Alerts from './pages/UiElements/Alerts'
import Buttons from './pages/UiElements/Buttons'
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
        {/* START PERSONAL ROUTES */}
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title='Welcome' />
                <Welcome />
              </>
          }
          />

          {/* START DASHBOARD ROUTES */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.USER]} />}>
            <Route
              path='/dashboard'
              element={
                <>
                  <PageTitle title='Dashboard' />
                  <ECommerce />
                </>
            }
            />
            <Route
              path='/dashboard/professors'
              element={
                <>
                  <PageTitle title='Professor' />
                  <ProfessorIndex />
                </>
            }
            />
            <Route
              path='/dashboard/formations'
              element={
                <>
                  <PageTitle title='Formation' />
                  <FormationIndex />
                </>
            }
            />
            <Route
              path='/dashboard/modules'
              element={
                <>
                  <PageTitle title='Formation' />
                  <ModuleIndex />
                </>
            }
            />
            <Route
              path='/dashboard/groups'
              element={
                <>
                  <PageTitle title='Groups' />
                  <GroupIndex />
                </>
            }
            />
            <Route
              path='/dashboard/lessons'
              element={
                <>
                  <PageTitle title='Lessons' />
                  <LessonIndex />
                </>
            }
            />
          </Route>
          {/* END DASHBOARD ROUTES */}

          <Route
            path='/login'
            element={
              <>
                <PageTitle title='Login' />
                <SignIn />
              </>
          }
          />

          <Route
            path='/signup'
            element={
              <>
                <PageTitle title='Sign Up' />
                <SignUp />
              </>
          }
          />

          {/* END PERSONAL ROUTES */}
          <Route
            path='/profile'
            element={
              <>
                <PageTitle title='Profile | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <Profile />
              </>
          }
          />
          <Route
            path='/forms/form-elements'
            element={
              <>
                <PageTitle title='Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <FormElements />
              </>
          }
          />
          <Route
            path='/forms/form-layout'
            element={
              <>
                <PageTitle title='Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <FormLayout />
              </>
          }
          />
          <Route
            path='/tables'
            element={
              <>
                <PageTitle title='Tables | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <Tables />
              </>
          }
          />
          <Route
            path='/chart'
            element={
              <>
                <PageTitle title='Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <Chart />
              </>
          }
          />
          <Route
            path='/ui/alerts'
            element={
              <>
                <PageTitle title='Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <Alerts />
              </>
          }
          />
          <Route
            path='/ui/buttons'
            element={
              <>
                <PageTitle title='Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <Buttons />
              </>
          }
          />
          <Route
            path='/auth/signin'
            element={
              <>
                <PageTitle title='Signin | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <SignIn />
              </>
          }
          />
          <Route
            path='/auth/signup'
            element={
              <>
                <PageTitle title='Signup | TailAdmin - Tailwind CSS Admin Dashboard Template' />
                <SignUp />
              </>
          }
          />
        </Routes>
      </>
      )
}

export default App
