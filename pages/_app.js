import Layout from '../components/Layout'
import { ItemContextProvider } from '../components/ItemContext'
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <UserProvider>
      <ItemContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </ItemContextProvider>
    </UserProvider>
    )
}

export default MyApp
