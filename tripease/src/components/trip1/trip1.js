import React, { useState, useEffect } from "react"
import styles from "./trip1.module.css"
import { message } from "antd"
import { Modal, Form } from 'antd'
import axios from "axios"
import axiosInstance from "../../interceptors/interceptor"
export default function Trip1() {
    const [showModal, setshowModal] = useState(false)
    const [ExpenseModal, setExpenseModal] = useState(false)
    const [title, settitle] = useState("")
    const [expenses, setexpenses] = useState({ expenseName: "", expenseAmount: "" })
    const [expenseData, setExpenseData] = useState([])
    const [tripData, settripData] = useState([])
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        showTripList()
    }, [])
    async function showTripList() {
        try {
            const response = await axiosInstance.get("http://localhost:3000/displayTripList")
            console.log(response.data.data)
            if (response.data.success) {
                settripData(response.data.data)
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
    function createTrip() {
        console.log("trip created")
        setshowModal(true)
    }
    // const handleSubmit=()=>
    // {
    //     console.log(title)
    // }
    const handleExpenseChange = (propertyName, value) => {
        setexpenses({ ...expenses, [propertyName]: value });

    };

    async function handleSubmit() {
        console.log(title)
        try {
            const response = await axiosInstance.post("http://localhost:3000/addTripName", { title })

            if (response.data.success) {

                message.success(response.data.message)
                setExpenseModal(true)

            }
            else {

                message.success(response.data.message)
            }
        }
        catch (err) {

            message.error("something went wrong")
        }
    }
    async function handleExpense() {

        console.log(expenses)
        // setexpenses({ expenseName: '', expenseAmount: '' });
        try {
            const response = await axiosInstance.post("http://localhost:3000/expenseData", expenses)

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
    async function displayExpenses() {
        try {
            const response = await axiosInstance.get("http://localhost:3000/displayExpenses")
            console.log(response.data.data)
            if (response.data.success) {
                setExpenseData(response.data.data)

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
    async function selectedTripData(val) {
        console.log(val)
        try {
            const response = await axiosInstance.post("http://localhost:3000/displaySelectedTripData", { selectedTripName: val })
            console.log(response.data.data)
            if (response.data.success) {
                setExpenseData(response.data.data)

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
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
      };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          //console.log(searchText)
          selectedTripData(searchText)
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <div className={styles.createGroupContainer}>
                        <p>Trips</p>
                        <span className="material-symbols-outlined" onClick={createTrip}>
                            add
                        </span>
                        <Modal
                            open={showModal}
                            onCancel={() => setshowModal(false)}
                        >
                            <Form layout="vertical" onFinish={handleSubmit}>

                                <label >Trip Name</label>
                                <input type="text" name="images" multiple className="form-control" value={title} onChange={(e) => settitle(e.target.value)} />


                                <div className="d-flex justify-content-end">
                                    <button className={styles.btn} type="submit" >SAVE</button>
                                </div>
                            </Form>
                        </Modal>
                        <Modal
                            open={ExpenseModal}
                            onCancel={() => setExpenseModal(false)}
                        >
                            <Form layout="vertical" onFinish={handleExpense}>

                                <label >Expense Name</label>
                                <input type="text" className="form-control" value={expenses.expenseName} onChange={(e) => handleExpenseChange('expenseName', e.target.value)} />

                                <label>Expense Amount</label>
                                <input type="text" className="form-control" value={expenses.expenseAmount} onChange={(e) => handleExpenseChange('expenseAmount', e.target.value)} />
                                <div className="d-flex justify-content-end">
                                    <button className={styles.btn} type="submit" >SAVE</button>
                                </div>
                            </Form>
                        </Modal>
                    </div>
                    <div className={styles.displayContainer}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}/>
                            
                        <div className={styles.triplist}>
                            {tripData && tripData.map((element) =>
                            (
                                <p onClick={() => { selectedTripData(element.budgetName) }}>{element.budgetName}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.header}>
                        <p>History</p>
                    </div>
                    {expenseData && expenseData.map((element) =>
                    (
                        <p key={element.expenseName}>
                            <div className={styles.showExpenses}>
                                <div className={styles.showExpenseName} >
                                    <p>Expense Name:</p>
                                    <p>{element.expenseName}</p>
                                </div>
                                <div className={styles.showExpenseAmount} >
                                    <p>Expense Amount:</p>
                                    <p>{element.expenseAmount}</p>
                                </div>
                            </div>

                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}
