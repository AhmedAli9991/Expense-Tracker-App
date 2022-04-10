import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './../App.css'
function Dashboard() {
const [data,setdata]=useState("")
useEffect(()=>{
    getData()
  },[])
  const getData=async()=>{
    const response = await axios.get("http://localhost:8000/User/Get")
    setdata(response.data)
  }
  
  return (
    <header className="Header">            
            <div >
            <h3 style={{color:'white'}}>Welcome back {data.name}</h3>
            <p style={{color:'white'}}>
              Expense app to help user manage their monthly expenses and keey track of their expenditure
              this was built using FastAPI Reactjs Postgres this is a commplete expense manager
            </p>

            </div>
    </header>
    
);
}

export default Dashboard;