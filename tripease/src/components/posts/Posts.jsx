// import "./posts.css"
import { MoreVert } from "@material-ui/icons"
import { Users } from "../../dummydata"
import { useState, useEffect } from "react"
import SinglePost from "../singlepost/SinglePost"
import axios from "axios"
import axiosInstance from "../../interceptors/interceptor"
export default function Posts({ post }) {
    console.log(post)
    /*const [like, setLike] = useState(post.like)
    const [isLiked, setisLiked] = useState(false)
    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setisLiked(!isLiked)
        console.log(like)
    }
    */
        const [postData, setpostData] = useState([])
        const getPostData = async () => {
            console.log("called")
            try {

                const response = await axiosInstance.get('http://localhost:3000/get-post-data')
                
                if (response.data.success) {
                    console.log(response.data.data)
                    setpostData(response.data.data)

                }
            }
            catch (error) {

                console.log(error)
            }
        }
    
        useEffect(() => {
            getPostData()
        },[])

        return (
        <>
        <div className="right-container">
            {postData.map((element)=>
            (   
                
                <SinglePost key={element.description} element={element}/>
            ))
            }
            </div>
        </>
        )
    }
