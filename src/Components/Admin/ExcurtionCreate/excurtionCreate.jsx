import './excurtionCreate.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import * as firestoreKeys from '../../../Firebase/firestoreKeys'
import { db } from "../../../Firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { getUserByIdInitiate, getExcurtionsInitiate } from "../../../Redux/Actions/dbActions";
import NavBarAdmin from "../NavBarAdmin/navBarAdmin";

const initialState = {
    excurtionName: '',
}



const ExcurtionCreate = () => {
    const excurtions = useSelector((state) => state?.db?.arrayExcurtions)

    const [input, setInput] = useState(initialState)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getExcurtionsInitiate())
    }, [dispatch])


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

    const handleSubmit = function(e){
        e.preventDefault()
        db.collection(firestoreKeys.excurtions).doc(input?.excurtionName).set({
            name: input?.excurtionName
        })
        clearForm()
    }
    const deleteExcurtion = function(e, excurtion){
        e.preventDefault()
        db.collection(firestoreKeys.excurtions).doc(excurtion).delete()
    }


    return (
        <div className='excurtionCreateContainer'>
            <NavBarAdmin/>
            <Link to='/homeAdmin'>go back</Link>

            <div>{
                excurtions?.map((element, index) => {
                    return(
                        <div key={element.name}>
                        <Link to={'/excurtionCreate/' + element?.name}>
                        <div key={index}>{element?.name}</div>
                        </Link>
                        <div onClick={(e) => deleteExcurtion(e, element?.name)}>eliminar</div>
                        </div>
                    )
                })
                }</div>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                name='excurtionName'
                value={input?.excurtionName}
                onChange={(e)=>handleInputChange(e)}
                />
                <button>crear</button>
            </form>
        </div>
    )
}

export default ExcurtionCreate;