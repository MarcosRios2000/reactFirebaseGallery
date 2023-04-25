import './imagesByExcurtion.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { getAllImagesInitiate } from "../../../Redux/Actions/dbActions";
import { Link } from "react-router-dom";
import { db, storage } from "../../../Firebase/firebaseConfig";
import * as firestoreKeys from '../../../Firebase/firestoreKeys'
import NavBarAdmin from "../NavBarAdmin/navBarAdmin";


const ImagesByExcurtion = () => {

    const images = useSelector((state) => state.db.images)
    const excurtions = useSelector((state) => state.db.arrayExcurtions)

    const [selected, setSelected] = useState(null);
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
    const handleButtonClick = (index) => {
        setSelected(index);
      };
console.log(images, 'asd')
    return (
        <div className='imagesByExcurtion'>
            <NavBarAdmin/>
            <div className='excurtionsNavAdmin'>
                {excurtions?.map((el, index) => {
                    return(
                        <div key={el?.name}>
                            <button 
                            className={selected === index ? 'SelectedNavAdmin' : 'notSelectedNavAdmin'}
                            onClick={(e) => {navOnClick(e, images, el?.name)
                            handleButtonClick(index)}}>{el?.name}</button>
                        </div>
                    )
                })}
            </div>
            <div className='adminImgsView'>
                {
                filteredImages?.length === 0 ?
                
                (
                selected === null ?
                    images?.filter(e => e?.excurtion !== undefined)?.map((el) => {
                    return(
                        <div className='adminImgView' key={el?.name}>
                            <img draggable="false" alt="" src={el?.url}/>
                            <button className='adminDeleteImgView' onClick={(e) => deleteImage(e, el?.name, el?.excurtion)}>delete</button>
                        </div>
                    )
                }) 
                :
                <></>
                
                )

                :

                filteredImages?.map((el) => {
                    return(
                        <div className='adminImgView' key={el?.name}>
                            <img draggable="false" alt="" src={el?.url}/>
                            <button className='adminDeleteImgView' onClick={(e) => deleteImage(e, el?.name, el?.excurtion)}>delete</button>
                        </div>
                    )
                })
                
                }
            </div>
        </div>
    )
}


export default ImagesByExcurtion