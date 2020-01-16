import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){  
    return (
      <nav>
        <div>
          <Link to="/">           
          </Link>
          <div>
            <ul>             
              <li>
                <Link to="/admin">Home</Link>
              </li>     
              <li>
                <Link to="/account">Account</Link>
              </li>    
              <li>
                <Link to="/hackathon">Hackathon</Link>
              </li>  
            </ul>
          </div>
        </div>
      </nav>
    );  
}