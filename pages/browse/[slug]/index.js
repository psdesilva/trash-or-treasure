import Layout from '../../../components/Layout'
import NestedLayout from '../../../components/NestedLayout'
import Link from 'next/link'
import Image from 'next/image'
import itemStyle from '../../../styles/Item.module.css'
import { useItems } from '../../../components/ItemContext'
import { FiArrowLeftCircle } from "@react-icons/all-files/fi/FiArrowLeftCircle";
import { MdDescription } from "@react-icons/all-files/md/MdDescription";
import { MdLocationOn } from "@react-icons/all-files/md/MdLocationOn";
import { MdPhoneIphone } from "@react-icons/all-files/md/MdPhoneIphone";

const Item = ({ slug }) => {
    const { getSingleItem } = useItems();
    const item = getSingleItem(slug);

    return (
        <div className={itemStyle.container}>
            <div className={itemStyle.back}>
              <Link href="/browse"><a><FiArrowLeftCircle /></a></Link>
            </div>
            <div className={itemStyle.itemDetails}>
              <div className={itemStyle.imageContainer}>
                <Image 
                  src={item.img}
                  layout="fill"
                  objectFit="cover"
                  className={itemStyle.image}
                /> 
              </div>
              <div className={itemStyle.info}>
                <div className={itemStyle.name}>
                  <h1>{item.name}</h1>
                </div>
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
