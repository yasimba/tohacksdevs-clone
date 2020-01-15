import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import AdminApplications from './admin/admin_applications'
import  Registration from './web/registration'
import Login from './auth/login';
import Account from './admin/account'
import fb from '../firebaseConfig';
import Navbar from './navbar';

function Navigation(){
  const[isLoggedIn,setIsLoggedIn]=useState(false)
  useEffect(()=>{
    fb.auth().onAuthStateChanged(function(user) {
      if (user) {
        setIsLoggedIn(true)       
      } else {
        // No user is signed in.
        setIsLoggedIn(false)
      }      
    })
  },[])


  console.log(isLoggedIn)
  if(isLoggedIn){        
    return(
      <BrowserRouter>
      <div>
      <Navbar />
      <Switch>    
          <Route path="/admin" exact component={AdminApplications} />                              
          <Route path="/account" exact component={Account} />                    
          <Route path="/" component={AdminApplications} />            
    </Switch>
    </div>
    </BrowserRouter>
  )
  }
    return(
        <BrowserRouter>
        <div>        
        <Switch>                
            <Route path="/registration" exact component={Registration} />          
            <Route path="/login" exact component={Login} />          
            <Route path="/" component={Registration} />          
      </Switch>
      </div>
      </BrowserRouter>
    )
}

export default Navigation


