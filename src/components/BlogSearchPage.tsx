import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {BiSearch} from 'react-icons/bi';
import Post from './Post';
import {RxCross2} from 'react-icons/rx'; 

import { useNavigate } from 'react-router-dom';

interface BlogType {
    title: String,
    content: String,
    likes: Number,
    userId: String,
    blogId: String
}

const BlogSearchPage = () => {
    const nav = useNavigate();
    const navigate = (path: String) => nav(path.toString());

    const [posts, setPosts] = useState<BlogType>({title: '', content: '', likes: 0, blogId: '', userId: ''});
    const [searchTerm, setSearchTerm] = useState<String>("");

    const searchBlogs = async () => {
        try{
            const response = await fetch(`http://localhost:4000/api/blog/search/${searchTerm}`, {
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

  return (
    <div className='background-gradient' style={{height: "100vh", display: "flex", justifyContent: "center"}}>
        <div style={{position: "absolute", width: "1200px", height: "100px"}}>
            <div style={{display: "flex", justifyContent: "right", alignItems: "center", height: "80px"}}>
                <RxCross2 className='hover-icon' style={{height: "30px", width: "30px"}} onClick={() => navigate("/")} />
            </div>
        </div>
        <div style={{width: "70%", height: "100%", background: "white"}}>
            <h1>Search Blogs</h1>
            <div style={{width: "100%", height: "130px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <TextField id="outlined-basic" label="search" style={{width: "400px"}} onChange={ev => setSearchTerm(ev.target.value)} variant="filled" InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        <BiSearch style={{height: "20px", width: "20px", color: "white"}} className="icon" onClick={() => searchBlogs()} />
                        </InputAdornment>
                    )
                }}/>
            </div>
            {Object.keys(posts).length > 0 &&
                <>
                    <h2 style={{fontWeight: "200"}}>Results</h2>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{borderBottom: "solid black 1px", borderRadius: "20px", width: "90%"}}></div>
                    </div> 
                    <div className='post-grid small'>
                        {Object.entries(posts).map(([key, value]) => <Post key={key} title={value.title} content={value.content} likes={value.likes} date={value.date} blog_id={value.blog_id} />)}
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default BlogSearchPage