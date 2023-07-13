import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Style from './Navbar.module.css';
import { MdNotifications } from 'react-icons/md';
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg';

import { useRouter } from "next/router";



import { Discover, HelpCenter, Profile, Notification, Sidebar } from './index';
import { Button,Error } from '../../componenets/componentIndex';
import images from '../../img';

//IMPORT FROM SC
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
import { DiJqueryLogo } from 'react-icons/di';


const Navbar = () => {

  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const router = useRouter()
  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "HelpCenter") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }

  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setNotification(true);
      setDiscover(false);
      setHelp(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true)
    } else {
      setOpenSideMenu(false)
    }
  };

  //SC Section
  const { currentAccount, connectWallet,openError } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            {/* <Image src={images.tecblicLogo} alt="NFT Market Place" height={80} width={80}></Image> */}
            
              <DiJqueryLogo  onClick={() => router.push("/")} />
            
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type='text' placeholder="Search NFT" />
              <BsSearch onClick={() => { }} className={Style.search_icon}></BsSearch>
            </div>
          </div>
        </div>

        {/* END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* discover menu */}
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>HelpCenter</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter></HelpCenter>
              </div>
            )}
          </div>

          {/* Notification */}
          <div className={Style.navbar_container_right_notify}>


            <div className={Style.navbar_container_right_notify}>
              <MdNotifications className={Style.notify}
                onClick={() => openNotification()}></MdNotifications>
              {notification && <Notification />}
            </div>
          </div>
          {/* CREATE BUTTON SECTION */}

          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (
              
              <Button
                btnName="Create"
                handleClick={() => router.push('/uploadNFT')}
                
              />
              
            )}

          </div>

          {/* User Profile */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user10}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile} />

              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* MENU BUTTON */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>

        </div>
      </div>
      {/* sideBar Component */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <Sidebar setOpenSideMenu={setOpenSideMenu} 
          currentAccount={currentAccount}
          connectWallet={connectWallet}
           ></Sidebar>
        </div>
      )}

      {openError && <Error /> }
    </div>
  );

};

export default Navbar;