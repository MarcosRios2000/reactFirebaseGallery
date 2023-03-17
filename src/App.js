import logo from './logo.svg';
import './App.css';
import { auth, firebase, db } from './Firebase/firebaseConfig' 
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './Components/LandingPage/landingPage';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Home from './Components/Home/home';
import HomeAdmin from './Components/Admin/HomeAdmin/homeAdmin';
import ExcurtionCreate from './Components/Admin/ExcurtionCreate/excurtionCreate';
import { useSelector } from 'react-redux'
import { useState } from 'react'
import UploadImages from './Components/Admin/UploadImages/uploadImages';
import ImagesByExcurtion from './Components/Admin/ImagesByExcurtion/imagesByExcurtion';
import ExcurtionDetail from './Components/Admin/ExcurtionDetail/excurtionDetail';





function App() {
  const user = useSelector((state) => state.auth.currentUser)
  const rol = useSelector((state) => state?.db?.userById)


  const [ globalUser, setGlobalUser ] = useState(null)

  auth.onAuthStateChanged(user => { 
    user ? setGlobalUser(user) : setGlobalUser(null)
  });

  return (
    <BrowserRouter>
      <div className='appContainer'>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/home' render={()=>{
            return rol?.rol === 'admin' ? <Redirect to='/homeAdmin'/> : <Home/>
          }}
          />
        <Route exact path='/homeAdmin' render={()=>{
            return rol?.rol !== 'admin' ? <Redirect to='/home'/> : <HomeAdmin/>
          }}
          />
          <Route exact path='/excurtionCreate' render={()=>{
            return rol?.rol !== 'admin' ? <Redirect to='/login'/> : <ExcurtionCreate/>
          }}
          />
          <Route exact path='/uploadImages' render={()=>{
            return rol?.rol !== 'admin' ? <Redirect to='/login'/> : <UploadImages/>
          }}
          />
          <Route exact path='/imagesByExcurtion' render={()=>{
            return rol?.rol !== 'admin' ? <Redirect to='/login'/> : <ImagesByExcurtion/>
          }}
          />
           <Route exact path='/excurtionCreate/:id' render={()=>{
            return rol?.rol !== 'admin' ? <Redirect to='/login'/> : <ExcurtionDetail/>
          }}
          />
      </div>
    </BrowserRouter>
  );
}

export default App;
