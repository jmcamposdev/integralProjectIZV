import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../../layout/DefaultLayout'
import ProfessorList from '../../../components/Professor/ProfessorList'

const ProfessorIndex = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Professors' />
      <ProfessorList />
    </DefaultLayout>
  )
}

export default ProfessorIndex
