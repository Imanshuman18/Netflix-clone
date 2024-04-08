import React, { useState } from 'react'
import"./Login.css"
import SignIn from './SignIn'
function Login() {
    const[signIn,setsignIn]=useState(false )
  return (
    <div className='login'>
        <div className="login_background">
            <img className='login_logo' src="lgo2.png" alt="" />
            <button className='login_button' onClick={()=>setsignIn(true)}>Sign In</button>
            <div className='login_gradient'>
                <div/>
            <div className="login_body">
                {signIn?(
                    <SignIn/>
                ):   <>
                <h1>Unlimited films,Tv programmes 
                    and more.</h1>
                    <h2>Watch anywhere.Cancel at anytime</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership </h3>
                    <div className="login_input">
                        <form>
                        <input type="email" placeholder='Email Address'/>
                        <button onClick={()=>setsignIn(true)} className='login_getstarted'>GET STARTED</button>
                        </form>
                
                    </div>
                </>}
             
            </div>

            </div>
        </div>
    </div>
  )
}

export default Login