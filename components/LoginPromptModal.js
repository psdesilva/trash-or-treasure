import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdClose } from "@react-icons/all-files/md/MdClose";
import modalStyle from '../styles/LoginPromptModal.module.css'

const LoginPromptModal = ({ showLoginPromptModal, onClose }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect (() => {
        setIsBrowser(true);
    }, [])

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = showLoginPromptModal ? (
        <div className={modalStyle.overlay}>
            <div className={modalStyle.modal}>
                <div className={modalStyle.header}>
                    <a href="#" onClick={handleClose}><MdClose className={modalStyle.closeBtn}/></a>
                </div>
                <div className={modalStyle.body}>
                    <p>Please Log In to Add Items</p>
                    <div className={modalStyle.buttons}>
                        <button className={modalStyle.cancelBtn} onClick={handleClose}>Cancel</button>
                        <a className={modalStyle.loginBtn} href="/api/auth/login">Login/Register</a>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    if(isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        )
    } else {
        return null;
    }
}

export default LoginPromptModal
