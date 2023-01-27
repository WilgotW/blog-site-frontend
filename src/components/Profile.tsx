import React, { useState, useEffect} from 'react'
import { FC } from 'react';
import Post from './Post';
import Box from '../components/Box';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

interface BlogType {
    title: String,
    content: String,
    likes: Number,
    userId: String,
    blogId: String
}

const Profile:FC = () => {
    
    const [posts, setPosts] = useState<BlogType>({title: '', content: '', likes: 0, blogId: '', userId: ''});
    const [username, setUsername] = useState<String>("");

    const nav = useNavigate();
    const navigate = (path: String) => nav(path.toString());

    const getUsername = async () => {
        try{
        
            const response = await fetch("https://relieved-harmony-production.up.railway.app/api/user/get-user-info", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'token': `${localStorage.getItem("token")}`
                }
            })
            
            const data = await response.json();
            console.log(await data);

            setUsername(await data.name)
            
            
        }catch(err){
            console.log(err);
        }
    }

    const getMyPosts = async () => {
        
        try{
        
            const response = await fetch("https://relieved-harmony-production.up.railway.app/api/blog/my-posts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'token': `${localStorage.getItem("token")}`
                }
            })
            
            const data = await response.json();
            console.log(await data);
            setPosts(await data);
            
        }catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
        getUsername();
        getMyPosts();
    }, [])

    useEffect(() => {
        console.log(posts);
    }, [posts])

  return (
    <div className='background-gradient' style={{height: "100vh", display: "flex", justifyContent: "center"}}>
        <div style={{width: "80%", background: "white", height: "100%", overflowY: "scroll"}}>
            <div style={{width: "100%", height: "200px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{display: "flex", alignItems: "center", width: "90%"}}>
                    <div style={{width: "150px", height: "150px", borderRadius: "1000px", background: "orange"}}>
                         
                    </div>
                    <div style={{minWidth: "150px"}}>
                        <h2>{username}</h2>
                    </div>
                </div>
                <div style={{position: "absolute", width: "60%", display: "flex", justifyContent: "right"}}>
                    <Button variant="contained" type="submit" value="Submit" onClick={() => navigate("/")}> 
                        home
                    </Button>
                </div>
                <div>
                </div>
            </div>
            <div style={{marginTop: "30px"}}>
                <h1 style={{fontWeight: "200"}}>My Posts</h1>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div style={{borderBottom: "solid black 3px", borderRadius: "20px", width: "90%"}}></div>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div className='my-post-grid'>
                        {Object.keys(posts).length > 0 &&
                            <>
                                {Object.entries(posts).map(([key, value]) => <Post key={key} title={value.title} content={value.content} likes={value.likes} date={value.date} blog_id={value.blog_id} />)}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile;
