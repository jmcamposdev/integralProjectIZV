import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import FormationList from '../../../components/Tables/FormationList'
import DefaultLayout from '../../../layout/DefaultLayout'

const FormationIndex = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Formations' />
      <FormationList />
    </DefaultLayout>
  )
}

export default FormationIndex
