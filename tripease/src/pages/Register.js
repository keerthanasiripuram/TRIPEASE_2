import React ,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {message} from "antd"
//import imgurl from "../../public/assets/"
export default function Register()
{
    const [registerdata,setRegisterdata]=useState({name:"",email:"",phoneNumber:"",password:"",confirmPassword:""})
    const [img,setImg]=useState("")
    const [file, setFile] = useState(null);
    const navigate=useNavigate()

    async function register(e)
    {   
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', file);
        formData.append("registerData", JSON.stringify(registerdata))
        
        try{
            const response=await axios.post("http://localhost:3000/register",formData)
        
        if(response.data.success)
        {
           //toast.success(response.data.message)
           //settoast(response.data.message)
           message.success(response.data.message)
           navigate('/')
        }
        else{
            //toast.error(response.data.message)
            //settoast(response.data.message)
            message.success(response.data.message)
        }
        }
        catch(err)
        {
            //settoast("Something went wrong")
            message.error("something went wrong")
        }
    }
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setFile(event.target.files[0])
        const reader = new FileReader();
    
        reader.onload = (e) => {
          setImg(e.target.result);
        };
    
        reader.readAsDataURL(selectedFile);
      };
    return(
        <>
        <div className='login'>
            <form>
            {img&&(
           <div className="form-group">
                   <img src={img} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>)}
            <div className="form-group">
                    <label >Name</label>
                    <input type="text"  value={registerdata.name} onChange={(e)=>setRegisterdata({...registerdata,name:e.target.value})} placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" value={registerdata.email} onChange={(e)=>setRegisterdata({...registerdata,email:e.target.value})} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label >Phone Number</label>
                    <input type="text" value={registerdata.phoneNumber} onChange={(e)=>setRegisterdata({...registerdata,phoneNumber:e.target.value})} placeholder="Enter Mobile Number" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" value={registerdata.password} onChange={(e)=>setRegisterdata({...registerdata,password:e.target.value})} placeholder="Password" />
                </div>
                <div className="form-group">
                    <label >Confirm Password</label>
                    <input type="password"  value={registerdata.confirmPassword} onChange={(e)=>setRegisterdata({...registerdata,confirmPassword:e.target.value})} placeholder="Enter Confirm Password" />
                </div>
                <div className="form-group">
                    <label >Upload Image</label>
                    <input type="file"  onChange={handleFileUpload}/>
                </div>
                <button type="submit" onClick={register} className="btn btn-primary">Submit</button>
            </form>
            </div>
        </>
    )
}