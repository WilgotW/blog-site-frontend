import Box from '../components/Box';
import React from 'react'
import {IoIosHeart} from 'react-icons/io'

interface IProps {
    title: String,
    content: String,
    likes: Number
}

const Post = ({title, content, likes}: IProps) =>  {
    if(!likes) return null;
  return (
    <div style={{width: "550px", height: "400px", background: "#f5f5f5", borderRadius: "20px", boxShadow: "2px 2px 2px #ccc", position: "relative"}}>
    <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "90%", display: "flex", justifyContent: "left"}}>
            <h1 style={{fontWeight: "200"}}><u>{title}</u></h1>
        </div>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "90%", maxHeight: "260px", textAlign: "left", overflowY:"scroll"}}>
            <span>
                {content}
            </span>
        </div>
    </div>
    <div style={{display: "flex", justifyContent: "flex-end", position: "absolute", bottom: 0, right:0}}>
        <div style={{display: "flex", width: "80%", padding:"13px" , justifyContent: "right", alignItems: "center"}}>
            <span style={{fontWeight: "600", color: "gray"}}>{likes.toString()}</span>
            <IoIosHeart style={{height: "30px", width: "30px", color: "gray"}} />
        </div>
    </div>
    </div>
  )
}

export default Post