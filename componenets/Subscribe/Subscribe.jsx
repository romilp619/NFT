import React from 'react'
import {RiSendPlaneFill} from 'react-icons/ri';
import Style from './Subscribe.module.css';
import Image from 'next/image';
import images from '../../img';

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
        <div className={Style.subscribe_box}>
            <div className={Style.subscribe_box_left}>
                <h2>Never Miss a drop</h2>
                <p>
                    Subscribe to our super-exclusive drop list
                </p>
                <div className={Style.subscribe_box_left_box}>
                    <span>01</span>
                    <small>Get More discount</small>
                </div>
                <div className={Style.subscribe_box_left_box}>
                    <span>02</span>
                    <small>Get premium magazines</small>
                </div>
                <div className={Style.subscribe_box_left_input}>
                    <input type="email" placeholder="Enter your Email"></input>
                    <RiSendPlaneFill className={Style.subscribe_box_left_input_icon }/>
                </div>
            </div>
            <div className={Style.subscribe_box_right}>
                <Image src={images.update} alt="get update" height={600} width={800}/>
            </div>
        </div>
    </div>
  )
}

export default Subscribe