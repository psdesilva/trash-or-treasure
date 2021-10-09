import { useState, useEffect, useReducer } from 'react'
import { useItems } from '../../components/ItemContext'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ItemList from '../../components/ItemList'
import browseStyle from '../../styles/Browse.module.css'
// import Layout from '../../components/Layout'
// import NestedLayout from '../../components/NestedLayout'

const Browse = () => {
    const items = useItems();
    
    const [filters, setFilters] = useState(
        {used: { Unused: true, UsedLessThanOneMonth: true, UsedFewMonths: true, UsedMoreThanOneYear: true },
        broken: { Unbroken: true, PartiallyBroken: true, CompletelyBroken: true },
        type: { Electronics: true, Books: true, CDs: true, Household: true, Furniture: true, Other: true },
    });
     
    const [filteredItems, setFilteredItems] = useState(items);

    function reducer (searchFilter, action) {
        switch (action.type) {
            case 'search':
                if (action.payload.searchTerm === ('')) {
                    searchFilter = items;
                } else {
                    searchFilter = items.filter(item => item.name.toLowerCase().includes(action.payload.searchTerm.toLowerCase()))
                }
                return searchFilter;
            default:
                searchFilter = items;
                return searchFilter    
        }
    }
  
    const [searchFilter, dispatch] = useReducer(reducer, items);
    
    function filterReducer (filterFilter, action) {
        switch (action.type) {
            case 'filter':
                filterFilter = items.filter(item => getFilteredItems(item))
                return filterFilter;
            default: 
                filterFilter = items;
                return filterFilter;
        }
    }

    const [filterFilter, dispatchFilter] = useReducer(filterReducer, items);

    useEffect (() => {
        dispatchFilter({type: 'filter', payload: {filters: filters}})
    }, [filters])

    useEffect (() => {
        setFilteredItems( searchFilter.filter(element => filterFilter.includes(element)))
    },[searchFilter, filterFilter])

    function getFilteredItems(item) {
        const noWhiteSpaces = item.used.replace(/\s+/g, '');
        const itemProperties = [item.type, noWhiteSpaces, item.broken]
      
        const allKeys = Object.entries(filters).map(category => Object.keys(category[1]))
        const allKeysFlat = allKeys.flat();
        const allEntries = Object.entries(filters).map(category => Object.entries(category[1]))
        const allEntriesFlat = allEntries.flat()
        const finalObject = Object.fromEntries(allEntriesFlat)
        const filtered = allKeysFlat.filter(key => finalObject[key]);
      
        const found = itemProperties.every(r=> filtered.includes(r))

        return found;
    }

    return (
        <main className={browseStyle.main}>
            <Navbar dispatch={dispatch}/>
            <div className={browseStyle.browse}>
                <Sidebar filters={filters} setFilters={setFilters}/>
                <div className={browseStyle.items}>
                    <ItemList filteredItems={filteredItems} filters={filters}/>
                </div>
            </div>
        </main>
    )
}

// Browse.getLayout = function getLayout(page) {
//     return (
//       <Layout>
//         <NestedLayout>{page}</NestedLayout>
//       </Layout>
//     )
//   }

export default Browse
