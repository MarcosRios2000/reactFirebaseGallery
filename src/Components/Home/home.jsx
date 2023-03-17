import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logoutInitiate } from "../../Redux/Actions/authActions";
import { useHistory } from "react-router-dom";
import { getUserByIdInitiate } from '../../Redux/Actions/dbActions'



const Home = () => {

    const currentUser = useSelector((state) => state.auth.currentUser)

    const dispatch = useDispatch()
    
    const history = useHistory()


    useEffect(() => {
        dispatch(getUserByIdInitiate(currentUser?.email))
        
    }, [dispatch])
    
    const handleAuth = function(e) {
        e.preventDefault()
        if(currentUser) {
            dispatch(logoutInitiate())
        }
        history.push('/')
    }


    return (
        <div>
            <button onClick={(e)=>handleAuth(e)}>Logout</button>
        </div>
    )
}

export default Home;