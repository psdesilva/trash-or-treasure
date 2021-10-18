import { createContext, useContext, useState } from 'react';

const ItemContext = createContext();

export function useItems() {
    return useContext(ItemContext);
}

export function ItemContextProvider ({ children }) {
    const itemContext = useItemContext();

    return (
        <ItemContext.Provider value={itemContext}>
            {children}
        </ItemContext.Provider>
    )
}

function useItemContext () {
    const [items, setItems] = useState([
        {user: 0, id: 1, name: 'Apple Earphones', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633503659/TrashOrTreasure/ItemImages/image0_bsrlx6.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456'},
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."}, 
        {user: 0, id: 2, name: 'Xbox Controller', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633503650/TrashOrTreasure/ItemImages/IMG_5159_pycavk.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."},
        {user: 0, id: 3, name: 'Standing Fan', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633504706/TrashOrTreasure/ItemImages/image0_amj6ro.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."},
        {user: 0, id: 4, name: 'Apple Earphones', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633503659/TrashOrTreasure/ItemImages/image0_bsrlx6.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."}, 
        {user: 0, id: 5, name: 'Xbox Controller', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633503650/TrashOrTreasure/ItemImages/IMG_5159_pycavk.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."},
        {user: 0, id: 6, name: 'Standing Fan', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633504706/TrashOrTreasure/ItemImages/image0_amj6ro.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."},
        {user: 0, id: 7, name: 'Double Bed with Queen sized mattress and 3 pillows', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633503659/TrashOrTreasure/ItemImages/image0_bsrlx6.jpg', location: 'Pitakotte',
        type: 'Furniture', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."}, 
        {user: 0, id: 8, name: 'Xbox Controller', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633503650/TrashOrTreasure/ItemImages/IMG_5159_pycavk.jpg', location: 'Pitakotte',
        type: 'Furniture', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."},
        {user: 0, id: 9, name: 'Standing Fan', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633504706/TrashOrTreasure/ItemImages/image0_amj6ro.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."},
        {user: 0, id: 10, name: 'Apple Earphones', img:'https://res.cloudinary.com/prnkdslv/image/upload/v1633503659/TrashOrTreasure/ItemImages/image0_bsrlx6.jpg', location: 'Pitakotte',
        type: 'Electronics', contact: { Phone: '0777123456' },
        used: 'Used More Than One Year', broken: 'Unbroken', description: "These are apple earphones with a lightning connector. Well used. Don't need them as I don't use an iPhone anymore."}, 
    ])

    function getSingleItem (id) {
        return items.find(obj => obj.id == id)
    }

    function addItem (itemObject) {
        setItems([...items, itemObject]);
        console.log('item adde')
    }

    function deleteItem (id) {
        setItems(items.filter(item => item.id !== id ))
    }

    return {
        items,
        getSingleItem,
        deleteItem,
        addItem
    }
}