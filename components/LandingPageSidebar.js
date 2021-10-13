import { useState } from 'react'
import Modal from './Modal';
import AddItem from './AddItem'
import Link from 'next/link'
import LandingPageStyles from '../styles/LandingPage.module.css'
import Button from './Button'
import Image from 'next/image'

const LandingPageSidebar = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={LandingPageStyles.landingPageSidebar}>
            {/* <Image 
                src="/box-icon.svg"
                height={200}
                width={200}
                className={LandingPageStyles.boxImage}
            /> */}
            <div className={LandingPageStyles.landingPageSidebarContent}>
                <p>What would you like to do today?</p>
                <Button text={'List Your Trash'} onClick={() => setShowModal(true)}/>
                <Link href="/browse"><a><Button text={'Browse Treasures'}/></a></Link>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <AddItem />
                </Modal>
                <a>Login/Register</a>
            </div>

        </div>
    )
}

export default LandingPageSidebar
