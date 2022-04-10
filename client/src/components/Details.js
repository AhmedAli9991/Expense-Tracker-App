import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import DonutChart from 'react-donut-chart';
function Details() {
    const[name,setname]=useState('')
    const[amount,setamount]=useState('')
    const[data,setdata]=useState([])
    const[chart,setChart]=useState([{label:"Nothing added ",value:0}])
    const{id}=useParams()
    useEffect(()=>{
        getData()
      },[])
      const getData=async()=>{
        const response = await axios.get(`http://localhost:8000/Transactions/gettransactions/${id}`)
        setdata(response.data)
        setCharts(response.data)
        
      }
      const setCharts=async(da)=>{
        var c = da.map((e)=>{
          return ({label:e.name,value: e.amount})
        })
        if(c.length!=0)setChart([...c])
     }
      const Delete=async(id)=>{
        await axios.delete(`http://localhost:8000/Transactions/deletetransactions/${id}`)
        getData()
    }
    const handleSubmit=async()=>{
        if(name==''||amount==''){
            alert('missing data')
        }
        else{
            await axios.post(`http://localhost:8000/Transactions/Addtransaction/${id}`,{name,amount})
            setname('')
            setamount('')
            getData()
        }
    }
  return (
    <div className="container inside" style={{margin:80}}>
    <table className="table" id="list" >
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Amount</th> 
        <th scope="col">Remove</th>
      </tr>
    </thead>
    <tbody>

    {data.map((trans) => {
          return (
            <tr scope="row" key={trans.id}>
              <td>{trans.name}</td>
              <td>{trans.amount}</td>
              <td>
              <button className="btn btn-primary" onClick={()=>Delete(trans.id)} >Delete</button>  
              </td>
            </tr>
          );
        })}
        <br/>
                <h6 className=" font-weight-light my-4"> 
                    Add new Expense
                </h6>
        <tr>               
            <td>
            <input  required='required' type="text" placeholder="name" value={name} onChange={(e)=>setname(e.target.value)}/>
            </td>
            <td>
            <input  required='required' type="text" placeholder="amount" value={amount} onChange={(e)=>setamount(e.target.value)}/>                  
            </td>
            <td>
            <input type="button" className="btn btn-primary" value="Add" onClick={handleSubmit} />                  
            </td>
            </tr>
      </tbody>
    </table>
    
    <DonutChart data={chart}/>

   </div>
  );
}

export default Details;