import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";
import Router from "next/router";


const BigNFTSlider = () => {
    const [idNumber, setIdNumber] = useState(0);
    const sliderData = [
        {
            title: "Hello NFT",
            id: 1,
            name: "Mike",
            collection: "",
            price: "00664 ETH",
            like: 243,
            image: images.user10,
            nftImage: images.art,
            time: {
              days: 21,
              hours: 40,
              minutes: 81,
              seconds: 15,
            },
        },
        {
            title: "NFT",
            id: 2,
            name: "Ross",
            collection: "",
            price: "00664 ETH",
            like: 243,
            image: images.user2,
            nftImage: images.nft_image_2,
            time: {
              days: 21,
              hours: 40,
              minutes: 81,
              seconds: 15,
            },
        },
        {
            title: "Perry NFT",
            id: 3,
            name: "Matty",
            collection: "sports",
            price: "00664 ETH",
            like: 243,
            image: images.user3,
            nftImage: images.nft_image_3,
            time: {
              days: 21,
              hours: 40,
              minutes: 81,
              seconds: 15,
            },
        },
        {
            title: "Home NFT",
            id: 4,
            name: "Virat",
            collection: "sports",
            price: "00664 ETH",
            like: 243,
            image: images.user4,
            nftImage: images.nft_image_1,
            time: {
              days: 21,
              hours: 40,
              minutes: 81,
              seconds: 15,
            },
        },
    ]

    const placeBid = async() =>{
        try {
            Router.push("./searchPage")
        } catch (error) {
            console.log(error)
        }
    }
//-----------------INC

const inc = useCallback(()=>{
    if(idNumber + 1 < sliderData.length){
        setIdNumber(idNumber + 1);
    }
},[idNumber, sliderData.length]);

//------------------DEC

const dec = useCallback(()=>{
    if(idNumber >0){
        setIdNumber(idNumber - 1);
    }
},[idNumber]);

  return (
    <div className={Style.bigNFTSlider}>
        <div className={Style.bigNFTSlider_box}>
            <div className={Style.bigNFTSlider_box_left}>
                <h2>{sliderData[idNumber].title}</h2>
                <div className={Style.bigNFTSlider_box_left_creator}>
                    <div className={Style.bigNFTSlider_box_left_creator_profile}>
                        <Image src={sliderData[idNumber].image}
                        className={Style.bigNFTSlider_box_left_creator_profile_img}
                        alt="Profile Image" 
                        width={50}
                        height={50}/>
                        <div className={Style.bigNFTSlider_box_left_creator_profile_img}>
                            <p>Creator</p>
                            <h4>{sliderData[idNumber].name} <span><MdVerified /></span></h4>
                        </div>
                    </div>
                    <div className={Style.bigNFTSlider_box_left_creator_collection}>
                        <AiFillFire  className={Style.bigNFTSlider_box_left_creator_collection_icon } 
                        />
                    
                    <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                        <p>Collection</p>
                        <h4>{sliderData[idNumber].collection}</h4>
                    </div>
                    </div>
                </div>
                <div className={Style.bigNFTSlider_box_left_bidding}>
                    <div className={Style.bigNFTSlider_box_left_bidding}>
                        <small>Current Bid</small>
                        <p>{sliderData[idNumber].price}<span>$20</span></p>
                    </div>
                    <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                        <MdTimer className={Style.bigNFTSlider_box_left_bidding_box_icon } 
                        />
                        <span>Auction Ending in</span>
                    </p>

                    <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.days}</p>
                            <span>Days</span>
                        </div>

                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.hours}</p>
                            <span>hours</span>
                        </div>

                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.minutes}</p>
                            <span>mins</span>
                        </div>

                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.seconds}</p>
                            <span>secs</span>
                        </div>

                    </div>
                    
                    <div className={Style.bigNFTSlider_box_left_button}>
                        {/* <Button btnName="Place" handleClick={() => {}} /> */}
                        <Button btnName="View" handleClick={() => placeBid()} />
                    </div>
                </div>

                <div className={Style.bigNFTSlider_box_left_siderBtn}>
                    <TbArrowBigRightLine className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                    onClick={() => dec() }
                    />
                    <TbArrowBigLeftLines className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                    onClick={() => inc() }
                    />
                </div>

            </div>
            <div className={Style.bigNFTSlider_box_right}>
                <div className={Style.bigNFTSlider_box_right_box}>
                    <Image src={sliderData[idNumber].nftImage} alt="NFT IMAGE"
                    className={Style.bigNFTSlider_box_right_box_img} ></Image>

                    <div className={Style.bigNFTSlider_box_right_box_like}>
                        <AiFillHeart />
                        <span>{sliderData[idNumber].like}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BigNFTSlider