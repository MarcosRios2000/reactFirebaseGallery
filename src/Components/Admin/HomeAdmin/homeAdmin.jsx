import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logoutInitiate } from "../../../Redux/Actions/authActions"; 
import { getUserByIdInitiate, getExcurtionsInitiate, getAllUsersInitiate } from "../../../Redux/Actions/dbActions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


const HomeAdmin = () => {

    const currentUser = useSelector((state) => state.auth.currentUser)
    const users = useSelector((state) => state.db.arrayUsers)
    
    const dispatch = useDispatch()
    
    const history = useHistory()

    useEffect(() => {
        dispatch(getUserByIdInitiate(currentUser?.email))
        dispatch(getExcurtionsInitiate())
        dispatch(getAllUsersInitiate())
    }, [dispatch])

    const handleAuth = function(e) {
        e.preventDefault()
        if(currentUser) {
            dispatch(logoutInitiate())
        }
        history.push('/')
    }


    return(
        <div>
            <div>homadmin</div>
            <Link to='/excurtionCreate'>excursiones</Link>
            <Link to='/uploadImages'>upload</Link>
            <Link to='/imagesByExcurtion'>images</Link>
            <button onClick={(e)=>handleAuth(e)}>Logout</button>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Excurtions</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((el) => {
                            return(
                                <tr key={el.email}>
                                    <td>{el?.email}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.excurtions.toString()}</td>
                                    <td>{el?.active ? 'Active' : 'Blocked'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default HomeAdmin;