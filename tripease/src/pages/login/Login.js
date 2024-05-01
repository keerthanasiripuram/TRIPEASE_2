import React, { useState } from 'react'
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"
import {message} from "antd"
import styles from "./Login.module.css"
export default function Login() {
    const [data,setdata]=useState({email:"",password:""})
    const navigate=useNavigate()
    const [toast,settoast]=useState('')
    async function submitForm(e) {
        e.preventDefault()
        axios.post('http://localhost:3000/login', data)
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                navigate('/home')
            })
            .catch((error) => {
                console.error('POST Request Error:', error);
            });
    }

    return (
        <>
        <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
            <img src="/assets/login1.png" alt="not found"/>
            <div className={styles.login}>
            <form>
                <div className={['form-group',styles.inputField]}>
                    <label >Email address</label>
                    <input type="email" className="form-control" value={data.email} onChange={(e)=>{setdata({...data,email:e.target.value})}} placeholder="Enter email" />
                </div>
                <div className={['form-group',styles.inputField]}>
                    <label >Password</label>
                    <input type="password" className="form-control" value={data.password} onChange={(e)=>{setdata({...data,password:e.target.value})}} placeholder="Password" />
                </div>
                <button type="submit" onClick={submitForm} className="btn btn1">Submit</button>
            </form>
            </div>
            </div>
            </div>
        </>
    )
}
