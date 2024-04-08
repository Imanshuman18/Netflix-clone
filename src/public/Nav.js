import React  from 'react'
import './Nav.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function Nav() {
    const [show, handleshow]=useState(false)
    const navigate = useNavigate()
useEffect(()=>{
    window.addEventListener("scroll",()=>{
        if(window.scrollY > 100){
            handleshow(true)
        }else handleshow(false)
    })
    return ()=>{
        window.removeEventListener("scroll",handleshow())
    }
},[])
  return (
 
    <div className={`Nav ${show && "Nav_black"}`}>
        <img
        onClick={()=>navigate('/')}
        className='Nav_logo'
        src='logo66.png'
        alt='Netflix Logo'

        />     
         <img
         onClick={()=> navigate('/profile')}
        className='Nav_avatar'
        src='navavatar.png'
        alt='User'

        />       
</div>
  )
}
