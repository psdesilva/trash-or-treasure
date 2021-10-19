import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0';
import Modal from './Modal';
import AddItem from './AddItem'
import Button from './Button'
import LandingPageStyles from '../styles/LandingPage.module.css'

const LandingPageSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();

    return (
        <div className={LandingPageStyles.landingPageSidebar}>
            <div className={LandingPageStyles.landingPageSidebarContent}>
                <p>What would you like to do today?</p>
                <Button text={'List Your Trash'} onClick={() => setShowModal(true)}/>
                <Link href="/browse"><a><Button text={'Browse Treasures'}/></a></Link>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <AddItem />
                </Modal>
                {user ? <p className={LandingPageStyles.loginText}>Logged in as {user.name} <a href="/api/auth/logout" className={LandingPageStyles.login}>Logout</a> </p> : <a href="/api/auth/login" className={LandingPageStyles.login}>Login/Register</a>}
            </div>

        </div>
    )
}

export default LandingPageSidebar
