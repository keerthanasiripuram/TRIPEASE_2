import React, { useState } from 'react'
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"
import {message} from "antd"
import styles from "./Login.module.css"
export default function Login() {
    const [data,setdata]=useState({email:"",password:""})
    const navigate=useNavigate()
    const [toast,settoast]=useState('')
    async function submitForm(e)
    {
        console.log(data)
        e.preventDefault()
        
        //try{
            console.log(data,16)
            //const response=await axios.post("http://localhost:3000/login",data)
            axios.post('/login', data)
            .then((response) => {
            console.log('POST Request Success:', response.data);
            localStorage.setItem("token", response.data.token)
            })
            .catch((error) => {
            console.error('POST Request Error:', error);
            });
            //console.log("response",response)
       /* if(response.data.success)
        {
           //toast.success(response.data.message)
           settoast(response.data.message)
           message.success(response.data.message)
           navigate('/home')
        }
        else{
            //toast.error(response.data.message)
            settoast(response.data.message)
            message.success(response.data.message)
        }
        }
        catch(err)
        {
            settoast("Something went wrong")
        }*/
    }
    console.log(toast)
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
