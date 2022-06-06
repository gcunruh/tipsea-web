import type { NextPage } from 'next'
import { SetStateAction, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Layout from '../components/Layout'
import Box from '../components/Box'
import InputSm from '../components/InputSm'
import InputLg from '../components/InputLg'
import Button from '../components/Button'
import Menu from '../components/Menu'
import Order from '../components/orderFlow/Order'
import Write from '../components/orderFlow/Write'
import Mint from '../components/orderFlow/Mint'
import Send from '../components/orderFlow/Send'

const Home: NextPage = () => {
  const [step, setStep] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(-1);
  const [fields, setFields] = useState({
    to: '',
    message: '',
  })

  const orderOptions = [
    { id: 0, name: "Moscow Mule", imageSrc: "./mule.jpg" },
  ]

  const prevStep = () => {
    setStep(step - 1)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const handleOrderSelect = (orderId: number) => {
    if (orderId === selectedOrder) {
      setSelectedOrder(-1)
    } else {
      setSelectedOrder(orderId)
    }
  }

  const handleChange = (e: any) => {
    setFields({
      ...fields, [e.target.name]: e.target.value
    })
  }

  const steps = [
    { id: 0, component: <Order orderOptions={orderOptions} selectedOrder={selectedOrder} handleOrderSelect={handleOrderSelect} nextStep={nextStep} />, name: "Order" },
    { id: 1, component: <Write fields={fields} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />, name: "Write your Message" },
    { id: 2, component: <Mint fields={fields} orderOptions={orderOptions} selectedOrder={selectedOrder} nextStep={nextStep} prevStep={prevStep} />, name: "Preview & Mint" },
    { id: 3, component: <Send fields={fields} orderOptions={orderOptions} selectedOrder={selectedOrder} nextStep={nextStep} prevStep={prevStep} />, name: "Send" }
  ]

  return (
    <Layout>
      <div className="flex flex-row justify-around mx-12 mt-5">
        <div className="w-1/4">
          <Menu steps={steps} currentStep={step}/>
        </div>
        <div className="w-3/4">
          {
            step < 4 ? steps[step].component : 
              <div className="flex flex-col justify-center items-center mt-11 mb-44">
                <div className="font-semibold mb-4 text-center">
                  Congrats! You just sent a Tipsea! Thanks for being a good friend :-)
                </div>
                <div className="w-1/2">
                  <Button style="filled">
                    View on Solscan
                  </Button>
                </div>
              </div>
          }
          {/* <Order /> */}
          {/* <Box>
            Hello world!
          </Box>
          <InputSm label="Who are you?" placeholder="Darth Vader" />
          <InputLg label="What are you?" placeholder="A very mean man" />
          <Button style="filled">
            Hello
          </Button>
          <Button style="default">
            Hello
          </Button> */}
        </div>
      </div>
    </Layout>
  )
}

export default Home
