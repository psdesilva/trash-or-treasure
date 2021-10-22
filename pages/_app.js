import Layout from '../components/Layout'
import { ItemContextProvider } from '../components/ItemContext'
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css'
import SimpleReactLightbox from 'simple-react-lightbox'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <UserProvider>
      <ItemContextProvider>
        <SimpleReactLightbox>
          {getLayout(<Component {...pageProps} />)}
        </SimpleReactLightbox>
      </ItemContextProvider>
    </UserProvider>
    )
}

export default MyApp
