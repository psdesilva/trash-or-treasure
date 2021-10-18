import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyle from '../styles/Modal.module.css'
import { MdClose } from "@react-icons/all-files/md/MdClose";
import AddItem from './AddItem';
import ItemAdded from './ItemAdded';
import { useUser } from '@auth0/nextjs-auth0';

const Modal = ({ show, onClose, children }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [addItemDone, setAddItemDone] = useState(false);
    const [addedItem, setAddedItem] = useState({});
    const { user, error, isLoading } = useUser();

    useEffect (() => {
        setIsBrowser(true);
    }, [])

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
        setAddItemDone(false)
    };

    const modalContent = show ? (
        <div className={modalStyle.overlay}>
            <div className={modalStyle.modal}>
                <div className={modalStyle.header}>
                    <a href="#" onClick={handleClose}><MdClose className={modalStyle.closeBtn}/></a>
                </div>
                <div className={modalStyle.body}>
                    {user ? addItemDone ? <ItemAdded addedItem={addedItem} setAddItemDone={setAddItemDone} handleClose={handleClose}/> : <AddItem setAddItemDone={setAddItemDone} setAddedItem={setAddedItem}/> : <div className={modalStyle.loginContainer}><p>Please log in to add items</p><a href="/api/auth/login" >Login/Register</a></div>}
                    {/* {addItemDone ? <ItemAdded addedItem={addedItem} setAddItemDone={setAddItemDone} handleClose={handleClose}/> : <AddItem setAddItemDone={setAddItemDone} setAddedItem={setAddedItem}/>}  */}
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

export default Modal
