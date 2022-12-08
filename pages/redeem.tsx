import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import useProgram from '../hooks/useProgram';
import { openRpcConnection } from '../utils/openRpcConnection';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from '@solana/web3.js';
import Layout from '../components/Layout';
import RedeemTile from '../components/RedeemTile';
import Loading from '../components/Loading';
import { ensure } from '../utils/ensure';
import { redeem } from '../utils/redeem';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { sign } from 'crypto';
import Box from '../components/Box';

export type Nft = {
    mint: PublicKey;
    title: string;
    description: string;
    imageUrl: string;
    creator: string;
    from: string;
    redeemed: boolean;
};

const Redeem: NextPage = () =>
{
    const [ loading, setLoading ] = useState<boolean>( false );
    const [ modalNft, setModalNft ] = useState<Nft>();
    const program = useProgram();
    const wallet = useWallet();
    const [ myNfts, setMyNfts ] = useState<Nft[]>( [] );
    const [ toRedeem, setToRedeem ] = useState<Nft[]>( [] );
    const [ signature, setSignature ] = useState( "" );
    const router = useRouter();

    const ConnectView = <div className=" my-10 font-semibold text-center">
        Connect your wallet
    </div>

    const LoadingView = <div className="my-10 w-full text-center flex flex-col items-center">
        <Loading />
    </div>

    const RedeemView = <div className="flex flex-col md:flex-row-reverse gap-4">
        <div className='w-full md:w-1/2'>
            <Box>
                <div className='p-2'>
                <div className="flex flex-row justify-between">
                <div className="font-medium">Receipt</div>
                <div className={ `mb-4 w-1/2 md:w-fit ${ signature ? "invisble" : toRedeem.length < 1 || loading ? "invisible" : "" }` }>
                    <Button style="filled" onClick={ handleRedeem }>
                        Redeem
                    </Button>
                </div>

                </div>
                <div className={`${ toRedeem.length > 0 ? "md:hidden flex" : "md:hidden hidden"} flex-row justify-between my-2`}>
                    <div className="text-semibold">
                        Drink(s)
                    </div>
                    <div>
                        + 8 USDC
                    </div>
                </div>
                { toRedeem?.map( function ( item, i )
            {
                return <div key={item.mint.toBase58()} className="hidden md:flex flex-row justify-between my-2">
                    <div className="text-semibold">
                        {item.title}
                    </div>
                    <div>
                        + 8 USDC
                    </div>
                </div>
            } ) }
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-cyan-900"></div>
            </div>
            <div className="flex flex-row justify-between">
                <div>
                    Bartender&apos;s Tip
                </div>
                <div>
                    - {1 * toRedeem.length} USDC
                </div>
            </div>
            <div className="flex flex-row justify-between text-semibold">
                <div>
                    Total
                </div>
                <div>
                    {7 * toRedeem.length} USDC
                </div>
            </div>
            </div>
            </Box>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-8">
            { myNfts?.map( function ( item, i )
            {
                return <RedeemTile key={ item.mint.toBase58() } id={ i } name={ item.title } imageSrc={ item.imageUrl } message={item.description} from={item.from} onClick={ () => { item.redeemed ? null : toRedeem.includes( item ) ? handleRemoveRedeem( item ) : handleAddRedeem( item ); } } selected={ toRedeem.includes( item ) } redeemed={ item.redeemed } />;
            } ) }
        </div>
    </div>
    
    


    const NoTipseaView = <div className=" my-10 font-semibold text-center">
        No Tipseas found!
    </div>

    const SuccessView = <div className=" my-10 font-semibold text-left">
        You redeemed your Tipsea!
        <div className="my-2 md:my-0 w-full">
                    <div>
                        <div className="w-full flex flex-col md:flex-row items-center gap-1 md:gap-4 my-2">
                            <div className="w-full md:w-1/4">
                                <a href={ `https://solscan.io/tx/${ signature }` + (process.env.NEXT_PUBLIC_CLUSTER === "devnet" ? "?cluster=devnet" : "") }>
                                    <Button style="filled">
                                        View on Solscan
                                    </Button>
                                </a>
                            </div>
                            <div className="w-full md:w-1/4">
                                <a href={ `https://t.me/+58fH0cwGotc0MjFh` }>
                                    <Button style="discord">
                                        Join our Telegram
                                    </Button>
                                </a>
                            </div>
                            <div className="w-full md:w-1/4">
                                <a href={ `https://twitter.com/tipsea01` }>
                                    <Button style="twitter">
                                        Follow our Twitter
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
    </div>

    useEffect( () =>
    {
        async function getMyMetaplexNfts ( publicKey: PublicKey )
        {
            setLoading( true );
            const rpc = openRpcConnection();
            const metaplex = Metaplex.make( rpc );
            const myNfts: Metadata[] = await metaplex.nfts().findAllByOwner( {
                owner: publicKey
            } ) as Metadata[];

            let myMetaplexNfts: Nft[] = [];

            for ( let i = 0; i < myNfts.length; i++ )
            {
                const metadata = myNfts[ i ];
                const nft = await metaplex.nfts().load( { metadata } );
                if ( nft )
                {
                    const nftJson = nft.json;
                    const attributes = nftJson?.attributes?.find((obj) => { return obj.trait_type === "Sender"})
                    console.log(attributes)
                    const nftObj: Nft = {
                        mint: nft.address,
                        title: nft.name,
                        description: nftJson?.description ?? "",
                        imageUrl: nftJson?.image ?? "",
                        creator: nft.creators[ 0 ].address.toBase58() ?? "",
                        from: attributes ? attributes.value : "",
                        redeemed: nft.uses ? nft.uses.remaining.isZero() ? true : false : false
                    };
                    nftObj.creator === process.env.NEXT_PUBLIC_TIPSEA && myMetaplexNfts.push( nftObj );
                }
            }
            setMyNfts( myMetaplexNfts );
            setLoading( false );
        }
        if ( wallet.publicKey )
        {
            getMyMetaplexNfts( new PublicKey( wallet.publicKey ) );
        } else
        {
            null;
        }
    }, [ wallet.publicKey ] );

    const handleAddRedeem = ( e: Nft ) =>
    {
        if ( toRedeem.length < 10 )
        {
            setToRedeem( [ ...toRedeem, e ] );
        }
    };

    const handleRemoveRedeem = ( e: Nft ) =>
    {
        setToRedeem( toRedeem.filter( item => item !== e ) );
    };

    async function handleRedeem ()
    {
        if ( program )
        {
            setLoading( true );
            try {
                const redeem_tx = await redeem( program, wallet.signTransaction, toRedeem );
                setLoading( false );
                setSignature( redeem_tx );
            } catch (e) {
                toast.error("Error: Redemption Error")
                setLoading( false );
            }
        }

    }

    return (
        <Layout>
            <div className=''>
                <div className={`${ loading || signature ? "hidden" : "inline-block" }`}>
                    <div className="text-xl font-semibold text-left">
                        Redeem your Tipsea
                    </div>
                    <div className="mt-2 mb-4">
                        (Select up to 10)
                    </div>
                </div>
                <div>

                </div>
                { !wallet.publicKey ? ConnectView : loading ? LoadingView : signature ? SuccessView : myNfts.length === 0 ? NoTipseaView : RedeemView }
            </div>
        </Layout>
    );
};

export default Redeem;