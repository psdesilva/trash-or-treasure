import {  useContext } from 'react'
import { FilterContext } from '../../components/NestedLayout'
import ItemList from '../../components/ItemList'
import Layout from '../../components/Layout'
import NestedLayout from '../../components/NestedLayout'
import browseStyle from '../../styles/Browse.module.css'
import { useUser } from '@auth0/nextjs-auth0';


const Browse = () => {
  const { user, error, isLoading } = useUser();
    const filteredItems = useContext(FilterContext)

    if (isLoading) {
      return (
        <h1>loading!</h1>
      )
    }

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
