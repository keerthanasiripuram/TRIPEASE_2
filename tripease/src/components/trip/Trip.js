import React, { useEffect, useState } from "react"
// import "./Trip.css"
import {message} from "antd"
import axios from "axios"
export default function Trip() {
    const[addExpense,setaddExpense]=useState(false)
   const [display,setdisplay]=useState(false)
   const[addTripName,setaddTripName]=useState("")
    const[expenses,setexpenses]=useState({expenseName:"",expenseAmount:""})
    //const[expenseList,setexpenseList]=useState([])
    const[expenseData,setExpenseData]=useState([])
    function addTask()
    {
        setaddExpense(true)
    }
const handleExpenseChange = (propertyName, value) => {
    setexpenses({ ...expenses, [propertyName]: value });

  };

    async function submit()
    {
        setdisplay(true)
        console.log(expenses)
    setexpenses({ expenseName: '', expenseAmount: '' });
    //expenseList.push(expenses)
    //console.log(expenseList)
    /*if (expenseList.length!=0) {
        console.log("called")
        setexpenseList([...expenseList, expenses]);
        // Reset the single expense object after adding it to the list
        setexpenses({ expenseName: "", expenseAmount: "" });
      }
      else
      {
        console.log("called else ")
        setexpenseList([ expenses]);
        // Reset the single expense object after adding it to the list
        setexpenses({ expenseName: "", expenseAmount: "" });
      }*/
      
        try{
            const response=await axios.post("http://localhost:3000/expenseData",expenses)
        
        if(response.data.success)
        {
           message.success(response.data.message)
           
        }
        else{
           
            message.success(response.data.message)
        }
        }
        catch(err)
        {
            
            message.error("something went wrong")
        }

    }
    async function createTripExpense()
    {
        console.log(addTripName)
        try{
            const response=await axios.post("http://localhost:3000/addTripName",{addTripName})
        
        if(response.data.success)
        {
           
           message.success(response.data.message)
           
        }
        else{
           
            message.success(response.data.message)
        }
        }
        catch(err)
        {
            
            message.error("something went wrong")
        }
    }
   async function displayExpenses()
    {
        try{
            const response=await axios.get("http://localhost:3000/displayExpenses")
        console.log(response.data.data)
        if(response.data.success)
        {
            setExpenseData(response.data.data)
           
           message.success(response.data.message)
           
        }
        else{
           
            message.success(response.data.message)
        }
        }
        catch(err)
        {
            
            message.error("something went wrong")
        }
    }
    function closeExpenses()
    {
        setExpenseData([])
    }
    function closeAddExpense()
    {
        setaddExpense(false)
    }
    return(
        <>
        <div className="heading">Expense List</div>
    <div className="outer-container">
    <div className="expenses-container">
    <div className="name-container m-5">
    
    <div className="form-group input-field">
                    <label >Name</label>
                    <input type="text"  className="form-control" value={addTripName} onChange={(e)=>setaddTripName(e.target.value)} placeholder="Enter name" required="true"/>
                </div>
                <button type="submit" onClick={createTripExpense}>Create Trip Expense</button>
        
            <div className="card m-auto my-3" >
                <div className="card-body">
                  <h5 className="card-title">Add an Expense</h5>
                  <a href="#" onClick={addTask} id="anchor"><img src="assets/task_img.jfif"/></a>
                </div>
             
        </div>
    </div>
    {addExpense&&<div className="add-container" id="task_form" >
        <div className="mb-3 mx-5">
            <label htmlFor="task" className="form-label">Expense name</label>
            <input type="text" className="form-control" id="task" value={expenses.expenseName} onChange={(e)=>handleExpenseChange('expenseName', e.target.value)} placeholder="Enter task name"/>
          </div>
          <div className="mb-3 mx-5">                                                       
            <label htmlFor="desc" className="form-label">Expense Amount</label>
            <textarea className="form-control" id="desc" rows="3" value={expenses.expenseAmount} onChange={(e)=>handleExpenseChange('expenseAmount', e.target.value)}></textarea>
          </div>
          <button className="mx-5" id="submit" type="submit" onClick={submit}>Submit</button>
          <button className="mx-5" id="delete" type="submit" onClick={closeAddExpense}>Cancel</button>
    </div>
    }
    </div>
    <div className="list-container">
    <div className="container my-5 mx-5" style={{backgroundColor: "antiquewhite"}}>
        <h2>Lists of Tasks are:</h2>
        
        <button id="show-btn" onClick={displayExpenses} >Show</button>
        <button id="close" onClick={closeExpenses}>Close</button>
        <br/>    
    </div>
{expenseData&&expenseData.map((element)=>
        (
            <p key={element.expenseName}>
                <div id="show-items">
           Expense Name:<div id="taskname">{element.expenseName}</div>
            <br/>
            Expense Amount:<div id="taskdesc">{element.expenseAmount}</div>
        </div>

            </p>
        ))}
        </div>
        </div>
        </>
    )
}