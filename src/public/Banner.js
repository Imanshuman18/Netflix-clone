import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

export default function Banner() {
    const[movie,setmovie] = useState([])
    useEffect(()=>{
      async function fetchdata(){
        const request = await axios.get(requests.fetchTrending)
       setmovie(request.data.results[
        Math.floor(Math.random() * request.data.results.length-1)
       ]
       )
       return request
      }
      fetchdata();
    },[])
    console.log(movie);
    function truncate(str,n){
      return str?.length>n ? str.substr(0,n-1)+"..." : str;
    }
  return (
    <div>
      <header className='banner'
      style={{
        backgroundSize:"cover",
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition:"center center"
      }}>
      <div className="bannercontent">
         <h1 className='banner_title'>
          {movie?.title || movie?.name || movie?.original_name}
         </h1>
         <div className="banner_buttons">
         <button className="bannerbutton">Play</button>
         <button className="bannerbutton">Mylist</button>
         <h1 className='banner_description'>
          {truncate(movie?.overview, 350)}
         </h1>
         </div>
      </div>
      <div className="banner_fadebottom"/>
      </header>
    </div>
  )
}
