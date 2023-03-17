import './landingPage.css'
import React from "react";
import { useHistory, Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className='landingPageContainer'>
            <ul className="cb-slideshow"><li><span>Image 01</span></li><li><span>Image 02</span></li><li><span>Image 03</span></li><li><span>Image 04</span></li><li><span>Image 05</span></li><li><span>Image 06</span></li>	<li><span>Image 07</span></li></ul>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default LandingPage;