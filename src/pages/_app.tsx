import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import withAuth from '@/components/authHoc'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <>
        <NavBar />
        <Component {...pageProps} />
        {/* {
          withAuth(<Component {...pageProps} />)
        } */}
        </>
      </SessionProvider>
    </>
  )
}
