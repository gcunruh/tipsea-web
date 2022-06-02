import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Layout from '../components/Layout'
import Box from '../components/Box'
import InputSm from '../components/InputSm'
import InputLg from '../components/InputLg'
import Button from '../components/Button'
import Menu from '../components/Menu'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-row justify-around">
        <div>
          <Menu />
        </div>
        <div>
          <Box>
            Hello world!
          </Box>
          <InputSm label="Who are you?" placeholder="Darth Vader" />
          <InputLg label="What are you?" placeholder="A very mean man" />
          <Button style="filled">
            Hello
          </Button>
          <Button style="default">
            Hello
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
