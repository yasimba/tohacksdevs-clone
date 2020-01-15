import React, {useState} from 'react';
import fb from "../../firebaseConfig";
import '../styles/registration.css';

export default function Account(){
    const logout = () => {
        fb.auth().signOut().then(function() {            
            window.location.href=`${process.env.REACT_APP_WEB_APP_URL}/`
          }).catch(function(error) {   
              alert(error)         
          });
    }
    return(
        <button className="btn" onClick={()=>logout()}>Logout</button>
    )
}