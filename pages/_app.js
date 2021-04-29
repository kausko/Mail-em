import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'next-auth/client';

const theme = extendTheme({
  config: {
    useSystemColorMode: true
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
