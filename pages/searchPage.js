import React, { useEffect, useState, useContext } from 'react'

import Style from '../styles/searchPage.module.css'
import { Slider, Loader, Brand } from "../componenets/componentIndex"
import { SearchBar } from "../SearchPage/searchBarIndex"
import { Filter } from '../componenets/componentIndex'
import { NFTCardTwo, Banner } from '../collectionPage/collectionIndex'
import images from '../img'


//Fetch Smart Contract

import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext'
const searchPage = () => {
  const { fetchNFTs, setError, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    try {
      if (currentAccount) {
        fetchNFTs()?.then((items) => {
          setNfts(items?.reverse());
          setNftsCopy(items);
          console.log(nfts);
        });
      }
    } catch (error) {
      setError("Please reload the browser", error);
    }
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };



  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <Filter />
      <SearchBar onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch} />
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      {/* { <NFTCardTwo NFTData={nfts} /> } */}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage