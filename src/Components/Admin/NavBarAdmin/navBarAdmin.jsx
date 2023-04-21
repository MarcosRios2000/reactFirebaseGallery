import './navBarAdmin.css'
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logoutInitiate } from '../../../Redux/Actions/authActions';
import { Link } from "react-router-dom";

const NavBarAdmin = () => {
    const currentUser = useSelector((state) => state.auth.currentUser)
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleAuth = function(e) {
        e.preventDefault()
        if(currentUser) {
            dispatch(logoutInitiate())
        }
        history.push('/')
    }
    return (
        <div className='homeAdminNav'>
             <div className='homeAdminLogout'>
                <button className='homeAdminTag'>Administrador</button>
                <button className='homeAdminLogoutButton' onClick={(e)=>handleAuth(e)}>Cerrar sesión</button>
            </div>
            <Link to='/homeAdmin'>
                <button className={`${location.pathname==="/homeAdmin" ? "activeNavTernary" : "navButtons"}`}>Usuarios</button>
            </Link>
            <Link to='/excurtionCreate'>
                <button className={`${location.pathname==="/excurtionCreate" ? "activeNavTernary" : "navButtons"}`}>Excursiones</button>
            </Link>
            <Link to='/uploadImages'>
                <button className={`${location.pathname==="/uploadImages" ? "activeNavTernary" : "navButtons"}`}>Subir imagenes</button>
            </Link>
            <Link to='/imagesByExcurtion'>
                <button className={`${location.pathname==="/imagesByExcurtion" ? "activeNavTernary" : "navButtons"}`}>Ver imagenes</button>
            </Link>
            </div>
    )
}

export default NavBarAdmin
            