import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loginInitiate, googleSignInInitiate } from "../../Redux/Actions/authActions";



const initialState = {
    email: '',
    password: ''
}
  


export default function Login(){
    const [error, setError] = useState(initialState);
    const [input, setInput] = useState(initialState);

    const currentUser = useSelector((state) => state.auth.currentUser)



    const history = useHistory()

    useEffect(() => {
        if (currentUser){
            history.push('/home')
        }
    }, [currentUser, history])

    const dispatch = useDispatch()

    const handleInputChange = function(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const clearForm = function () {
        setInput(initialState);
      };

    const handleGoogleSignIn = function(e){
        dispatch(googleSignInInitiate())
    }

    const handleSubmit = function(e){
        e.preventDefault()
        if(!input.email || !input.password){
            return
        }
        dispatch(loginInitiate(input.email, input.password))
        clearForm()
    }

    return (
        <div>
            <div>
                Login
            </div>
            <form onSubmit={handleSubmit}> 
                <div>
                {/* onClick={(e) => {handleGoogleSignIn}} */}
                    <button type="button" onClick={handleGoogleSignIn} >
                        Sign In Google
                    </button>
                </div>
                <div>
                    <input 
                    type='email'
                    name='email'
                    value={input.email}
                    onChange={(e)=>handleInputChange(e)}
                    />
                    <input 
                    type='password'
                    name='password'
                    value={input.password}
                    onChange={(e)=>handleInputChange(e)}
                    />
                </div>
                <button
                type='submit'
                >Sign in</button>
                <Link to='/register'>
                    <button>
                        Sign up
                    </button>
                </Link>
            </form>
        </div>
    )
}