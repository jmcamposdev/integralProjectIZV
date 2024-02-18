import HeaderMain from '../../components/HeaderMain/HeaderMain'
import Hero from '../../components/Hero/Hero'
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection'
import Footer from '../../components/Footer/index'
import useColorMode from '../../hooks/useColorMode'

const Welcome = () => {
  const [colorMode] = useColorMode()
  return (
    <>
      <HeaderMain />
      <Hero />
      <AboutUsSection />
      <Footer colorMode={colorMode} />
    </>
  )
}

export default Welcome
