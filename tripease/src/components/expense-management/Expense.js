import React, { useEffect, useState } from "react"
import {message} from "antd"
import axiosInstance from "../../interceptors/interceptor"
import styles from "./Expense.module.css"
export default function Expense({ participants }) {
    console.log(participants)
    
    const participantsSplitFactor = [
        { splittingFactor: 0.4 },
        { splittingFactor: 0.6 }
    ];
    const [totExpenses, settotExpenses] = useState("")
    const [evenAmount, setevenAmount] = useState("")
    const [proportionAmount, setproportionAmount] = useState("")
    const[names,setnames]=useState([])
    const[displaynames,setdisplaynames]=useState(false)
    const[amount,setamount]=useState("")
    function splitEvenly(amount) {
        console.log(participants, amount)
        const individualAmount = amount / (participants.length);
        console.log(individualAmount)
        setevenAmount(individualAmount)
    }
    function splitOnPropotions(amount, proportions) {
        const totalSplittingFactor = participantsSplitFactor.reduce((acc, participant) => acc + participant.splittingFactor, 0);
        console.log(totalSplittingFactor)
        participantsSplitFactor.map(participant => {
            const participantAmount = (amount * participant.splittingFactor) / totalSplittingFactor;
            console.log(participantAmount);
            setproportionAmount(proportionAmount)
            console.log(amount)
        });
        console.log(displaynames)
        console.log(amount)
        setdisplaynames(true)
    }
    async function fetchParticipantNames()
    {
        console.log("names",participants)
        try {
          const response = await axiosInstance.post("http://localhost:3000/fetchNames",{participants:participants})
          console.log(response.data.data)
          setnames(response.data.data)
          if (response.data.success) {
            message.success(response.data.message)
            
          }
          else {
    
            message.success(response.data.message)
          }
        }
        catch (err) {
    
          message.error("something went wrong")
        }
    }
   useEffect(
    ()=>{
        fetchParticipantNames()
    },[]
    )
    return (
        <div className={styles.expenseContainer}>
            <p>Expense Form</p>
            <div>
                <div className="form-group input-field">

                    <input type="text" className="form-control" value={totExpenses} onChange={(e) => settotExpenses(e.target.value)} placeholder="Enter Total Expenses" required="true" />
                </div>
                {totExpenses && <p>Total Expense:{totExpenses}</p>}
                <div className={styles.buttons}>
                    <button type="submit" className={[styles.btn,"btn-success"]} onClick={() => splitEvenly(totExpenses)}>Split Evenly</button>
                    {evenAmount && <p>Split is:{evenAmount}</p>}
                    <button type="submit" className={[styles.btn,"btn-danger"]} onClick={() => splitOnPropotions(totExpenses, participantsSplitFactor)}>splitOnPropotions</button>
                </div>
                {displaynames&&proportionAmount && <p>Split is:{proportionAmount}</p>}
                    {names.map((name)=>
                    (   <div key={name}>
                        <p  >{name}---</p>
                        <input type="text" value={amount} onChanges={(e)=>setevenAmount(e.target.value)}></input>
                        </div>
                    ))}
            </div>
            
            </div>
            )
}