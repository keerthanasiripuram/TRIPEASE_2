import React, { useEffect,useState } from "react"
import { Modal, Form } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {message} from "antd"
import axiosInstance from "../../interceptors/interceptor"
 import styles from "./DocumentManagement.module.css"

export default function DocumentManagement()
{   
  //const imageUrl = `http://localhost:3000/TripEase/backend/uploadJournal/${participants[0]}`;
    const [showDocUpload, setShowDocUpload] = useState(false);
    const[display,setdisplay]=useState(false)
    const[phoneNumber,setphoneNumber]=useState("")
    const[otp,setotp]=useState("")
    const[documents,setdocuments]=useState([])
    function DocUpload()
    {
        setShowDocUpload(true)
        console.log(showDocUpload)
    }
    function DisplayDocs()
    {
        setdisplay(true)
    }
    async function requestOTP()
    {   try{
        console.log(phoneNumber)
        const response = await axiosInstance.post("http://localhost:3000/request-OTP", {phoneNumber})

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
    const [showModal, setShowModal] = useState(false)
  const [img, setImg] = useState("")
  const [file, setFile] = useState(null);
  const handleSubmit = async(values) => {
    let DocumentData = new FormData();
    for(let i=0;i<Array.from(file).length;i++){
      DocumentData.append("images", file[i]);
    }
    for (var key of DocumentData.entries()) {
			console.log(key)
		}
        console.log(DocumentData,file)
        try {
          const response = await axiosInstance.post("http://localhost:3000/uploadDoc", DocumentData)
    
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

    
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setFile(event.target.files)
        const reader = new FileReader();
      
        reader.onload = (e) => {
          setImg(e.target.result);
        };
      
        reader.readAsDataURL(selectedFile);
      };
      async function checkValidity()
      {
        console.log(otp)
        try {
          const response = await axiosInstance.post("http://localhost:3000/checkValidity",{otp:otp})
          console.log(response.data.data)
          if (response.data.success) {
            setdocuments(response.data.data)
           // console.log(documents)
            message.success(response.data.message)
            
          }
          else {
    
            message.success(response.data.message)
          }
        }
        catch (err) {
    
          message.error("something went wrong")
        }
        setdisplay(false)
      }
   return(
    <>
    <button type="submit" onClick={DisplayDocs}>Display Documents</button>
    <button type="submit"
                onClick={() => {

                  setShowModal(true)
                }} >Upload Documents</button>
    <Modal
    open={showModal}
    onCancel={() => setShowModal(false)}
  >
    <Form layout="vertical" onFinish={handleSubmit} >
      {img && (
        <div className={["form-group input-field"]}>
          <img src={img} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>)}
      <div className={["form-group input-field"]}>
        <label >Upload Image</label>
        <input type="file" name="images" multiple className="form-control" onChange={handleFileUpload} />
      </div>
      
      <div className="d-flex justify-content-end">
        <button className={[styles.btn,"btn-primary"]} type="submit" >SAVE</button>
      </div>
    </Form>
  </Modal>
    {display&&
    <div className={styles.otpContainer}>
    <div className="form-group input-field">
                    <label >Phone Number</label>
                    <input type="text" className="form-control" value={phoneNumber} onChange={(e)=>setphoneNumber(e.target.value)} placeholder="Enter Mobile Number" />
                </div>
    <button type="submit" className={[styles.btn,"btn-primary"]} onClick={requestOTP}>Request OTP</button>
    <div className="form-group input-field">
                    <label >Enter OTP</label>
                    <input type="text" className="form-control" value={otp} onChange={(e)=>setotp(e.target.value)} placeholder="Enter OTP" />
                    <button type="submit" className={[styles.btn,"btn-primary"]} onClick={checkValidity}>check Validity</button>
                </div>
                </div>}
               
            <div className={styles.docContainer}>
            {!display&&documents&&documents.map((imgsrc,index)=>
               (
                    <img 
                    key={index} // Using index as key assuming the filenames are unique
                    src={`http://localhost:3000/TripEase/backend/uploadDocuments/${imgsrc}`} 
                     alt="Uploaded" />
                ))}
                </div>
    
    </>
   )
}