import Box from '../components/Box';
import React, {useState, useEffect, useRef} from 'react'
import {IoIosHeart} from 'react-icons/io'

interface IProps {
    title: String,
    content: String,
    likes: Number,
    blog_id: String,
    date: String
}

const Post = ({title, content, likes, date, blog_id}: IProps) =>  { 
    const [parentHeight, setParentHeight] = useState<number>(0);
    const parentRef = useRef<HTMLDivElement>(null);

    const [likedPost, setLikedPost] = useState<boolean>(false);
    

    const likePost = async (cValue: Number) => {
        try{
        
            const response = await fetch(`https://blogsite-backend-postgressql-production.up.railway.app/api/blog/like/${blog_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'token': `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    changeValue: cValue
                })
            })
            likedPost ? setLikedPost(false) : setLikedPost(true);
            const data = await response.json();
            console.log(await data);
            
        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => {
        console.log(date)
        if (parentRef.current) setParentHeight(parentRef.current.clientHeight);
    }, []);
    
    // if(!likes) return null;
  return (
    <div style={{width: "550px", height: "400px", background: "#f5f5f5", borderRadius: "20px", boxShadow: "2px 2px 2px #ccc", position: "relative"}}>
    <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "90%", display: "flex", justifyContent: "space-between"}}>
            <h1 style={{fontWeight: "200", width: "fit-content"}}>{title}</h1>
            <div style={{height: "100%", display: "flex", alignItems: "center"}}>
                {date &&
                    <span>{date.slice(0, 10)}</span>
                }
            </div>
        </div>
    </div>
    <div style={{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
        <div style={{borderBottom: "solid black 1px", borderRadius: "20px", width: "90%"}}></div>
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
            <span style={{fontWeight: "600", color: "gray"}}>
                {likes &&
                    <>
                        {likes.toString()}
                    </>
                }
            </span>
            {likedPost ?
                <>
                    <IoIosHeart className='icon' style={{height: "30px", width: "30px", color: "rgba(62,97,200,1)"}} onClick={() => likePost(-1)}/>
                </>
                :
                <>
                    <IoIosHeart className='icon' style={{height: "30px", width: "30px", color: "gray"}} onClick={() => likePost(1)} />
                </>
            }
        </div>
    </div>
    </div>
  )
}

export default Post