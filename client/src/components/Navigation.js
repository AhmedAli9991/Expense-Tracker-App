import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Outlet,useNavigate} from "react-router-dom"
import axios from "axios"
const Navigation =(props)=> {
  const navigate = useNavigate()  
  const Logout =async()=>{
      const response = await axios.post("http://localhost:8000/User/Logout")
      props.func()
      navigate("/", { replace: true });
    }
        return (
            <>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-back fixed-top">
           <div className="navbar-nav">
           <Link className="nav-item nav-link " to="/Dashboard">Home </Link>
              <Link className="nav-item nav-link " to="/Dashboard/Add">Add </Link>
              <span style={{position: 'absolute',right: 0}}>
              <button style={{border:0}} className="nav-item nav-link bg-dark"onClick={Logout}>Logout </button>
              </span>
            </div>
           
        </nav >
        <div className='all' >
         
        <Outlet/>
        </div>
        </>
          );
}
 
export default Navigation;