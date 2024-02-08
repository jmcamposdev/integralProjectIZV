import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import ModuleList from '../../../components/Tables/ModuleList'
import DefaultLayout from '../../../layout/DefaultLayout'

const ModuleIndex = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Modules' />
      <ModuleList />
    </DefaultLayout>
  )
}

export default ModuleIndex
