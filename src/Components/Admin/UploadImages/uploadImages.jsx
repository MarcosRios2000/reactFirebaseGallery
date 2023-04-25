import './uploadImages.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { db, storage, firebase } from "../../../Firebase/firebaseConfig";
import * as firestoreKeys from '../../../Firebase/firestoreKeys'
import NavBarAdmin from "../NavBarAdmin/navBarAdmin";


const UploadImages = () => {
    const excurtionsArray = useSelector((state) => state?.db?.arrayExcurtions)
    const [ fileList, setFileList ] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ input, setInput ] = useState('')
    

    const dispatch = useDispatch();

    function handleChange(e) {
        e.preventDefault()
        var filesArr = Array.prototype.slice.call(e.target.files);
        setFileList(filesArr)
        //  setFileList(e.target.files)
    }

    const handleSelectOnChange = function(e){
        setInput(e.target.value)
    }

    const renderImages = () => {
        return fileList.map((file, index) => (
          <div className='uploadIndividualImg' key={file.name}>
            <img draggable="false" src={URL.createObjectURL(file)} alt={file.name} />
            <button className='deleteImgAdmin' onClick={() => handleFileDelete(index)}>Borrar</button>
          </div>
        ));
      };

      
  const handleFileDelete = (index) => {
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFileList([])
    const storageRef = storage.ref();

    fileList.forEach((el) => {
      const imageRef = storageRef.child(`${input}/${el?.name}`);
      const uploadTask = imageRef.put(el);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          imageRef.getDownloadURL().then((url) => {
            const objectUrl = URL.createObjectURL(el);
            db.collection(firestoreKeys?.images)
              .doc(`${input}-${el?.name}`)
              .set({
                url: url,
                excurtion: input,
                name: el?.name,
              })
              .then(() => {
                setInput('')
                document.getElementById('file').value = '';
                setUploadProgress(0);
                URL.revokeObjectURL(objectUrl)
              });
          });
        }
      );
    });
  };

    return(
        <div className='uploadImgContainer'>
          <NavBarAdmin/>
            <form onSubmit={handleSubmit}>
              <select className='selectUpload' name='select' value={input} onChange={(e)=>handleSelectOnChange(e)}>
                <option hidden>Seleccionar excursión</option>
                    {excurtionsArray?.map((el) => {
                        return (
                            <option key={el?.name} value={el?.name}>
                                {el?.name}
                            </option>
                        )
                    })}
              </select>
              <div className='uploadError'>{input === '' ? 'No hay excursión seleccionada' : ''}</div>
              <input 
                  className='adminPhotosFileInput'
                    multiple name="file"
                    id="file"
                    type="file"
                    action="upload.php"
                    onChange= {(e)=>handleChange(e)}
              />
              <label
                htmlFor="file"
                className='uploadImagesButton'
              >Seleccionar imagen</label>
              <div className='uploadError'>{fileList.length === 0 ? 'No hay fotos seleccionadas' : ''}</div>
              <div className='uploadImages' >
                   {renderImages()}
                </div>
              <div className='uploadButtonContainer'>
                <button type={(input === '' || fileList.length === 0) ? 'button' : 'submit'} className={(input === '' || fileList.length === 0) ? 'disabledAdminUploadButton' : 'uploadButton'}>Upload</button>
              </div>  
              <div>
                {uploadProgress > 0 && (
                  <progress value={uploadProgress} max="100">
                    {uploadProgress}%
                  </progress>
                )}  
              </div>  
            </form>
                {/* <div className='uploadImages' >
                   {renderImages()}
                </div> */}
        </div>
    )


}

export default UploadImages