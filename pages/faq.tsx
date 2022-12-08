import type { NextPage } from 'next';
import { SetStateAction, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

const FAQ: NextPage = () => {
    return (
        <Layout>
            <section className="">
  <div className="mx-auto">
      <h2 className="mb-2 text-xl md:text-3xl font-bold">Frequently asked questions</h2>
      <div className="grid pt-4 md:pt-8 text-left md:gap-16 md:grid-cols-2">
          <div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      What is a Tipsea?
                  </h3>
                  <p className="">A Tipsea is a NFT thank you note in the form of a tasty digital drink. Each Tipsea can be redeemed for 7 USDC so you can turn your digital drink into a real one.</p>
              </div>
              <div className="mb-10">                        
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      How much does it cost?
                  </h3>
                  <p className="">It costs 8 USDC (+ SOL mint cost) to send a Tipsea to someone else.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      Are the messages I write public?
                  </h3>
                  <p className="">YES! We store the message, and original sender/receiver in the Tipsea&apos;s metadata.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      How many times can I redeem my Tipsea?
                  </h3>
                  <p className="">You can redeem it once for 7 USDC.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      What happens to my Tipsea after I redeem?
                  </h3>
                  <p className="">You enjoy your drink! We update the metadata to mark it as redeemed, but the Tipsea is yours to keep.</p>
              </div>
          </div>
          <div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      Where can I see what people have sent me?
                  </h3>
                  <p className="">You can head over to <a className="font-semibold" href="http://www.tipsea.xyz/redeem">http://www.tipsea.xyz/redeem</a> to check out who has sent you a Tipsea. Just connect your wallet. You can also see the Tipseas in your wallet by using your favorite wallet application and navigating to NFTs.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      How many Tipseas can I redeem at one time?
                  </h3>
                  <p className="">You can redeem up to 10 at a time.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      Can I send my Tipsea to someone else?
                  </h3>
                  <p className="">Yes. You can second-hand send your drink :-)</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium ">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                      What is next for Tipsea?
                  </h3>
                  <p className=""> Tipsea is a project of <a className="font-semibold" href="https://divination.dev" target="_blank" rel="noreferrer">Divination</a>, an emerging technology product consultancy. Want to work with our creator? <a className="font-semibold" href="https://twitter.com/firstwonk" target="_blank" rel="noreferrer">Follow @firstwonk on Twitter</a>.</p>
              </div>
          </div>
      </div>
  </div>
</section>
        </Layout>
    )
}

export default FAQ;