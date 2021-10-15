import Button from "./Button"
import Image from 'next/image'
import itemAddedStyle from '../styles/ItemAdded.module.css'
import { useRouter } from 'next/router'

const ItemAdded = ({ setAddItemDone, handleClose, addedItem }) => {
    const router = useRouter();
    const returnToBrowse = (e) => {
        const path = router.pathname;
        if (!path.includes('browse')) {
            router.push('/browse')
        }
        handleClose(e);
    }

    return (
        <div className={itemAddedStyle.container}>
            <h1>Item Successfully Added!</h1>
            <div className={itemAddedStyle.itemCard}>
                <div className={itemAddedStyle.titleImage}>
                    <h2>{addedItem.name}</h2>
                    <div className={itemAddedStyle.imageContainer}>
                        <Image 
                            src={addedItem.img}
                            layout="fill"
                            objectFit="cover"
                            className={itemAddedStyle.image}
                        />
                    </div>
                </div>
                <div className={itemAddedStyle.separator}></div>
                <div className={itemAddedStyle.info}>
                    <p>Location: {addedItem.location}</p>
                    <p>{Object.entries(addedItem.contact)[0][0]}: {Object.entries(addedItem.contact)[0][1]}</p>
                    <p>Description: {addedItem.description}</p>
                    <p>{`${addedItem.used} - ${addedItem.broken}`}</p>
                </div>
            </div>
            <div className={itemAddedStyle.buttons}>
                <Button text={"Add New Item"} onClick={() => setAddItemDone(false)}/>
                <Button text={"Browse Treasures"} onClick={returnToBrowse}/>
            </div>
        </div>
    )
}

export default ItemAdded