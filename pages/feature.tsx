import type { NextPage } from 'next';
import { Widget } from '@typeform/embed-react'

import Layout from '../components/Layout';

const Feature: NextPage = () => {
    return (
        <Layout>
            <Widget id="tWAVdmPq" className="w-full lg:w-2/3 mx-auto h-full" />
        </Layout>
    )
}

export default Feature;