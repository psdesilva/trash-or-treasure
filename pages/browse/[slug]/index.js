import Layout from '../../../components/Layout'
import NestedLayout from '../../../components/NestedLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import itemStyle from '../../../styles/Item.module.css'
import { useItems } from '../../../components/ItemContext'
import { FiArrowLeftCircle } from "@react-icons/all-files/fi/FiArrowLeftCircle";
import { MdDescription } from "@react-icons/all-files/md/MdDescription";
import { MdLocationOn } from "@react-icons/all-files/md/MdLocationOn";
import { MdPhoneIphone } from "@react-icons/all-files/md/MdPhoneIphone";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import useMediaQuery from '../../../hooks/MediaQuery'
import { useUser } from '@auth0/nextjs-auth0';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal'

const Item = ({ slug }) => {
    const isBreakPoint = useMediaQuery(799)
    const { getSingleItem, deleteItem } = useItems()
    const item = getSingleItem(slug)
    const router = useRouter()
    const { user, error, isLoading } = useUser();
    const [showDelete, setShowDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    function goBack (e) {
      e.preventDefault();
      router.push('/browse')
    }

    async function deleteCurrentItem (id) {
      await router.push('/browse');
      deleteItem(id);
    }

    function deleteConfirm (id) {
      setItemToDelete(id);
      setShowDelete(true);
    }

    return (
        <div className={itemStyle.container}>
            <div className={itemStyle.back}>
              <a href="#" onClick={goBack}><FiArrowLeftCircle /></a>
              {user ? user.sub === item.user ? <button onClick={() => deleteConfirm(item.id)}><MdDeleteForever /></button> : '' : ''}
            </div>
            <div className={itemStyle.itemDetails}>
            { isBreakPoint ? <div className={itemStyle.name}><h1>{item.name}</h1></div> : ''}
              <div className={itemStyle.imageContainer}>
                <Image 
                  src={item.img}
                  layout="fill"
                  objectFit="cover"
                  className={itemStyle.image}
                /> 
              </div>
              <div className={itemStyle.info}>
                { isBreakPoint ? '' : <div className={itemStyle.name}><h1>{item.name}</h1></div>}
                <div className={itemStyle.infoText}>
                  <div className={itemStyle.individualInfo}>
                    <div className={itemStyle.individualInfoIcon}>
                      <MdLocationOn />
                    </div>
                    <p><span className={itemStyle.bold}>Location:&#160;</span> {item.location}</p>
                  </div>
                  <div className={itemStyle.individualInfo}>
                    <div className={itemStyle.individualInfoIcon}>
                      <MdPhoneIphone />
                    </div>
                    <p><span className={itemStyle.bold}>{Object.entries(item.contact)[0][0]}:&#160;</span> {Object.entries(item.contact)[0][1]}</p>
                  </div>
                  <div className={itemStyle.individualInfo}>
                    <div className={itemStyle.individualInfoIcon}>
                      <MdDescription />
                    </div>
                    <p><span className={itemStyle.bold}>Description:&#160;</span> {item.description}</p>
                  </div>
                  <div className={itemStyle.condition}>
                    <p>{item.used}</p>
                    <p>{item.broken}</p>
                  </div>
                </div>
              </div>
            </div>
            <DeleteConfirmationModal setItemToDelete={setItemToDelete} itemToDelete={itemToDelete} showDelete={showDelete} onClose={() => setShowDelete(false)}/>
        </div>
    )
}

export const getServerSideProps = async (context) => {
  const slug = await context.params.slug
  return {
    props: { slug }
  }
}

Item.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export default Item
