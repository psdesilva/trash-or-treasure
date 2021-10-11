import {  useContext } from 'react'
import { FilterContext } from '../../components/NestedLayout'
import ItemList from '../../components/ItemList'
import Layout from '../../components/Layout'
import NestedLayout from '../../components/NestedLayout'
import browseStyle from '../../styles/Browse.module.css'

const Browse = () => {
    const filteredItems = useContext(FilterContext)

    return (
        <>
          <div className={browseStyle.items}>
            <ItemList filteredItems={filteredItems}/>
          </div>
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
