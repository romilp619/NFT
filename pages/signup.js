import React from 'react'
import Style from "../styles/login.module.css";
// import loginSignUp from "../loginSignUp/loginSignUp";
import LoginSignUp from '../loginSignUp/loginSignUp';
const signup = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>SignUp</h1>
        <LoginSignUp />
        <p className={Style.login_box_para}>
          New user? <a href="#">Create an account</a>
        </p>
      </div>
    </div>
  )
}

export default signup