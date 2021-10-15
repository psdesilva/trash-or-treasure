import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import Modal from '../Modal';
import { BiChevronDown } from "@react-icons/all-files/bi/BiChevronDown";
import { MdSearch } from "@react-icons/all-files/md/MdSearch";
import navbarStyle from '../../styles/Mobile/MobileNavbar.module.css'
import { useRouter } from 'next/router'

const MobileNavbar = ({ dispatch, setShowFilters, showFilters }) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [searchBarView, setSearchBarView] = useState(false);

    function handleSearchSubmit (e) {
        e.preventDefault();
        setSearchBarView(false);
        setShowFilters(false);
        dispatch({ type: 'search', payload: { searchTerm: search } })
        router.push('/browse')
    }

    function handleSearchChange (e) {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if(showModal == true) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"
        }
    }, [showModal])

    useEffect(() => {
        dispatch({ type: 'search', payload: { searchTerm: search } })
    }, [search])

    return (
        <nav className={navbarStyle.navBar}>
            <div className={navbarStyle.navBarDivSmall}>
                <Link href="/">
                    <a className={navbarStyle.navBarAnchor}>
                        <Image 
                            src="/box-icon.svg"
                            height={40}
                            width={40}
                            className={navbarStyle.navBarImage}
                        />
                    </a>
                </Link>
                <button onClick={() => setShowFilters(!showFilters)}>Filter <BiChevronDown className={`${navbarStyle.chevron} ${ showFilters ? `${navbarStyle.rotated}` : `` }`}/></button>
            </div>
            {/* <div>
                <Button onClick={() => setShowModal(true)} text={'+ Add Item'} navBar={true}/>
            </div> */}
            <div className={navbarStyle.navBarDivLarge}>
                <form className={navbarStyle.searchContainer} onSubmit={handleSearchSubmit}>
                    <label htmlFor="searchbar" onClick={() => setSearchBarView(!searchBarView) }><MdSearch className={navbarStyle.searchIcon}/></label>
                    <input type="text" name="searchbar" id="searchbar" className={searchBarView ? `` : `${navbarStyle.hidden}`} value={search} onChange={handleSearchChange} placeholder="Search"/>
                    <div onClick={() => setSearchBarView(!searchBarView)} className={`${navbarStyle.overlay} ${ searchBarView ? `` : `${navbarStyle.hidden}` }`}></div>
                </form>
                <Button onClick={() => setShowModal(true)} text={'+ Item'} navBar={true}/>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}/>
        </nav>
    )
}

export default MobileNavbar
