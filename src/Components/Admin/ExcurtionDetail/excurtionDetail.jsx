import './excurtionDetail.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import * as firestoreKeys from '../../../Firebase/firestoreKeys'
import { db, firebase } from "../../../Firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { getAllUsersInitiate } from "../../../Redux/Actions/dbActions";
import NavBarAdmin from "../NavBarAdmin/navBarAdmin";



const ExcurtionDetail = () => {

    const users = useSelector((state) => state.db.arrayUsers)

    const [ checkInput, setCheckInput ] = useState({})
    const [ anyChanges, setAnyChanges ] = useState(false)
    const [ usersAffected, setUsersAffected ] = useState([])


    const { id } = useParams()

    const dispatch = useDispatch()

    
    const initializeCheckbox = function(users){
        users.forEach((el) => {
            if(el?.excurtions.includes(id)){  
                setCheckInput(prevState => ({
                    ...prevState,
                    [el.email]: true
                }))
            }
        })
    }

    useEffect(() => {
        dispatch(getAllUsersInitiate())
        if(users){
            initializeCheckbox(users)
        }
    }, [dispatch])

    const onCheckboxChange = function(e, user){
        setAnyChanges(true)
        const { name, checked } = e.target
        setCheckInput(prevState => ({
            ...prevState,
            [name]: checked,
            user: user
        }))
    }

    const onCheckboxChangeAffectedUsers = function(e, user){
        const array = usersAffected
        if(usersAffected.includes(user)){
            setUsersAffected(array)
        } else {
            array.push(user)
            setUsersAffected(array)
        }
    }
    
    const handleSubmit = function(e){
        e.preventDefault()
        usersAffected.forEach((el) => {
            db.collection(firestoreKeys.users).doc(el.email).get().then((user) => {
                let arrayEx = user.data().excurtions 
                if(checkInput[el.email]){
                    if(!arrayEx.includes(id)){
                        arrayEx.push(id)
                        let string = el.email
                        db.collection(firestoreKeys.users).doc(el.email).update({
                           'excurtions': firebase.firestore.FieldValue.arrayUnion(id)
                        })
                    }
                } else {
                    if(arrayEx.includes(id)){
                        let index = arrayEx.indexOf(id)
                        arrayEx.splice(index, 1);
                        db.collection(firestoreKeys.users).doc(el.email).update({
                            'excurtions': firebase.firestore.FieldValue.arrayRemove(id)
                        })
                        .catch((err) => console.log(err.massage))
                    }
                }
            })
        })
        setAnyChanges(false)
        setUsersAffected([])
    }

    const handleCancel = function(e){
        setAnyChanges(false)
    }

console.log(checkInput, 'check')
    return (
        <div className="adminDetailContainer">
            <NavBarAdmin/>
            <table>
                <thead>
                    <tr style={{backgroundColor: '#b3b3b3'}}>
                        <th> </th>
                        <th>Email</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                        {
                        users?.map((el, index) => {
                            return (
                                <tr style={index % 2 === 1 ? {backgroundColor: '#b3b3b3'} : {backgroundColor: '#cdcdcd'}} key={el.name}>
                                    <td>
                                    <input
                                    type='checkbox'
                                    name={el.email}
                                    value={checkInput[el.email]}
                                    checked={checkInput[el.email]}
                                    onChange={(e) => {onCheckboxChange(e, el)
                                        onCheckboxChangeAffectedUsers(e, el)
                                    }}
                                    /> 
                                    </td>
                                    <td>{el.email}</td>
                                    <td>{el.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                {
                    anyChanges ? 
                    <div>
                        <button onClick={(e) => handleSubmit(e)}>Accept</button>
                        <button onClick={(e) => handleCancel(e)}>Cancel</button>
                    </div> :
                    <></>
                }
            </div>
        </div>
    )
}

export default ExcurtionDetail