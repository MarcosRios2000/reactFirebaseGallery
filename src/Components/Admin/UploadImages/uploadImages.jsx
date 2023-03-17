import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { db, storage, firebase } from "../../../Firebase/firebaseConfig";
import * as firestoreKeys from '../../../Firebase/firestoreKeys'

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
          <div key={file.name}>
            <img src={URL.createObjectURL(file)} alt={file.name} />
            <button onClick={() => handleFileDelete(index)}>Delete</button>
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
                URL.revokeObjectURL()
              });
          });
        }
      );
    });
  };

console.log(fileList, fileList.length)
    return(
        <div>
            <div>upload</div>
            <form onSubmit={handleSubmit}>
                <input 
                    multiple name="file"
                    id="file"
                    type="file"
                    action="upload.php"
                    onChange={e => handleChange(e)}
                />
                <select value={input} onChange={(e)=>handleSelectOnChange(e)}>
                    <option hidden>Excurtion</option>
                    {excurtionsArray?.map((el) => {
                        return (
                            <option key={el?.name} value={el?.name}>
                                {el?.name}
                            </option>
                        )
                    })}
                </select>
                {uploadProgress > 0 && (
        <progress value={uploadProgress} max="100">
          {uploadProgress}%
        </progress>
      )}
                <div>
                   {renderImages()}
                </div>
                <div>
                    <button>Upload</button>
                </div>    
            </form>
          
            <Link to='/homeAdmin'>Go back</Link>
        </div>
    )


}

export default UploadImages