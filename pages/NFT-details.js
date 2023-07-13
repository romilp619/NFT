import React,{useContext,useEffect, useState} from 'react'
import {useRouter} from "next/router";

import { Button ,Category ,Brand} from "../componenets/componentIndex";
import  NFTDetailsPage  from "../NFTDetailPage/NFTDetailsPage"

//IMPORT SC DATA

import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const NFTdetails = () => {

  const {currentAccount} = useContext(NFTMarketplaceContext);

  const [nft,setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(()=>{
    if(!router.isReady) return;
    setNft(router.query);
  },[router.isReady]);

  return (
    <div>
    <NFTDetailsPage  nft={nft} />
    <Category />
    <Brand />
    </div>

  )
}

export default NFTdetails;