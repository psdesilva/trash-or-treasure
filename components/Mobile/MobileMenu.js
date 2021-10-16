import navbarStyle from '../../styles/Mobile/MobileNavbar.module.css'
import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { FaUser } from "@react-icons/all-files/fa/FaUser";

const MobileMenu = ({ setOpenMenu, openMenu, openModal }) => {
    return (
        <div onClick={() => setOpenMenu(!openMenu)} className={`${navbarStyle.menuOverlay} ${ openMenu ? `` : `${navbarStyle.hidden}` }`}>
            <div className={navbarStyle.menu}>
                <div className={`${navbarStyle.menuItem} ${navbarStyle.add}`} onClick={openModal}>
                    <MdAdd className={navbarStyle.subMenuIcon}/>
                    <p>Add Items</p>
                </div>
                <div className={navbarStyle.menuItem}>
                    <FaUser className={navbarStyle.subMenuIcon}/>
                    <p>Log-in / Register</p>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu
