import HeaderMain from '../../components/HeaderMain/HeaderMain'
import Hero from '../../components/Hero/Hero'
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection'
import Footer from '../../components/Footer/index'
import Team from '../../components/Team'
import LessonSection from '../../components/Lesson/LessonSection'
import Modal from '../../components/Modals/Modal.jsx'

const Welcome = () => {
  return (
    <>
      <HeaderMain />
      <Hero />

      <AboutUsSection />
      <Team />
      <LessonSection />
      <Modal title='hola' message='mensaje mensaje mensaje mensaje mensaje mensaje No me convence la verdad' />
      <Footer />
    </>
  )
}

export default Welcome
