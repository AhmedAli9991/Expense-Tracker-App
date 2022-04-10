import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Add() {

    const[month,setmonth]=useState('')
    const[year,setyear]=useState('')
    const[Months,setMonths]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        getData()
    },[])
    const getData=async()=>{
        const response = await axios.get("http://localhost:8000/Month/getMonth")
    setMonths(response.data)
    }
    const Delete=async(id)=>{
        await axios.delete(`http://localhost:8000/Month/delete/${id}`)
        getData()
    }
    const handleSubmit=async()=>{
        if(month==''||year==''){
            alert('missing data')
        }
        else{
            await axios.post("http://localhost:8000/Month/addMonth",{month,year})
            setmonth('')
            setyear('')
            getData()
    
          }
    }
  
  return (
      <div className="container inside" style={{margin:80}}>
      <table className="table" id="list">
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">year</th> 
            <th scope="col">Total Expense</th> 
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>

        {Months.map((months) => {
              return (
                <tr scope="row" key={months.Month.id}>
                  <td  onClick={()=>{navigate(`/Dashboard/${months.Month.id}`, { replace: true })}} >{months.Month.month}</td>
                  <td>{months.Month.year}</td>
                  {console.log(months.amount)}
                  <td>{months.amount}</td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>Delete(months.Month.id)} >Delete</button>  
                  </td>
                </tr>
              );
            })}
            <br/>
                    <h6 className=" font-weight-light my-4"> 
                        Add new Month
                    </h6>
            <tr>               
                <td>
                <input  required='required' type="text" placeholder="month" value={month} onChange={(e)=>setmonth(e.target.value)}/>
                </td>
                <td>
                <input  required='required' type="text" placeholder="year" value={year} onChange={(e)=>setyear(e.target.value)}/>                  
                </td>
                <td>
                <input type="button" className="btn btn-primary" value="Add" onClick={handleSubmit} />                  
                </td>
                </tr>
          </tbody>
      </table>
   </div>
  );

}

