import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../../layout/DefaultLayout'
import ProfessorTable from '../../../components/Tables/ProfessorTable/ProfessorTable'

const ProfessorIndex = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Professors' />
      <ProfessorTable />
    </DefaultLayout>
  )
}

export default ProfessorIndex
