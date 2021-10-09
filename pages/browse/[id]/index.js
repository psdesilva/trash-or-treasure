import Layout from '../../../components/Layout'
import NestedLayout from '../../../components/NestedLayout'

const Item = () => {
    return (
        <div>
            This is an item
        </div>
    )
}

Item.getLayout = function getLayout(page) {
    return (
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    )
  }

export default Item
