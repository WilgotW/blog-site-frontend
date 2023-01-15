import Box from '../components/Box';
import React, {useState, useEffect, useRef} from 'react'
import {IoIosHeart} from 'react-icons/io'

interface IProps {
    title: String,
    content: String,
    likes: Number
}

const Post = ({title, content, likes}: IProps) =>  {
    
    
    const [parentHeight, setParentHeight] = useState<number>(0);
    const parentRef = useRef<HTMLDivElement>(null);
    
    
    useEffect(() => {
        if (parentRef.current) setParentHeight(parentRef.current.clientHeight);
    }, []);
    
    if(!likes) return null;
  return (
    <div style={{width: "550px", height: "400px", background: "#f5f5f5", borderRadius: "20px", boxShadow: "2px 2px 2px #ccc", position: "relative"}}>
    <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "90%", display: "flex", justifyContent: "left"}}>
            <h1 style={{fontWeight: "200"}}><u>{title}</u></h1>
        </div>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
        <div  style={{width: "90%", maxHeight: "260px", textAlign: "left", overflowY:"scroll", wordWrap: "break-word"}}>
            <div style={{ position: "relative"}}>
                
                <div ref={parentRef} style={{width: "fit-content"}}>
                    {content}
                </div>
            </div>
            {parentHeight > 260 &&
                <div className='bottom-border-gradient' style={{position: "absolute", bottom: "60px", width: "500px", zIndex: "10", height: "30px"}}></div>
            }
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