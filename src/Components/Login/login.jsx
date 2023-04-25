import './login.css'
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
    const validateInput = function (e) {
        let { name } = e.target;

        if (name === "email") {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
            setError({ ...error, [name]: "Mail incorrecto" });
          } else {
            setError({ ...error, [name]: "" });
          }
        }
        if (name === "password") {
          if (e.target.value.length < 6) {
            setError({ ...error, [name]: "Minimo seis caracteres" });
          } else {
            setError({ ...error, [name]: "" });
          }
        }
       
      };

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

    const redirectRegister = function(e){
        history.push('/register')
    }
    console.log(error)
    return (
        <div className='loginContainer'>
            <form onSubmit={handleSubmit}> 
                <div className='loginFormDiv'>
                <img draggable="false" className="loginLogo" src="/images/Logo.png" alt="logoBlancologin"/>
                <div className="loginWelcome">Te damos la bienvenida a tu QBOOK</div>
                    <div className='loginInputs'>
                        <input 
                        type='email'
                        name='email'
                        value={input.email}
                        onChange={(e)=>{handleInputChange(e)
                            validateInput(e)
                        }}
                        placeholder='Email'
                        />
                        <div className="errorLogin">{error?.email}</div>
                        <input 
                        type='password'
                        name='password'
                        value={input.password}
                        onChange={(e)=>{handleInputChange(e)
                            validateInput(e)
                        }}
                        placeholder='Contraseña'
                        />
                        <div className="errorLogin">{error?.password}</div>
                    </div>
                     <div className='buttonsLogin'>
                    <button
                    className='loginButton'
                    type='submit'
                    >Iniciar sesión</button>
                    <div>o</div>
                        <button className='signInGoogleButton' type="button" onClick={handleGoogleSignIn} >
                            <img draggable="false" className='googleImageLogin' src='/images/google.png' alt=''/>
                            Continuar con Google
                        </button> 
                           <div className='loginToRegister'>
                            <div>Nuevo aqui?</div>
                        <button className='loginToRegisterButton' onClick={(e) => redirectRegister(e)}>
                            Registrate
                        </button>
                            </div>                    
                    </div>
                </div>
            </form>
        </div>
    )
}