import './register.css'
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
    const redirectlogin = function(e){
        history.push('/login')
    }

    const valiateInput = function(e){
        let { name } = e.target;
        if(name === 'displayName'){
            if (!/^[a-zA-Z\u00C0-\u00FF ]*$/.test(e.target.value) || /^\s/.test(e.target.value) || e.target.value === "") {
                setError({ ...error, [name]: "Formato inválido" });
              } else {
                setError({ ...error, [name]: "" });
              }
        }
        if(name === 'email'){
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                setError({ ...error, [name]: "Email incorrecto" });
              } else {
                setError({ ...error, [name]: "" });
              }
        }
        if(name === 'password'){
            if (e.target.value.length < 6 || e.target.value === "") {
                setError({ ...error, [name]: "Por lo menos 6 letras" });
              } else {
                setError({ ...error, [name]: "" });
              }
        }
        if(name === 'passwordConfirm'){
            if (e.target.value !== input.password) {
                setError({ ...error, [name]: "Las contraseñas deben coincidir" });
              } else {
                setError({ ...error, [name]: "" });
              }
        }
    }

    return (
        <div className='registerContainer'>
            <form onSubmit={handleSubmit}> 
                <img draggable="false" className="loginLogo" src="/images/Logo.png" alt="logoBlancologin"/>
                <div className='registerTittle'>Te damos la bienvenida a QBook</div>
                <div className='registertext'>Completá los siguientes datos para ingresar y descargar tu book.</div>
                <div className='registerInputs'>
                    <div className='registerBoth'> 
                        <div className='registerInputError'>
                            <input
                            className='registerInput'
                            type='text'
                            name='displayName'
                            value={input.displayName}
                            onChange={(e)=>{handleInputChange(e)
                            valiateInput(e)}}
                            placeholder='Nombre y apellido'
                            />
                            <div className="errorRegister">{error?.displayName}</div>
                        </div>
                        <div className='registerInputError'>
                            <input 
                            type='email'
                            name='email'
                            value={input.email}
                            onChange={(e)=>{handleInputChange(e)
                            valiateInput(e)}}
                            placeholder='Email'
                            />
                            <div className="errorRegister">{error?.email}</div>
                        </div>
                    </div>
                    <div className='registerBoth'>
                        <div className='registerInputError'>
                            <input 
                            type='password'
                            name='password'
                            value={input.password}
                            onChange={(e)=>{handleInputChange(e)
                            valiateInput(e)}}
                            placeholder='Contraseña'
                            />
                            <div className="errorRegister">{error?.password}</div>
                        </div>
                        <div className='registerInputError'>
                            <input 
                            type='password'
                            name='passwordConfirm'
                            value={input.passwordConfirm}
                            onChange={(e)=>{handleInputChange(e)
                            valiateInput(e)}}
                            placeholder='Confirma contraseña'
                            />
                            <div className="errorRegister">{error?.passwordConfirm}</div>
                        </div>
                    </div>
                </div>
                <button
                className='registerButton'
                type='submit'
                >Sign up</button>
                <div className='registerToRegister'>
                            <div>Ya tenes cuenta?</div>
                        <button className='registerToLoginButton' onClick={(e) => redirectlogin(e)}>
                            Inicia sesión
                        </button>
                            </div>  
            </form>
        </div>
    )
}

export default Register;