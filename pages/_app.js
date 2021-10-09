import Layout from '../components/Layout'
import { ItemContextProvider } from '../components/ItemContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ItemContextProvider>
          {getLayout(<Component {...pageProps} />)}
    </ItemContextProvider>
    )
}

export default MyApp
