import React,{ useState,useEffect,useContext} from 'react';
import Image from  'next/image';
import Style from './HeroSection.module.css';
import {Button} from '../componentIndex';
import images from '../../img';

//SMART CONTRACT
import {NFTMarketplaceContext} from "../../Context/NFTMarketplaceContext"

const HeroSection = () => {

  const {titleData} = useContext(NFTMarketplaceContext)
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
            <h1>{titleData}</h1>
            <p>
            Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them
            </p>
            <Button btnName={"Start your Search"} />
        </div>
        <div className={Style.heroSection_box_right}>
          {/* <p>https://chat-rmbn5rrcn-kotharisurbhi04.vercel.app/</p> */}
        {/* <Image
            src={images.tecblicLogo}
            alt="Hero section"
            width={100}
            height={100}
          /> */}
        </div>
      </div>
    </div>
  )
};

export default HeroSection;