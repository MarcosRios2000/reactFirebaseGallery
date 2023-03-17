import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { getAllImagesInitiate } from "../../../Redux/Actions/dbActions";
import { Link } from "react-router-dom";
import { db, storage } from "../../../Firebase/firebaseConfig";
import * as firestoreKeys from '../../../Firebase/firestoreKeys'


const ImagesByExcurtion = () => {

    const images = useSelector((state) => state.db.images)
    const excurtions = useSelector((state) => state.db.arrayExcurtions)

    const [ excurtionNav, setExcurtionNav ] = useState('')
    const [ filteredImages, setFilteredImages ] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllImagesInitiate())
        
    }, [dispatch])

    const deleteImage = function(e, imageName, excurtionName){
        e.preventDefault()
        const storageRef = storage.ref()
        const fileRef = storageRef.child(`${excurtionName}/${imageName}`)
        fileRef.delete().then(() => {
            db.collection(firestoreKeys.images).doc(`${excurtionName}-${imageName}`).delete()
        })
        if(filteredImages?.length !== 0){
            const newFilter = filteredImages?.filter((el) => {
                return el?.name !== imageName
            })
            setFilteredImages(newFilter)
        }  
    }

    const navOnClick = function(e, images, excurtion){
        e.preventDefault()
        const filtered = images?.filter(el => {
            return  el?.excurtion === excurtion
        })
        setFilteredImages(filtered)
    }

    return (
        <div>
            <Link to='/homeAdmin'>go back</Link>
            <div>
                {excurtions?.map((el) => {
                    return(
                        <div key={el?.name}>
                            <button onClick={(e) => {navOnClick(e, images, el?.name)}}>{el?.name}</button>
                        </div>
                    )
                })}
            </div>
            <div>
                {
                filteredImages?.length === 0 ?
                
                images?.map((el) => {
                    return(
                        <div key={el?.name}>
                            <img alt="" src={el?.url}/>
                            <button onClick={(e) => deleteImage(e, el?.name, el?.excurtion)}>delete</button>
                        </div>
                    )
                }) 

                :

                filteredImages?.map((el) => {
                    return(
                        <div key={el?.name}>
                            <img alt="" src={el?.url}/>
                            <button onClick={(e) => deleteImage(e, el?.name, el?.excurtion)}>delete</button>
                        </div>
                    )
                })
                
                }
            </div>
        </div>
    )
}


export default ImagesByExcurtion