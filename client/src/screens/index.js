import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import HackathonApplications from './admin/hackathon_applications'
import  Registration from './web/registration'
import Login from './auth/login';
import Account from './admin/account'
import Hackathon from './admin/hackathon'
import fb from '../firebaseConfig';
import Navbar from './navbar';


function notExists(){
  return(
    <h1>Page not found</h1>
  )
}

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
          <Route path="/admin" exact component={HackathonApplications} />                              
          <Route path="/account" exact component={Account} />                    
          <Route path="/hackathon" exact component={Hackathon} />   
          <Route path="/" component={HackathonApplications} />            
    </Switch>
    </div>
    </BrowserRouter>
  )
  }
    return(
        <BrowserRouter>
        <div>        
        <Switch>                
            <Route path="/registration/:reg_id" exact component={Registration} />          
            <Route path="/login" exact component={Login} />                        
            <Route component={notExists} />      
      </Switch>
      </div>
      </BrowserRouter>
    )
}

export default Navigation


