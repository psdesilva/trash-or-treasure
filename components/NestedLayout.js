import { createContext, useState, useEffect, useReducer } from 'react'
import { useItems } from './ItemContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import browseStyle from '../styles/Browse.module.css'

export const FilterContext = createContext();

const NestedLayout = ({ children }) => {
    const { items } = useItems();

    const [currentItems, setCurrentItems] = useState(items)
    const [searchTerm, setSearchTerm] = useState('')

    const [filters, setFilters] = useState(
        {used: { Unused: true, UsedLessThanOneMonth: true, UsedFewMonths: true, UsedMoreThanOneYear: true },
        broken: { Unbroken: true, PartiallyBroken: true, CompletelyBroken: true },
        type: { Electronics: true, Books: true, CDs: true, Household: true, Furniture: true, Other: true },
    });
     
    const [filteredItems, setFilteredItems] = useState(currentItems);

    function reducer (searchFilter, action) {
        switch (action.type) {
            case 'search':
                if (action.payload.searchTerm === ('')) {
                    // setSearchTerm('')
                    searchFilter = currentItems;
                } else {
                    // setSearchTerm(action.payload.searchTerm.toLowerCase());
                    searchFilter = currentItems.filter(item => item.name.toLowerCase().includes(action.payload.searchTerm.toLowerCase()))
                }
                return searchFilter;
            default:
                searchFilter = currentItems;
                return searchFilter    
        }
    }
  
    const [searchFilter, dispatch] = useReducer(reducer, currentItems);
    
    function filterReducer (filterFilter, action) {
        switch (action.type) {
            case 'filter':
                filterFilter = currentItems.filter(item => getFilteredItems(item))
                return filterFilter;
            default: 
                filterFilter = currentItems;
                return filterFilter;
        }
    }

    const [filterFilter, dispatchFilter] = useReducer(filterReducer, currentItems);

    useEffect (() => {
        dispatchFilter({type: 'filter', payload: {filters: filters}})
    }, [filters])

    useEffect (() => {
        setFilteredItems( searchFilter.filter(element => filterFilter.includes(element)))
    },[searchFilter, filterFilter])

    useEffect (()=> {
        setCurrentItems(items)
        dispatchFilter({type: 'filter', payload: {filters: filters}})
        dispatch({ type: 'search', payload: { searchTerm: ''} })
    }, [items])

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
        <FilterContext.Provider value={filteredItems}>
            <main className={browseStyle.main}>
                <Navbar dispatch={dispatch}/>
                <div className={browseStyle.browse}>
                    <Sidebar filters={filters} setFilters={setFilters}/>
                        {children}
                </div> 
            </main>
        </FilterContext.Provider>
    )
}

export default NestedLayout
