import React, { useEffect,useState } from "react"
import { Modal, Form } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {message} from "antd"
import axiosInstance from "../../interceptors/interceptor"
import Home from "../../pages/home/Home"
import Feature from "../feature/Feature"
 import styles from "./DocumentManagement.module.css"
import Navbar from "../navbar/Navbar"
export default function DocumentManagement()
{   
  //const imageUrl = `http://localhost:3000/TripEase/backend/uploadJournal/${participants[0]}`;
    const [showDocUpload, setShowDocUpload] = useState(false);
    const[display,setdisplay]=useState(false)
    const[phoneNumber,setphoneNumber]=useState("")
    const[otp,setotp]=useState("")
    const[documents,setdocuments]=useState([])
    const[originalDocuments,setoriginalDocuments]=useState([])
    const[searchText,setsearchText]=useState("")
    const[searchDisplay,setsearchDisplay]=useState(false)
    // const[searchIm]
    console.log(searchText)
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
            setoriginalDocuments(response.data.data)
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
      function search(val)
      {
        setdisplay(false)
        setdocuments(originalDocuments.filter(data=> data.toLowerCase().includes(val)))
//         const searchText=val+".jpg"
//         setsearchDisplay(true)
//         console.log(searchText,searchDisplay,documents)
//         {<div className={styles.docContainer}>
//            {documents && documents.map((imgsrc, index) => {   

//     const imgName = imgsrc.slice(13);
//             if(searchText==imgName){
//               console.log("yes",imgsrc)
              
//   }
// })}

//                 </div>}
      }
   return(
    <>
    <Navbar/>
        <div className={styles.content}>
          <h1>Heading.....</h1>
          <p>
          Facebook is a social media and social networking service owned by the American technology conglomerate Meta. Created in 2004 by Mark Zuckerberg with four other Harvard College students and roommates
          </p>
        </div>
      <div className={styles.btnGroup}>
    <button type="submit" className={styles.btn} onClick={DisplayDocs}>Display Documents</button>
    <button type="submit" className={styles.btn}
                onClick={() => {

                  setShowModal(true)
                }} >Upload Documents</button>
                </div>
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
        <button className={styles.btn} type="submit" >SAVE</button>
      </div>
    </Form>
  </Modal>
  <div className={styles.searchBar}>
  <input type="text"  className="form-control" style={{position:"absolute",width:"50%"}} value={searchText} onChange={(e)=>setsearchText(e.target.value)} placeholder="Search for Image" required="true"/>
  <span class="material-symbols-outlined" onClick={()=>search(searchText)} style={{position:"relative",display:"flex",justifyContent:"flex-end",marginTop:"0.5rem"}}>
search
</span>
  </div>
    {display&&
    <div className={styles.otpContainer}>
    <div className="form-group input-field">
                    <label >Phone Number</label>
                    <input type="text" className="form-control" value={phoneNumber} onChange={(e)=>setphoneNumber(e.target.value)} placeholder="Enter Mobile Number" />
                </div>
    <button type="submit" className={styles.btn} onClick={requestOTP}>Request OTP</button>
    <div className="form-group input-field">
                    <label >Enter OTP</label>
                    <input type="text" className="form-control" value={otp} onChange={(e)=>setotp(e.target.value)} placeholder="Enter OTP" />
                    <div className={styles.btnGroup1}>
                    <button type="submit" className={styles.btn} onClick={checkValidity}>check Validity</button>
                    <button type="submit" className={styles.btn} onClick={checkValidity}>close</button>
                    </div>
                </div>
                </div>}
               
           {!searchDisplay&&!display&&<div className={styles.docContainer}>
           {documents && documents.map((imgsrc, index) => {   

    const imgName = imgsrc.slice(13);

    return (
        <div key={index} className={styles.picContainer}>
            <p>{imgName}</p>
            <img className={styles.docImgs}
                src={`http://localhost:3000/TripEase/backend/uploadDocuments/${imgsrc}`} 
                alt="Uploaded" 
            />
        </div>
    );
})}

                </div>}
    
    </>
   )
}