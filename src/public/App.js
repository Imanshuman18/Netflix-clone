import React, { useEffect } from 'react'
import Row from './Row'
import requests from './requests'
import Banner from './Banner'
import Nav from './Nav'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice'
import Profile from './Profile'



export default function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
    })
    return unsuscribe
  }, [dispatch])
  return (


    <Router>
      <div className='app'>
        <Routes>
          {!user ? (
            <Route path='/' element={<Login />} />
          ) : (

            <>
              <Route path='/profile' element={<Profile />} />
              <Route path='/' element={[<Nav />, <Banner />, <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />, <Row title="Tredning Now" fetchUrl={requests.fetchTrending} />, <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />, <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />, <Row title="Comedy movies" fetchUrl={requests.fetchComedyMovies} />, <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />, <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />, <Row title="Documentaries" fetchUrl={requests.fetchDocumantaries} />]} />

            </>
          )}



        </Routes>
      </div>
    </Router>

  )
}


