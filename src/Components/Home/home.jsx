import './home.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logoutInitiate } from "../../Redux/Actions/authActions";
import { useHistory } from "react-router-dom";
import { getUserByIdInitiate } from '../../Redux/Actions/dbActions'
import * as firestoreKeys from '../../Firebase/firestoreKeys'
import { db } from "../../Firebase/firebaseConfig";
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';



const Home = () => {

    const currentUser = useSelector((state) => state.auth.currentUser)
    const user = useSelector((state) => state.db.userById)
    const [images, setImages] = useState(null)
    const [imagesUser, setImagesUser] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [model, setModel] = useState(false)
    const [exitModel, setExitModel] = useState(false)
    const [tempImgSrc, setTempImgSrc] = useState("")

    const dispatch = useDispatch()
    
    const history = useHistory()
    
    const downloadAll = function(e){
        e.preventDefault()
        db.collection(firestoreKeys.images).get().then((querySnapshot) => {
            const dataArray = [];
            querySnapshot.forEach((doc) => {
              dataArray.push(doc.data());
            });
            return dataArray;
          })
          .then((dataArray) => {
            console.log(user)
            const filteredArray = dataArray.filter((image) => user.excurtions.includes(image.excurtion));
            const urls = filteredArray.map((image) => image.url);
            const zip = new JSZip();
            const folderName = 'images';
            const imgFolder = zip.folder(folderName);
            const promises = urls.map((url) => {
                const filename = url.split('/').pop();
                return JSZipUtils.getBinaryContent(url)
                  .then((content) => {
                    imgFolder.file(filename, content, { binary: true });
                  })
                  .catch((err) => {
                    console.error(`Error fetching ${url}`, err);
                  });
              });
              Promise.all(promises).then(() => {
                zip.generateAsync({ type: 'blob' }).then((content) => {
                  const url = URL.createObjectURL(content);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${folderName}.zip`;
                  link.click();
                });
              });
          })
          .then(() => {
            console.log(imagesUser, 'asdasd')
          })
    }

    useEffect(() => {
        dispatch(getUserByIdInitiate(currentUser?.email))
        
    }, [dispatch])
    
    const handleAuth = function(e) {
        e.preventDefault()
        if(currentUser) {
            dispatch(logoutInitiate())
        }
        history.push('/')
    }
    const onNavClick = function(e, excurtion){
        e.preventDefault()
        db.collection(firestoreKeys.images).get().then((querySnapshot) => {
            const dataArray = [];
            querySnapshot.forEach((doc) => {
              dataArray.push(doc.data());
            });
            return dataArray;
          })
          .then((dataArray) => {
            const filteredArray = dataArray.filter((image) => image.excurtion === excurtion);
            setImages(filteredArray)
          })
          .catch((error) => {
            console.log(error);
          });
    }
    function toggleModal(){
      setModalOpen(!modalOpen)
  }
  const getImg = (imgSrc)=>{
      setTempImgSrc(imgSrc);
      setModel(true);
      setTimeout(() => {
          setExitModel(true)
      }, 500)
  }
  function closeModel (e){
      e.preventDefault();
      setModel(false);
      setExitModel(false)
  }

    return (
        <div className='homeContainer'>
          <div className={model ? "model open" : "model"} >
            <img draggable="false" src={tempImgSrc} />
            <img draggable="false" onClick={e => closeModel(e)} className='closeImgHome' src='/images/close.png'/>
          </div>
            <div className='homeTitle'>Bienvenido/a {user?.name} a tu QBook.</div>
            <div className='homeBody'>Descargá las fotos que mas te gusten!</div>
            <div className='homeBody'>Recordá que tu book estará disponible durante 15 días desde que iniciaste sesión</div>
            <div>
                { 
                user?.excurtions?.map((el) => {
                    return (
                        <button className='homeDownload' onClick={(e) => {onNavClick(e, el)}} key={el}>{el}</button>
                    )
                })
                }
            </div>
            <div
             className={images != null ? 'photosCards' : ''}>{
            images != null ?
            images?.map((el) => {
                return (
                  <div className='photoCard' key={el.url}>
                    <img 
                    draggable="false"
                    onClick={()=> getImg(el?.url)}
                    style={{width:"100%"}} alt="" src={el?.url}/>
                    <a href={el.url} target="_blank" rel="noreferrer">
                    <img draggable="false" style={{width:"20px"}} className='downloadButton' alt='' src='/images/IconDescarga.png'/>
                    </a>
                    
                  </div>
                )
                
            }) :
            <div className='homeNoImgText'>Aquí apareceran las fotos de sus excursiones</div>
            }</div>
            <button className="homeLogout" onClick={(e)=>handleAuth(e)}>Cerrar sesión</button>
        </div>
    )
}

export default Home;