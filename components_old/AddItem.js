import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0';
import { useItems } from './ItemContext'
import Button from './Button'
import { BsUpload } from "@react-icons/all-files/bs/BsUpload";
import addItemStyle from '../styles/AddItem.module.css'

const AddItem = ({ setAddItemDone, setAddedItem }) => {
    const id = uuidv4();
    const { addItem, items } = useItems();
    const [itemImage, setItemImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false)
    const [imageText, setImageText] = useState("Click to Upload Image")
    const { user } = useUser();

    function uploadImage(e) {
        setLoadingImage(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "qlshxsot")
        formData.append("folder", "/TrashOrTreasure/itemImages")

        fetch('https://api.cloudinary.com/v1_1/prnkdslv/image/upload', {
            method: 'POST',
            body: formData,
        })
            .then (response => {
                if(response.status !== 200) {
                    setItemImage(null);
                    setImageText("Please Upload Valid Image!")
                    setLoadingImage(false);
                    throw Error (`${response.status}: ${response.statusText}`)
                } else {
                    return response.json()
                }
            })
            .then (data => {
                const img = data.secure_url;
                setImageText("Click to Change Image")
                setItemImage(img);
                setLoadingImage(false);
            })
            .catch (err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            user: user.sub,
            id: id,
            name: itemName.value,
            img: itemImage,
            location: itemLocation.value,
            type: itemType.value,
            contact: { [contactType.value]: contact.value },
            used: used.value,
            broken: broken.value,
            description: description.value || 'N/A'
        }
        if (itemImage !== null) {
            addItem(newItem);
            setAddedItem(newItem);
            setAddItemDone(true);
        }
        console.log(items);
    }
 
    return (
        <form action="" id="addItemForm" onSubmit={handleSubmit} className={addItemStyle.form}>
            <div className={addItemStyle.container}>
                <div className={addItemStyle.blockOne}>
                    <div className={addItemStyle.blockOneSmall}>
                        <div className={addItemStyle.imageUploadContainer} style={{backgroundImage: itemImage ? `url(${itemImage})`: '', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat:'no-repeat'}}>
                            <div className={`${addItemStyle.spinner} ${loadingImage ? '': addItemStyle.hide}`}></div>
                            <input type="file" accept="image/*" name="itemImage" id="itemImage" onChange={uploadImage} required/>
                            <label htmlFor="itemImage" className={`${itemImage ? addItemStyle.overlay: ''}`}><h5><BsUpload /></h5><p>{imageText}</p></label>
                        </div>
                    </div>
                    <div className={addItemStyle.blockOneLarge}>
                        <div className={addItemStyle.formElement}>
                            <label htmlFor="itemName">Name of Item:</label>
                            <input type="text" name="itemName" id="itemName" maxLength="50" className={addItemStyle.formInput} required/>
                        </div>
                        <div className={addItemStyle.formElement}>
                            <label htmlFor="itemLocation">Location:</label>
                            <input type="text" name="itemLocation" id="itemLocation" maxLength="50" className={addItemStyle.formInput} required/>
                        </div>
                        <div className={addItemStyle.formElement}>
                            <label htmlFor="itemType">Type:</label>
                            <select id="itemType" className={addItemStyle.formInput}>
                                <option value="Electronics">Electronics</option>
                                <option value="Books">Books</option>
                                <option value="CDs">CDs/DVDs</option>
                                <option value="Household">Household</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={addItemStyle.blockOne}>
                    <div className={addItemStyle.blockOneLarge}>
                        <div className={addItemStyle.formElement}>
                            <label htmlFor="contact">Contact:</label>
                            <div className={addItemStyle.contactElement}>
                                <select id="contactType" className={addItemStyle.formInput}>
                                    <option value="Phone">Call/Text</option>
                                    <option value="Email">Email</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Twitter">Twitter</option>
                                </select>
                                <input type="text" name="contact" id="contact" maxLength="50" className={addItemStyle.formInput} required/>
                            </div>
                        </div>
                        <div className={`${addItemStyle.formElement} ${addItemStyle.textAreaContainer}`}>
                            <label htmlFor="description">Description:</label>
                            <textarea name="description" id="description" maxLength="200" className={`${addItemStyle.formInput} ${addItemStyle.textArea}`}/>
                        </div>
                    </div>
                    <div className={addItemStyle.blockOneSmall}>
                        <div className={addItemStyle.formElement}>
                            <label htmlFor="used">Used/Unused?</label>
                            <select id="used" className={addItemStyle.formInput}>
                                <option value="Unused">Unused</option>
                                <option value="Used Less Than One Month">{`Used < 1 Month`}</option>
                                <option value="Used Few Months">Used Few Months</option>
                                <option value="Used More Than One Year">{`Used > 1 Year`}</option>
                            </select>
                        </div>
                        <div className={addItemStyle.formElement}>
                            <label htmlFor="broken">Broken/Unbroken?</label>
                            <select id="broken" className={addItemStyle.formInput}>
                                <option value="Unbroken">Unbroken</option>
                                <option value="Partially Broken">Partially Broken</option>
                                <option value="Completely Broken">Completely Broken</option>
                            </select>
                        </div>
                        <Button className={addItemStyle.btn} text={"Submit"} type="submit"/>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddItem