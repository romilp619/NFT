import React from 'react'
import Style from "../styles/login.module.css";
import LoginSignUp from "../loginSignUp/loginSignUp";
const signin = () => {
  return (
    <div className={Style.login}>
    <div className={Style.login_box}>
      <h1>Login</h1>
      <LoginSignUp />
      <p className={Style.login_box_para}>
        New user? <a href="#">Create an account</a>
      </p>
    </div>
  </div>

  )
}

export default signin