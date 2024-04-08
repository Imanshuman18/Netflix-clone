import movieTrailer from 'movie-trailer'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import YouTube from 'react-youtube'
import axios from './axios'
import "./Row.css"

const base_url ="https://image.tmdb.org/t/p/original/"

export default function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setmovies]= useState([])
    const [trailerUrl, settrailerUrl] = useState("")
    useEffect(()=>{
       async function fetchData(){
        const request = await axios.get(fetchUrl);
        setmovies(request.data.results)
        return request
       }
       fetchData();
    },[fetchUrl])
    const opts={
      height:"390",
      width:"100%",
      playerVars:{
        autoplay:1,
      },
    }
    const handleclick = (movie)=>{
      if(trailerUrl){
        settrailerUrl('')
      }else{
        movieTrailer(null ,{ tmdbId: movie.id })
        .then((url)=>{
          console.log("url is "+url);
          const urlParams=new URLSearchParams(new URL(url).search);
          console.log("urlParamsn"+urlParams);
          settrailerUrl(urlParams.get("v"));
        })
        .catch((error)=> console.log(error));
}
}
  return (
   
    <div className='row'>
         <h2>{title}</h2>

         <div className='row_posters'>
          {movies.map(movie=>(
            <img key={movie.id} onClick={()=> handleclick(movie)} className={`row_poster ${isLargeRow && "row_posterlarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
          ))}
         </div>
         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}
