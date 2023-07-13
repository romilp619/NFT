import React from 'react'
import Image from 'next/image'


//Internal Import
import Style from "./Notification.module.css";
import images from '../../../img';
const Notification = () => {
  return (
    <div className={Style.notification}>
      <p>Notification</p>
      <div className={Style.notification_box}>
        <div className={Style.notification_box_img}>
          <Image 
          src={images.user10}
          alt="profile image"
          width={50}
          height={50} />
        </div>

        <div className={Style.notification_box_info}>
          <h4>Mike</h4>
          <p>Testing...............</p>
          <small>2 mins ago</small>
        </div>
        <span className={Style.notification_box_new}></span>

      </div>
    </div>
  )
};

export default Notification