import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { Feed } from '../components/Feed'
import { Sidebar } from '../components/Sidebar'
import { Widgets } from '../components/Widgets'
import { fetchTweets } from '../services/fetchTweets'
import { ITweet } from '../typings'

interface IProps {
  tweets: ITweet[]
}

const Home = ({ tweets }: IProps) => {
  return (
    <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>

      <main className='grid grid-cols-9'>
        <Sidebar/>

        <Feed tweets={tweets}/>

        <Widgets/>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    }
  }
}
