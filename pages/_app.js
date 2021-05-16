import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'next-auth/client';
import Head from 'next/head'
import Navbar from '../components/Navbar';

const theme = extendTheme({
  config: {
    useSystemColorMode: true
  }
});

function MyApp(props) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>Mail-em</title>
      </Head>
      <Provider session={props.pageProps.session}>
        <Navbar {...props}/>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
