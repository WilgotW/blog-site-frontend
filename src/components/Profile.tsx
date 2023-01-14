import React, { useState, useEffect} from 'react'
import { FC } from 'react';
import Post from './Post';
import Box from '../components/Box';

interface BlogType {
    title: String,
    content: String,
    likes: Number,
    userId: String,
    blogId: String
}

const Profile:FC = () => {
    
    const [posts, setPosts] = useState<BlogType>({title: '', content: '', likes: 0, blogId: '', userId: ''});

    const getMyPosts = async () => {
        
        try{
        
            const response = await fetch("http://localhost:4000/api/blog/my-posts", {
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
        getMyPosts();
    }, [])

  return (
    <div className='background-gradient' style={{height: "100vh", display: "flex", justifyContent: "center"}}>
        <div style={{width: "80%", background: "white", height: "100%", overflowY: "scroll"}}>
            <div style={{width: "100%", height: "200px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{display: "flex", alignItems: "center", width: "90%"}}>
                    <div style={{width: "150px", height: "150px", borderRadius: "1000px", background: "orange"}}>
                        profile 
                    </div>
                    <div style={{minWidth: "150px"}}>
                        <h2>{localStorage.getItem('user_name')}</h2>
                    </div>
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
                        {Object.keys(posts).length > 0 ?
                            <>
                                {Object.entries(posts).map(([key, value]) => <Post key={key} title={value.title} content={value.content} likes={value.likes} />)}
                            </>
                            :
                            <>
                                <h3>no blogs</h3>
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
