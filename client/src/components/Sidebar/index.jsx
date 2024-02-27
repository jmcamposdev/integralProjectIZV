import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import SidebarLinkGroup from './SidebarLinkGroup'
import LogoWhite from '../../images/logo/logo-zawee-white.svg'
import LogoDark from '../../images/logo/logo-zawee-dark.svg'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const { pathname } = location

  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )
  const navigate = useNavigate()
  const signOut = useSignOut()
  const handleSignOut = () => {
    signOut()
    navigate('/login')
  }

  // close on click handleSignOut
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      ) { return }
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <>
      <div className='flex justify-start items-center w-72.5 h-[80px] fixed left-0 top-0 bg-white dark:bg-boxdark z-50 px-4 py-4 md:px-6 2xl:px-11 gap-2 2xsm:gap-4'>
        <a href='/' className='dark:hidden'>
          <img className='h-[42px]  mr-3 ' alt='Logo of our webpage' src={LogoWhite} />
        </a>
        <a href='/' className='dark:block hidden'>
          <img className='h-[42px]  mr-3 ' alt='Logo of our webpage' src={LogoDark} />
        </a>

      </div>
      <aside
        style={{ height: 'calc(100dvh - 80px)', marginTop: '80px' }}
        ref={sidebar}
        className={`absolute left-0 top-0 z-9999 flex h-screen w-[100dvw] sm:w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}

        {/* <!-- SIDEBAR HEADER --> */}

        <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
          {/* <!-- Sidebar Menu --> */}
          <nav className='mt-5 py-4 px-4 lg:mt-9 lg:px-6'>
            {/* <!-- Menu Group --> */}
            <div>
              <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark3'>
                MENU
              </h3>

              <ul className='mb-6 flex flex-col gap-1.5'>

                {/* <!-- Menu Item Dashboard --> */}
                <li>
                  <NavLink
                    to='/dashboard'
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-gray dark:bg-meta-4 text-bodydark3'
                  }`}
                  >
                    <svg
                      className='fill-current'
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z'
                        fill=''
                      />
                      <path
                        d='M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z'
                        fill=''
                      />
                      <path
                        d='M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z'
                        fill=''
                      />
                      <path
                        d='M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z'
                        fill=''
                      />
                    </svg>
                    Dashboard
                  </NavLink>
                </li>
                {/* <!-- Menu Item Dashboard --> */}

                {/* <!-- Menu Item Professor --> */}
                <li>
                  <NavLink
                    to='/dashboard/professors'
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                    pathname.includes('professors') &&
                    'bg-gray dark:bg-meta-4 text-bodydark3'
                  }`}
                  >
                    <i className='icon-[lucide--user]' style={{ fontSize: '18px' }} />
                    Professor
                  </NavLink>
                </li>
                {/* <!-- Menu Item Professor --> */}

                {/* <!-- Menu Item Formation --> */}
                <li>
                  <NavLink
                    to='/dashboard/formations'
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                    pathname.includes('formations') &&
                    'bg-gray dark:bg-meta-4 text-bodydark3'
                  }`}
                  >
                    <i className='icon-[cil--education]' style={{ fontSize: '18px' }} />
                    Formation
                  </NavLink>
                </li>
                {/* <!-- Menu Item Formation --> */}

                {/* <!-- Menu Item Module --> */}
                <li>
                  <NavLink
                    to='/dashboard/modules'
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                    pathname.includes('modules') &&
                    'bg-gray dark:bg-meta-4 text-bodydark3'
                  }`}
                  >
                    <i className='icon-[heroicons--book-open]' style={{ fontSize: '18px' }} />
                    Modules
                  </NavLink>
                </li>
                {/* <!-- Menu Item Module --> */}

                {/* <!-- Menu Item Module --> */}
                <li>
                  <NavLink
                    to='/dashboard/groups'
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                    pathname.includes('groups') &&
                    'bg-gray dark:bg-meta-4 text-bodydark3'
                  }`}
                  >
                    <i className='icon-[tabler--users-group]' style={{ fontSize: '18px' }} />
                    Groups
                  </NavLink>
                </li>
                {/* <!-- Menu Item Module --> */}

                {/* <!-- Menu Item Lesson --> */}
                <li>
                  <NavLink
                    to='/dashboard/lessons'
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                    pathname.includes('lessons') &&
                    'bg-gray dark:bg-meta-4 text-bodydark3'
                  }`}
                  >
                    <i className='icon-[octicon--tasklist-24]' style={{ fontSize: '18px' }} />
                    Lessons
                  </NavLink>
                </li>
                {/* <!-- Menu Item Lesson --> */}

              </ul>
            </div>

            {/* <!-- Others Group --> */}
            <div>
              <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark3'>
                SETTINGS
              </h3>

              <ul className='mb-6 flex flex-col gap-1.5'>
                {/* <!-- Menu Item Profile --> */}
                <li>
                  <NavLink
                    to='/profile'
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-gray dark:bg-meta-4 text-bodydark3'
                  }`}
                  >
                    <svg
                      className='fill-current'
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z'
                        fill=''
                      />
                      <path
                        d='M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z'
                        fill=''
                      />
                    </svg>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4'
                    onClick={handleSignOut}
                  >
                    <svg
                      className='fill-current translate-x-[-5px]'
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z'
                        fill=''
                      />
                      <path
                        d='M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z'
                        fill=''
                      />
                    </svg>
                    Log Out
                  </NavLink>
                </li>
                {/* <!-- Menu Item Profile --> */}

                {/* <!-- Menu Item Auth Pages --> */}

                {/* <!-- Menu Item Auth Pages --> */}
              </ul>
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
