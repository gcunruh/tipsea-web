import type { NextPage } from 'next';
import { SetStateAction, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '../components/Layout';
import Box from '../components/Box';
import InputSm from '../components/InputSm';
import InputLg from '../components/InputLg';
import Button from '../components/Button';
import Menu from '../components/Menu';
import Order from '../components/orderFlow/Order';
import Write from '../components/orderFlow/Write';
import Mint from '../components/orderFlow/Mint';
import Enjoy from '../components/orderFlow/Enjoy';
import next from 'next';
import { createTipsea } from '../utils/createTipsea';
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_ADDRESS } from '@metaplex-foundation/mpl-token-metadata';
import useProgram from "../hooks/useProgram";
import { Connection, PublicKey } from '@solana/web3.js';
import { resolveSOLDomain } from '../utils/resolveSOLDomain';
import { resolveGlowDomain } from "../utils/resolveGlowDomain";
import { validateSolanaAddress } from '../utils/validateSolanaAddress';
import { toast } from 'react-hot-toast';


const Home: NextPage = () =>
{
  const [ uuid, setUuid ] = useState( uuidv4() );
  const program = useProgram();
  const [ loading, setLoading ] = useState( false );
  const { publicKey, wallet, signTransaction, signAllTransactions } = useWallet();
  const [ step, setStep ] = useState( 0 );
  const [ selectedOrder, setSelectedOrder ] = useState( -1 );
  const [ fields, setFields ] = useState( {
    to: '',
    message: '',
  } );
  const [ properAddress, setProperAddress ] = useState("");
  const [ mintAddress, setMintAddress ] = useState( "" );
  const [ signature, setSignature ] = useState( "" );

  const orderOptions = [
    { id: 0, name: "Mojito", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/mojito.png" },
    { id: 1, name: "Old Fashioned", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/old_fashioned.png" },
    { id: 2, name: "Gin and Tonic", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/gin_tonic.png" },
    { id: 3, name: "Pina Colada", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/pina_colada.png" },
    { id: 4, name: "Margarita", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/margarita.png" },
    { id: 5, name: "Espresso Martini", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/espresso_martini.png" },
    { id: 6, name: "Mule", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/mule.png" },
    { id: 7, name: "Latte", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/latte.png" },
    { id: 8, name: "Espresso", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/espresso.png" },
    { id: 9, name: "Flat White", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/flat_white.png" },
    { id: 10, name: "Cosmopolitan", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/cosmo.png" },
    { id: 11, name: "Bellini", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/bellini.png" },
    { id: 12, name: "Sangria", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/sangria.png" },
    { id: 13, name: "Manhattan", imageSrc: "https://tipsea.s3.us-west-2.amazonaws.com/manhattan.png" },
  ];

  const prevStep = () =>
  {
    setStep( step - 1 );
  };

  const nextStep = async () =>
  {
    if (step === 1) {
      try {
        await handleAddress();
        setStep( step + 1 );
      } catch (e) {
        toast.error(`${e}`)
      }
    } else {
      setStep( step + 1 );
    }
  };

  const handleOrderSelect = ( orderId: number ) =>
  {
    if ( orderId === selectedOrder )
    {
      setSelectedOrder( -1 );
    } else
    {
      setSelectedOrder( orderId );
    }
  };

  const handleChange = ( e: any ) =>
  {
    setFields( {
      ...fields, [ e.target.name ]: e.target.value
    } );
  };

  const handleAddress = async () => {
    if (fields.to.includes(".sol")) {
      try {
        const resolvedAddress = await resolveSOLDomain(fields.to);
        setProperAddress(resolvedAddress);
      } catch (error) {
        throw Error("Invalid .sol Domain")
      }
    } else if (fields.to.includes(".glow")) {
      try {
        const resolvedAddress = await resolveGlowDomain(fields.to);
        setProperAddress(resolvedAddress)
      } catch (error) {
        throw Error("Invalid .glow Domain")
      }
    } else {
        try {
          const resolvedAddress = validateSolanaAddress(fields.to)
          setProperAddress(fields.to);
        } catch (error) {
          throw Error("Invalid Solana Address")
        }
    }
    // console.log(properAddress);
  }

  async function uploadMetadata ()
  {
    const S3_BUCKET = 'tipsea';

    AWS.config.update( { region: 'us-west-2' } );

    const s3 = new AWS.S3( {
      accessKeyId: String( process.env.NEXT_PUBLIC_S3_ACCESS_KEY ),
      secretAccessKey: String( process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY )
    } );

    var dictstring = {
      name: orderOptions.find( element => element.id === selectedOrder )?.name,
      symbol: orderOptions.find( element => element.id === selectedOrder )?.name.replace(/\s+/g, '').toUpperCase().substring(0, 5),
      description: fields.message,
      seller_fee_basis_points: 0,
      external_url: "https://tipsea.xyz/",
      edition: "1",
      background_color: "000000",
      attributes: [
        {
          trait_type: "Sender",
          value: publicKey
        },
        {
          trait_type: "Receiver",
          value: fields.to
        },
        {
          trait_type: "Redeemed",
          value: "No"
        }
      ],
      properties: {
        category: "image",
        creators: [ {
          address: process.env.NEXT_PUBLIC_TIPSEA,
          share: 100
        },
        {
          address: publicKey,
          share: 0
        }
        ],
        "files": [ {
          uri: "https://tipsea.s3.us-west-2.amazonaws.com/" + orderOptions.find( element => element.id === selectedOrder )?.name.replace( " ", "_" ).toLowerCase() + ".png",
          type: "image/png"
        } ]
      },
      "image": "https://tipsea.s3.us-west-2.amazonaws.com/" + orderOptions.find( element => element.id === selectedOrder )?.name.replace( " ", "_" ).toLowerCase() + ".png",
    };

    var buf = Buffer.from( JSON.stringify( dictstring ) );

    var data = {
      Bucket: S3_BUCKET,
      Key: `metadata/${ uuid }.json`,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: "application/json",
      ACL: 'public-read'
    };

    s3.upload( data, function ( err: any, data: any )
    {
      if ( err )
      {
        console.log( err );
        console.log( 'Error uploading data: ', data );
      } else
      {
        toast.success("Metadata Uploaded!")
      }
    } );

  }

  async function mint_nft ()
  {
    if ( program )
    {
      try {
        const mint_tx = await createTipsea(
          program,
          `https://tipsea.s3.us-west-2.amazonaws.com/metadata/${ uuid }.json`,
          orderOptions.find( element => element.id === selectedOrder )?.name,
          orderOptions.find( element => element.id === selectedOrder )?.name.replace(/\s+/g, '').toUpperCase().substring(0, 5),
          properAddress
        );
        setSignature( mint_tx );
      } catch {
        throw Error("Mint Failed!")
      }

    }
  }

  async function handleMint ()
  {
    setLoading( true );
    try {
      await uploadMetadata();
      await mint_nft();
      nextStep();
    } catch (error) {
      toast.error("Error: Mint Failed")
      setLoading( false );
    }

  }

  const steps = [
    { id: 0, component: <Order orderOptions={ orderOptions } selectedOrder={ selectedOrder } handleOrderSelect={ handleOrderSelect } nextStep={ nextStep } />, name: "Order" },
    { id: 1, component: <Write fields={ fields } handleChange={ handleChange } nextStep={ nextStep } prevStep={ prevStep } />, name: "Write your Message" },
    { id: 2, component: <Mint fields={ fields } orderOptions={ orderOptions } selectedOrder={ selectedOrder } loading={ loading } wallet={ wallet } publicKey={ publicKey } />, name: "Mint" },
    { id: 3, component: <Enjoy fields={ fields } orderOptions={ orderOptions } selectedOrder={ selectedOrder } nextStep={ nextStep } prevStep={ prevStep } mintAddress={ mintAddress } signature={ signature } />, name: "Enjoy" },
  ];

  const nextButton = <div className={ "w-full md:w-44" }>
    <Button style="filled" onClick={ nextStep }>
      Next
    </Button>
  </div>;

  const prevButton = <div className={ "w-full md:w-44" }>
    <Button style="default" onClick={ prevStep }>
      Previous
    </Button>
  </div>;

  const mintButton = <div className={ "w-full md:w-44" }>
    <Button style="filled" onClick={ handleMint }>
      Mint for 8 USDC
    </Button>
  </div>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-start md:justify-around mx-5 md:mx-12 mt-5">
        <div className="w-full md:w-1/4">
          <Menu steps={ steps } currentStep={ step } />
          { ( () =>
          {
            switch ( step )
            {
              case 0: return null;
              case 1: return prevButton;
              case 2: return prevButton;
              default: null;
            }
          } )() }
          { ( () =>
          {
            switch ( step )
            {
              case 0: return selectedOrder < 0 ? null : nextButton;
              case 1: return fields.to.length < 1 || fields.message.length < 1 ? null : nextButton;
              case 2: return mintButton;
              default: null;
            }
          } )() }
        </div>
        <div className="w-full md:w-3/4 mt-6">
          {
            step < 4 ? steps[ step ].component :
              <div className="flex flex-col justify-center mt-2 mb-44">
                <div className="font-semibold text-left">
                  Congrats! You just sent a Tipsea!
                </div>
                <div className="w-full md:w-1/4 my-2">
                  <a href={ `https://solscan.io/tx/${ signature }` + (process.env.NEXT_PUBLIC_CLUSTER === "devnet" ? "?cluster=devnet" : "") } target="_blank" rel="noreferrer">
                    <Button style="filled">
                      View on Solscan
                    </Button>
                  </a>
                </div>
                <div className="w-full md:w-1/4 mb-2">
                  <a href={ `https://discord.gg/dK2Xjm8mqB` }>
                    <Button style="discord">
                      Discord
                    </Button>
                  </a>
                </div>
                <div className="w-full md:w-1/4 mb-2">
                  <a href={ `https://twitter.com/tipsea01` }>
                    <Button style="twitter">
                      Twitter
                    </Button>
                  </a>
                </div>
                <div className="font-semibold text-left">
                  Please support our work!
                </div>
              </div>
          }
          {/* <Order /> */ }
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
  );
};

export default Home;
