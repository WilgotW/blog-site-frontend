import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {BiSearch} from 'react-icons/bi';
// import navigatePath from '../functions/navigatePath';
import { useNavigate } from 'react-router-dom';
import {AiOutlineArrowDown} from 'react-icons/ai'
import BlogSection from './BlogSection';

export default function Home() {

  const scrollRef = useRef<HTMLDivElement>(null);

  const nav = useNavigate();
  const navigate = (path: String) => nav(path.toString());

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const checkIfLoggedIn = () => {
    if(localStorage.getItem('token') == undefined || localStorage.getItem('token') == null){
      setLoggedIn(false);
    }else{
      setLoggedIn(true);
    }
  }

  const logOut = () => {
    console.log(localStorage.getItem('token'))
    localStorage.clear();
    window.location.reload();
  }

  const scroll = () => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, [])

  return (
    <div>
      <div style={{height: "70px", background: "#f5f5f5", display: "flex", justifyContent: "right", alignItems: "center"}}>
        <div style={{display: "flex", width: "70%"}}>
          <h2 className='text-gradient'>Blog IT</h2>
        </div>
        <div style={{width: "500px", display:"flex", justifyContent: "center", gap: "30px"}}>
          {loggedIn ?
            <>
              <Button variant="outlined" onClick={() => navigate("/my-profile")} >My profile</Button>
              <Button variant="outlined" onClick={() => logOut()}>Log out</Button>
            </>
            :
            <Button variant="contained" className='button-style' onClick={() => navigate("/login")}>LOGIN</Button>
          }
        </div>
      </div>
      <div style={{padding: "10px"}}>
        <div className='background-gradient' style={{height: "600px", padding: "100px", color: "white", display: "flex", justifyContent: "center", position: "relative"}}>
          <div className='popup-after-animation' style={{display: "flex", alignItems: "center", height: "500px"}}>
            <div style={{display: "flex", flexDirection: "column", width: "300px"}}>
              <h1 style={{color: "white", width: "fit-content"}}>Find Blogs</h1>
              <TextField id="outlined-basic" label="search" variant="filled" InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <BiSearch style={{height: "20px", width: "20px", color: "white"}} className="icon" onClick={() => navigate("/search")} />
                  </InputAdornment>
                )
              }}/>
              {/* <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{borderBottom: "solid white 3px", borderRadius: "20px", width: "330px"}}></div>
              </div> */}
              <div style={{height: "180px", display: "flex",justifyContent: "center", alignItems: "center", width: "100%"}}>    
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                  <div style={{borderBottom: "solid white 2px", borderRadius: "20px", width: "230px"}}></div> 
                  <span style={{fontWeight: "200"}}>or</span>   
                  <div>
                    <Button variant="contained" style={{width: "200px", height: "50px"}} onClick={() => navigate("/create")}>create blog</Button>
                  </div>       
                </div>
              </div>
            </div>
          </div>
          <div className='animate-popup-right' style={{width: "400px", height:"400px", borderRadius: "500px", background: "white", display: "flex", justifyContent: "space-around", alignItems: "center"}}>
            <div>
              <h1 style={{color: "#6B4BCB", fontSize: "50px", fontWeight: "600"}}>Blog IT</h1>
              <h4 style={{color: "#6B4BCB", fontWeight: "100"}}>Create, Read and Connect</h4>
              <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{borderBottom: "solid #6B4BCB 3px", borderRadius: "20px", width: "150px"}}></div>
              </div>
            </div>
          </div>
          {/* <h3>BlogIT is a website that lets you create blogs manly focusing on IT blogs. Here you can post about your ideas, progress and IT projects!</h3>
          <Link to="/login" >Hello</Link> */}
          {/* <div style={{position: "absolute", bottom: "150px", background: "red", width: "500px", zIndex: "10", height: "30px"}}></div> */}
          
          <div style={{position: "absolute", bottom: "0", left: "0", display: "flex", justifyContent: "center", width: "100%", height: "100px"}}>
            {loggedIn ?
              <Button variant="outlined" onClick={() => scroll()} style={{width: "200px", height: "50px", color: "white", borderColor: "white"}} startIcon={<AiOutlineArrowDown />} endIcon={<AiOutlineArrowDown />}>Browse</Button>
              :
              <Button variant="outlined" onClick={() => navigate("/login")}  style={{width: "200px", height: "50px", color: "white", borderColor: "white"}} startIcon={<AiOutlineArrowDown />} endIcon={<AiOutlineArrowDown />}>Browse</Button>
            }
          </div>
        </div>
      </div>
      {loggedIn &&
        <div ref={scrollRef}>
          <BlogSection/>
        </div>
      }
    </div>
  )
}
