import { parse } from 'node:path/win32';
import React, { useEffect, useState } from 'react'
import { FC } from 'react';
import Post from './Post';
import Button from '@mui/material/Button';
import {AiOutlineArrowDown} from 'react-icons/ai'

interface BlogType {
    title: String,
    content: String,
    likes: Number,
    userId: String,
    blogId: String
}


const BlogSection:FC = () => {
    
    const [popularPosts, setPopularPosts] = useState<BlogType>({title: '', content: '', likes: 0, blogId: '', userId: ''});
    const [newPosts, setNewPosts] = useState<BlogType>({title: '', content: '', likes: 0, blogId: '', userId: ''});
    const [popularAmount, setPopularAmount] = useState<number>(3)
    const [newAmount, setNewAmount] = useState<number>(3)

    const showMore = (setState: React.Dispatch<React.SetStateAction<number>>) => {
        setState(prev => prev + 3);
    }

    const getPopularBlogs = async () => {
        try{
            const response = await fetch(`https://blogsite-backend-postgressql-production.up.railway.app/api/blog/get-popular/${popularAmount}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'token': `${localStorage.getItem("token")}`
                }
            })
            const data = await response.json();            
            setPopularPosts(await data);
            console.log(await data);
        }catch(err){
            console.log(err);
        }
    }
    const getNewestBlogs = async () => {
        try{
            const response = await fetch(`https://blogsite-backend-postgressql-production.up.railway.app/api/blog/get-newest/${newAmount}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'token': `${localStorage.getItem("token")}`
                }
            })
            const data = await response.json();            
            setNewPosts(await data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getPopularBlogs();
    }, [popularAmount])
    useEffect(() => {
        getNewestBlogs();
    }, [newAmount])
  return (
    <div style={{height: "fit-contnet", width: "100%", marginTop: "200px"}}>
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
            <h2 className='text-gradient'>Popular Blogs</h2>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{borderBottom: "solid #6B4BCB 3px", borderRadius: "20px", width: "90%"}}></div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}> 
            <div className='post-grid'>
                {Object.keys(popularPosts).length > 0 &&
                    <>
                        {Object.entries(popularPosts).map(([key, value]) => <Post key={key} title={value.title} content={value.content} likes={value.likes} date={value.post_date} blog_id={value.blog_id} />)}
                    </>
                }
            </div>
        </div>
        <Button 
            onClick={() => showMore(setPopularAmount)}
            variant="outlined" 
            style={{width: "200px", height: "50px", color: "black", borderColor: "black"}} 
            startIcon={<AiOutlineArrowDown />} 
            endIcon={<AiOutlineArrowDown />
        }>Show More</Button>


        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h2 className='text-gradient'>New Blogs</h2>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{borderBottom: "solid #6B4BCB 3px", borderRadius: "20px", width: "90%"}}></div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}> 
            <div className='post-grid'>
                {Object.keys(newPosts).length > 0 &&
                    <>
                        {Object.entries(newPosts).map(([key, value]) => <Post key={key} title={value.title} content={value.content} likes={value.likes} date={value.post_date} blog_id={value.blog_id} />)}
                    </>
                }
            </div>
        </div>
        <Button 
            onClick={() => showMore(setNewAmount)}
            variant="outlined" 
            style={{width: "200px", height: "50px", color: "black", borderColor: "black"}} 
            startIcon={<AiOutlineArrowDown />} 
            endIcon={<AiOutlineArrowDown />
        }>Show More</Button>
        <div style={{height: "200px"}}>

        </div>
    </div>
  )
}

export default BlogSection