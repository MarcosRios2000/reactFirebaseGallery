import { within } from '@testing-library/react';
import './landingPage.css'
import React from "react";
import { useHistory, Link } from "react-router-dom";




const LandingPage = () => {

const history = useHistory()

const redirectLogin = function(e){
    history.push('/login')
}
const redirectRegister = function(e){
    history.push('/register')
}
    return (
        <div className='landingPageContainer'>
            <ul className="cb-slideshow"><li><span>Image 01</span></li><li><span>Image 02</span></li><li><span>Image 03</span></li><li><span>Image 04</span></li><li><span>Image 05</span></li><li><span>Image 06</span></li>	<li><span>Image 07</span></li></ul>
            <div className='landingBodyContainer'>
                <div className='LandingFirstImages'>
                    <img draggable="false" className='landingBodyLogo' alt='' src='/images/LogoBlanco.png'/>
                    <img draggable="false" className='landingBodyTitle' alt='' src='/images/Bienvenidos.png' />
                    <img draggable="false" className='landingBodyText' alt='' src='/images/BienvenidosSubtitulo.png' />
                </div>
                <div className='landingButtons'>
                    <button onClick={(e) => {redirectLogin(e)}} className='landingButton'>Iniciar sesión</button>
                    <button onClick={(e) => {redirectRegister(e)}} className='landingButton'>Registrarse</button>
                </div>
            </div> 
        </div>
    )
}

export default LandingPage;