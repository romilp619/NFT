import React, { useState, useEffect, useContext } from 'react'


import Style from "../styles/author.module.css"
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex"
import { Brand, Title } from '../componenets/componentIndex'
import FollowerTabCard from '../componenets/FollowerTab/FollowerTabCard/FollowerTabCard'
import images from "../img"
import { AuthorProfileCard, AuthorTaps, AuthorNFTCardBox } from '../authorPage/componentIndex'

//Import SMART Contract
// import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext'
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext'


const author = () => {

    const followerArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
            seller: "7d64gf748849j47fy488444",
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
            seller: "7d64gf748849j47fy488444",
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
            seller: "7d64gf748849j47fy488444",
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
            seller: "7d64gf748849j47fy488444",
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
            seller: "7d64gf748849j47fy488444",
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
            seller: "7d64gf748849j47fy488444",
        },
    ];

    const [collectibles, setCollectibles] = useState(true);
    const [created, setCreated] = useState(false)
    const [like, setLike] = useState(false);
    const [follower, setFollower] = useState(false)
    const [following, setFollowing] = useState(false)

    const {fetchMyNFTsOrListedNFTs,currentAccount} = useContext(NFTMarketplaceContext);

    const [nfts,setNfts] = useState([]);
    const [myNFTs, setMyNFTs] = useState([]);
    // console.log("testing1")
    useEffect(()=>{
        fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
            setNfts(items);
        });
    },[]);

    // console.log("testing2")

    useEffect(()=>{
        fetchMyNFTsOrListedNFTs("fetchMyNFT").then((items)=>{
            setMyNFTs(items);
        })
    },[]);

    

    return (
        <div className={Style.banner}>
            <Banner bannerImage={images.creatorbackground3} />
            <AuthorProfileCard  currentAccount={currentAccount} />

            <AuthorTaps
                
                setCollectiables={setCollectibles}
                setCreated={setCreated}
                setLike={setLike}
                setFollower={setFollower}
                setFollowing={setFollowing}
            />


            <AuthorNFTCardBox
                collectiables={collectibles}
                created={created}
                like={like}
                follower={follower}
                following={following} 
                nfts={nfts}
                myNFTs={myNFTs}/>
                

            {/* <FollowerTabCard  /> */}
            <Title heading="Popular Creators"
                paragraph="Click on this to listen the popular music" />
            <div className={Style.author_box}>
                {followerArray.map((el, i) => (
                    <FollowerTabCard i={i} el={el} />
                ))}
            </div>
            {/* {popularArray.map((el, i)=>(
            <FollowerTabCard key={i + 1} i={i} el={el} />
        ))} */}
            <Brand />
        </div>
    )
}

export default author