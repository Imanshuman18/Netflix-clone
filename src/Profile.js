import React from 'react'
import "./Profile.css"
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { auth } from './firebase'
import { Link, useNavigate } from 'react-router-dom'
import PlanScreen from './PlanScreen'

function Profile() {
    const navigate = useNavigate();
    const user = useSelector(selectUser)



    return (
        <div className='profile'>
            <Nav />
            <div className="profile_body">
                <h1>Edit Profile</h1>
                <div className="profile_info">
                    <img src="navavatar.png" alt="" />
                    <div className="profile_details">
                        <h2>{user.email}</h2>
                        <div className="profile_plan">
                            <h3>Plans</h3>
                            <PlanScreen/>
                            <Link to='/'>
                              <button onClick={() => auth.signOut()} className='profile_signout'>Sign Out</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile