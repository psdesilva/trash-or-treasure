import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import Modal from './Modal';
import { useUser } from '@auth0/nextjs-auth0';
import { MdSearch } from "@react-icons/all-files/md/MdSearch";
import navbarStyle from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'
import LoginPromptModal from './LoginPromptModal'

const Navbar = ({ dispatch }) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);
    const [search, setSearch] = useState('');
    const { user, error, isLoading } = useUser();

    function handleSearchSubmit (e) {
        e.preventDefault();
        dispatch({ type: 'search', payload: { searchTerm: search } })
        router.push('/browse')
    }

    function handleSearchChange (e) {
        setSearch(e.target.value)
    }

    useEffect(() => {
        dispatch({ type: 'search', payload: { searchTerm: search } })
    }, [search])

    useEffect(() => {
        if(showModal || showLoginPromptModal == true) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [showModal, showLoginPromptModal])

    return (
        <nav className={navbarStyle.navBar}>
            <div className={navbarStyle.navBarDiv}>
                <Link href="/">
                    <a className={navbarStyle.navBarAnchor}>
                        <Image 
                            src="/box-icon.svg"
                            height={45}
                            width={45}
                            className={navbarStyle.navBarImage}
                        />
                    </a>
                </Link>
                <form className={navbarStyle.searchContainer} onSubmit={handleSearchSubmit}>
                    <MdSearch className={navbarStyle.searchIcon}/>
                    <input type="text" name="searchbar" className={navbarStyle.search} value={search} onChange={handleSearchChange} placeholder="Search"/>
                </form>
            </div>
            <div className={navbarStyle.navBarDivLarge}>
                {user ? <Button onClick={() => setShowModal(true)} text={'+ Add Item'} navBar={true}/> : <Button onClick={() => setShowLoginPromptModal(true)} text={'+ Add Item'} navBar={true}/>}
                {/* <Button onClick={() => setShowModal(true)} text={'+ Add Item'} navBar={true}/> */}
                { user ?  (
                    <a href="/api/auth/logout" className={navbarStyle.navBarAnchor}>
                        <Image 
                            src={"/user-circle-solid.svg"}
                            height={30}
                            width={30}
                            className={navbarStyle.profileIcon}
                        />
                        <p className={navbarStyle.userText}>{user.name}</p>
                    </a>
                ) : (
                    <a href="/api/auth/login" className={navbarStyle.navBarAnchor}>
                        <Image 
                            src="/user-circle-solid.svg"
                            height={30}
                            width={30}
                            className={navbarStyle.profileIcon}
                        />
                        <p className={navbarStyle.userText}>Guest</p>
                    </a>
                )}
                
            </div>
            <LoginPromptModal showLoginPromptModal={showLoginPromptModal} onClose={() => setShowLoginPromptModal(false)}/>
            <Modal show={showModal} onClose={() => setShowModal(false)}/>
        </nav>
    )
}

export default Navbar
