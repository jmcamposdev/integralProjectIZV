import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import FormationTable from '../../../components/Tables/FormationTable/FormationTable'
import DefaultLayout from '../../../layout/DefaultLayout'

const FormationIndex = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Formations' />
      <FormationTable />
    </DefaultLayout>
  )
}

export default FormationIndex
