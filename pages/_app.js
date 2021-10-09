import Layout from '../components/Layout'
import { ItemContext } from '../components/ItemContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
      getLayout(<Component {...pageProps} />)
    )
}

export default MyApp
