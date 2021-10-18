import { useState } from 'react'
import Modal from './Modal';
import AddItem from './AddItem'
import Link from 'next/link'
import LandingPageStyles from '../styles/LandingPage.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import Button from './Button'

const LandingPageSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const { user, error, isLoading } = useUser();

    return (
        <div className={LandingPageStyles.landingPageSidebar}>
            <div className={LandingPageStyles.landingPageSidebarContent}>
                <p>What would you like to do today?</p>
                <Button text={'List Your Trash'} onClick={() => setShowModal(true)}/>
                <Link href="/browse"><a><Button text={'Browse Treasures'}/></a></Link>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <AddItem />
                </Modal>
                <button onClick={() => console.log(user)}>User</button>
                {user ? <p className={LandingPageStyles.loginText}>Logged in as {user.name} <Link href="/api/auth/logout"><a  className={LandingPageStyles.login}>Logout</a></Link> </p> :<Link href="/api/auth/login"><a className={LandingPageStyles.login}>Login/Register</a></Link> }
            </div>

        </div>
    )
}

export default LandingPageSidebar
