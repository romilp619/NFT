import React from 'react';
import Link from 'next/link';

import Style from './Discover.module.css';
const Discover = () => {
  //----------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    {
      name: "Account Setting",
      link: "account",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
    {
      name: "Transfer Funds",
      link: "transferFunds"
    },
    // {
    //   name: "CHAT",
    //   link: "chat",
    // },
  ];
  return (
    <div>
      {discover.map((el , i)=>(
        // every menu has their own id
        <div key={i + 1} className={Style.discover}>
          <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover