// import "./share.css"
import { useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import Feed from "../feed/Feed";
import { Modal, Form, Input, Select } from 'antd'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import axiosInstance from "../../interceptors/interceptor"
import styles from "./share.module.css"
export default function Share() {

  const [showModal, setShowModal] = useState(false)
  const [img, setImg] = useState("")
  const [file, setFile] = useState(null);
  const handleSubmit = async(values) => {
    let journalData = new FormData();
    for(let i=0;i<Array.from(file).length;i++){
      journalData.append("images", file[i]);
    }
    journalData.append("postData", JSON.stringify(values))
    for (var key of journalData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
    console.log(file)
    console.log(journalData)
    try {
      const response = await axiosInstance.post("http://localhost:3000/a", journalData)

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
return (
  <div className={styles.share}>
    <div className={styles.shareWrapper}>
      <div className={styles.shareBottom}>
        <div className={styles.shareOptions}>
          <div className={styles.shareOption}>
            {/* <a onTouchMove={uploadJournal}><span className="shareOptionText">Click here to Journal your Trip</span></a>*/}
            <div>
            <span className="material-symbols-outlined" onClick={() => {

setShowModal(true)
}}>
imagesmode
</span>
              
              <Modal
                open={showModal}
                onCancel={() => setShowModal(false)}
              >
                <Form layout="vertical" onFinish={handleSubmit} >
                  {img && (
                    <div className="form-group input-field">
                      <img src={img} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>)}
                  <div className="form-group input-field">
                    <label >Upload Image</label>
                    <input type="file" name="images" multiple className="form-control" onChange={handleFileUpload} />
                  </div>
                  <FormItem label="Description" name="description">
                    <Input.TextArea
                      autosize={{ minRows: 5, maxRows: 20 }}
                    />
                  </FormItem>
                  <div className="d-flex justify-content-end">
                    <button className={styles.btn} type="submit">SAVE</button>
                  </div>
                </Form>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}