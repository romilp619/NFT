import React, { useContext, useEffect,useState } from 'react'
import Style from '../styles/index.module.css';
import { HeroSection ,Service,BigNFTSlider,Subscribe,Title,Category,Filter,NFTCard,Collection,FollowerTab,AudioLive,Slider,Brand,Video, Loader} from '../componenets/componentIndex';

import {getTopCreators} from "../TopCreators/TopCreators"
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';
// import { getTopCreators } from '../TopCreators/TopCreators';
const Home = () => {

  const { checkIfWalletConnected } = useContext(NFTMarketplaceContext);
  // console.log("testing",checkContract)
  useEffect(()=>{
    checkIfWalletConnected();
  },[]);

  const {fetchNFTs,currentAccount} = useContext(NFTMarketplaceContext)
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);

    const creators = getTopCreators(nfts);

    useEffect(()=>{
      if(currentAccount){
        fetchNFTs().then((items)=>{
            setNfts(items?.reverse());
            // setNfts(items);
            setNftsCopy(items);
            // console.log(nfts);

        }); 
      }
    },[]);

    
  return(
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      {/* <Title heading="Audio Collection" 
      paragraph="Discover the most outstanding NFTs in all topics.."/> */}
      {/* <AudioLive /> */}
      {/* {creators.length == 0 ? <Loader /> : (
        <FollowerTab TopCreator={creators} />
      ) } */}
      <BigNFTSlider />
      {/* <AudioLive /> */}
      {/* {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )} */}
      {/* <FollowerTab TopCreator={creators} /> */}
      {/* <Title heading="Explore NFTs Video" 
      paragraph="Click here to play the music"/> */}
      <Slider />
      <Collection />
      {/* <Title heading="Featured NFT" 
      paragraph="Discover the most outstanding NFTs in all topics.."/> */}
      <Filter />
      {/* {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />} */}
      <NFTCard NFTData={nfts} />
      {/* <Title heading="Browse By category" 
      paragraph="Explore the NFTs in the most featured category"/> */}
      {/* <Category/> */}
      {/* <Subscribe /> */}
      <Brand />
      {/* <Video /> */}
      {/* <Loader /> */}
     
    </div>

    
  )
  
};

export default Home;