import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Login(props) {
    axios.defaults.withCredentials = true;
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const navigate = useNavigate()
    const handleSubmit=async (e) =>{
        e.preventDefault();
       try{
        const response = await axios.post("http://localhost:8000/User/Login",{email,password})
        setemail('')
        setpassword('')
        const data = response.data
        console.log(data)
        if(data){
            props.func()
            navigate("/Dashboard", { replace: true });
        }
        else{
            alert("Invalid Cedentials")
        }
    }catch(err){
        alert(err)
    }
    }
  return (
    <div className="container">
    <div className="row justify-content-center">
        <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                <div className="card-body">
                <form onSubmit={handleSubmit}> 
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputemail" value={email} type="email" placeholder="name@example.com" onChange={(e)=>setemail(e.target.value)}/>
                            <label htmlFor="email"className="form-label">email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputpassword" value={password} type="password" placeholder="password" onChange={(e)=>setpassword(e.target.value)}/>
                            <label htmlFor="password"className="form-label">password</label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" id="inputRememberpassword" type="checkbox" value="" />
                            <label htmlFor="check" className="form-check-label" for="inputRememberPas1sword">Remember password</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0"> 
                            <Link className="small" to="Register">Don't have an account?</Link>
                            <button type='Submit' className="btn btn-primary" >Login</button>  
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
</div>
  );
}

export default Login;