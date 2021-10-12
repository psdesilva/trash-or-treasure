import Layout from '../../../components/Layout'
import NestedLayout from '../../../components/NestedLayout'
import Link from 'next/link'
import Image from 'next/image'
import itemStyle from '../../../styles/Item.module.css'
import { useItems } from '../../../components/ItemContext'
import { FiArrowLeftCircle } from "@react-icons/all-files/fi/FiArrowLeftCircle";

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
                  <p>Location: {item.location}</p>
                  <p>{Object.entries(item.contact)[0][0]}: {Object.entries(item.contact)[0][1]}</p>
                  <p>{item.description}</p>
                  <p>{`${item.used} - ${item.broken}`}</p>
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
