import Head from 'next/head'
import '../index.css'
import CustomCursor from '../components/CustomCursor'
import ErrorBoundary from '../components/ErrorBoundary'

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Head>
        <title>CodeQuest - Vault Edition | IEEE UCSC CTF Hackathon</title>
        <meta name="description" content="The ultimate cybersecurity challenge awaits. Join IEEE UCSC's premier CTF hackathon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="CTF, cybersecurity, hackathon, IEEE, UCSC, CodeQuest" />
        <meta property="og:title" content="CodeQuest - Vault Edition | IEEE UCSC CTF Hackathon" />
        <meta property="og:description" content="The ultimate cybersecurity challenge awaits. Join IEEE UCSC's premier CTF hackathon." />
        <meta property="og:type" content="website" />
      </Head>
      <CustomCursor />
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
