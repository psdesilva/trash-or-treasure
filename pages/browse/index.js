import {  useContext } from 'react'
import { FilterContext } from '../../components/NestedLayout'
import ItemList from '../../components/ItemList'
import Layout from '../../components/Layout'
import NestedLayout from '../../components/NestedLayout'

const Browse = () => {
    const filteredItems = useContext(FilterContext)

    return (
        <>
            <ItemList filteredItems={filteredItems}/>
        </>
    )
}

Browse.getLayout = function getLayout(page) {
    return (
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    )
  }

export default Browse
