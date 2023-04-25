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
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                name='excurtionName'
                value={input?.excurtionName}
                onChange={(e)=>handleInputChange(e)}
                className='adminSeachbar'
                placeholder='Crear excursión'
                />
                <button className='createExcurtionButton'>Crear</button>
            </form>
            <table className='excurtionCreateTable'>
                <thead>
                    <tr style={{backgroundColor: '#b3b3b3'}}>
                        <th>Excursiones</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        excurtions?.map((element, index) => {
                            return(
                                <tr style={index % 2 === 1 ? {backgroundColor: '#b3b3b3'} : {backgroundColor: '#cdcdcd'}} key={index}>
                                    <td>
                                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={'/excurtionCreate/' + element?.name}>
                                            <div>{element?.name}</div>
                                        </Link>
                                    </td>
                                    <td>
                                        <img draggable="false" className='crossExcurtionCreate' alt='' src='/images/ELEMENTOS-03.png' onClick={(e) => deleteExcurtion(e, element?.name)}/>
                                    </td>                               
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExcurtionCreate;