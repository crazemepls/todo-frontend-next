import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (<>
        <NavBar />
  <Component {...pageProps} /></>)
}
