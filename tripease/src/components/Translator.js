import React, { useEffect, useState } from "react"
import {message} from "antd"
import axios from "axios"
import axiosInstance from "../interceptors/interceptor"
export default function Translator() {
    const [text,settext]=useState("")
    async function translate()
    {
        console.log(text)
        try {
          const response = await axiosInstance.post("http://localhost:3000/translateText",{text:text})
          console.log(response)
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
    return(
        <>
        hellooooo translator
        <div className="form-group input-field">
                    <label >Text</label>
                    <input type="text"  className="form-control" value={text} onChange={(e)=>settext(e.target.value)} placeholder="Enter text to translate" required="true"/>
                    <button type="submit" onClick={translate}>Translate</button>
                </div>
        </>
    )
}