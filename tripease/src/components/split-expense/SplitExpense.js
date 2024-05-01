import React,{useEffect,useState} from "react"
import axios from "axios"
import Expense from "../expense-management/Expense"
// import "./SplitExpense.css"
const SplitExpense=()=>
{   
        const [friendsData, setfriendsData] = useState([])
        const [getParticipants,setgetParticipants]=useState([])
        const [participants,setparticipants]=useState([])
        const [showExpense, setShowExpense] = useState(false);
        function close()
        {   
            console.log("xancel")
            setgetParticipants([])
        }
        const createGroup = async () => {
            console.log("called")
            try {
                console.log(participants)
                const response = await axios.post('http://localhost:3000/get-friends-data',{participants})
                
                if (response.data.success) {
                    console.log(response.data.data)
                    setfriendsData(response.data.data)
                }
            }
            catch (error) {

                console.log(error)
            }
            setgetParticipants([])
            setShowExpense(true);
        }
        const fetchParticipants = async () => {
            console.log("called")
            try {

                const response = await axios.get('http://localhost:3000/get-participants')
                
                if (response.data.success) {
                    console.log(response.data.data)
                    setgetParticipants(response.data.data)
                }
            }
            catch (error) {

                console.log(error)
            }
        }
        function addParticipant(value)
        {
            console.log("participant added",value)
            setparticipants(prevParticipants => [...prevParticipants, value])
        }
       /* function createExpense()
        {   
           // console.log("called")
           // <Expense/>
           setShowExpense(true);
        }*/
        
    return(
        <>
        
        
        
        <button type="submit" className="btn btn-primary" onClick={fetchParticipants}>Create Group</button>
       {/*<button type="submit" className="btn btn-primary" onClick={createExpense}>Expense</button>*/}
        {showExpense && <Expense participants={participants}/>}
        {getParticipants.length>0&&<div className="participants">
            <h1>Participants</h1>
        {getParticipants.map((element)=>
        (
            <p className="name" key={element._id}>{element.name}<span className="material-symbols-outlined icon" onClick={()=>addParticipant(element._id)}>
            add
            </span></p>
        ))}
        <div className="buttons">
        <button type="submit" className="btn btn-primary" onClick={close}>Cancel</button>
        <button type="submit" className="btn btn-primary" onClick={createGroup}>Share Expense</button>
        {/*<button type="submit" className="btn btn-primary" onClick={createGroup}>Submit</button>*/}
        </div>
        </div>}
        </>
    )
}
export default SplitExpense