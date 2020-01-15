import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
    import Button from 'react-bootstrap/Button'
    import Bootstrap from "react-bootstrap";
import fb from "../../firebaseConfig";
import "../styles/login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    fb.auth().signInWithEmailAndPassword(email, 
    password).then((data)=>{
        console.log(data)
        window.location.href=`${process.env.REACT_APP_WEB_APP_URL}/admin`
        //localStorage.setItem('')
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        alert(errorMessage)
        // ...
      });
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Form controlId="email" bsSize="large">
          <Form>Email</Form>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form>
        <Form controlId="password" bsSize="large">
          <Form>Password</Form>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}