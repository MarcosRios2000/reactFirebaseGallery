import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { registerInitiate } from "../../Redux/Actions/authActions";

const initialState = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: ''
}

const Register = () => {
    const [error, setError] = useState(initialState);
    const [input, setInput] = useState(initialState);

    const currentUser = useSelector((state) => state.auth.currentUser)

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {
        if(currentUser) {
            history.push('/home')
        }
    }, [currentUser, history])

    const handleInputChange = function(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const clearForm = function () {
        setInput(initialState);
      };


    const handleSubmit = function(e){
        e.preventDefault();
        if(input.password !== input.passwordConfirm){
            return
        }
        dispatch(registerInitiate(input.email, input.password, input.displayName))
        clearForm()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <div>
                    <input
                    type='text'
                    name='displayName'
                    value={input.displayName}
                    onChange={(e)=>handleInputChange(e)}
                    />
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
                    <input 
                    type='password'
                    name='passwordConfirm'
                    value={input.passwordConfirm}
                    onChange={(e)=>handleInputChange(e)}
                    />
                </div>
                <button
                type='submit'
                >Sign up</button>
                <Link to='/'>
                    <button>
                        Go back
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default Register;