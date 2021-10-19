import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0';
import Modal from '../Modal';
import AddItem from '../AddItem'
import Button from '../Button'
import LandingPageStyles from "../../styles/Mobile/MobileLandingPage.module.css"

const MobileLandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();

    return (
        <div className={LandingPageStyles.landingPageDisplay}>
            <div className={LandingPageStyles.landingPageDisplayText}>
                <h1 className={LandingPageStyles.heading}>TRASH OR TREASURE</h1>
                <p>{`Moving? Spring cleaning? Just got too much stuff? Don't throw it away, someone out there might be looking for it!`}</p>
                <p>{`One man's trash is another man's treasure.`}</p>
            </div>
            <div className={LandingPageStyles.buttons}>
                <Button text={'List Your Trash'} onClick={() => setShowModal(true)}/>
                <Link href="/browse"><a><Button text={'Browse Treasures'}/></a></Link>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <AddItem />
                </Modal>
                {user ? <p className={LandingPageStyles.loginText}>Logged in as {user.nickname} <a href="/api/auth/logout" className={LandingPageStyles.login}>Logout</a> </p> : <a href="/api/auth/login" className={LandingPageStyles.login}>Login/Register</a>}
            </div>
            <div className={LandingPageStyles.overlay}></div>
        </div>
    )
}

export default MobileLandingPage