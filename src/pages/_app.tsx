import Head from 'next/head'
import '../index.css'
import CustomCursor from '../components/CustomCursor'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CodeQuest - Vault Edition | IEEE UCSC CTF Hackathon</title>
        <meta name="description" content="The ultimate cybersecurity challenge awaits. Join IEEE UCSC's premier CTF hackathon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomCursor />
      <Component {...pageProps} />
    </>
  )
}
