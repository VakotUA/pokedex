import '@styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@modules/store/store'
import Main from '@components/Layouts/Main'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </Provider>
  )
}
