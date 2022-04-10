import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Register() {
    const navigate = useNavigate()
    const [email,setemail]=useState("")
    const [name,setname]=useState("")
    const [password,setpassword]=useState("")
    const[Confirm,setConfirm]=useState("")
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(name==""||email==""||password==""||Confirm==""){
            alert("fill all the fields")
        }
        else if(password!=Confirm){
            alert("passwords do not match")
        }
        else{
        try    {
        const response = await axios.post("http://localhost:8000/User/Signup",{name,email,password})
        const data = await response.data
        if(data){
            navigate("/", { replace: true });

        }
        else{
            alert("User with this email already exists")
        
        }}catch(err){alert(err)}
    }
    setemail('')
    setpassword('')
    setConfirm('')   
    }    

    return(
        
        <div className="container" >
        <div className="row justify-content-center">
            <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            
                            <div className="form-floating mb-3">
                                <input className="form-control" id="inputemail" value={email} type="email" placeholder="name@example.com" onChange={(e)=>setemail(e.target.value)}/>
                                <label for="inputemail">email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="inputname" value={name} type="text" placeholder="name@example.com" onChange={(e)=>setname(e.target.value)}/>
                                <label for="inputemail">name</label>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-floating mb-3 mb-md-0">
                                        <input className="form-control" id="inputpassword"value={password} type="password" placeholder="Create a password" onChange={(e)=>setpassword(e.target.value)} />
                                        <label for="inputpassword">password</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating mb-3 mb-md-0">
                                        <input className="form-control" id="inputpasswordConfirm" value={Confirm} type="password" placeholder="Confirm password" onChange={(e)=>setConfirm(e.target.value)} />
                                        <label for="inputpasswordConfirm">Confirm password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mb-0">
                            <div className="d-grid"> <button type='Submit' className="btn btn-primary btn-block" >Create Account</button>  
                            </div>
                            </div>
                        </form>
                    </div>



                </div>
            </div>
        </div>
    </div>
    
    )

}