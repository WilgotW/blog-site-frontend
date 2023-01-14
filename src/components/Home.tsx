import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {BiSearch} from 'react-icons/bi';
// import navigatePath from '../functions/navigatePath';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const nav = useNavigate();
  const navigate = (path: String) => nav(path.toString());

  return (
    <div>
      <div style={{height: "70px", background: "#f5f5f5", display: "flex", justifyContent: "right", alignItems: "center"}}>
        <div style={{width: "500px", display:"flex", justifyContent: "center", gap: "30px"}}>
          <Button variant="outlined" >My profile</Button>
          <Button variant="contained" className='button-style' onClick={() => navigate("/login")}>LOGIN</Button>
        </div>
      </div>
      <div style={{padding: "10px"}}>
        <div className='background-gradient' style={{height: "600px", padding: "100px", color: "white", display: "flex", justifyContent: "center"}}>
          <div className='popup-after-animation' style={{display: "flex", alignItems: "center", height: "500px"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
              <h1 style={{color: "white"}}>Find Users and Blogs</h1>
              <TextField id="outlined-basic" label="search" variant="filled" InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <BiSearch style={{height: "20px", width: "20px", color: "white"}} />
                  </InputAdornment>
                )
              }}/>
              {/* <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{borderBottom: "solid white 3px", borderRadius: "20px", width: "330px"}}></div>
              </div> */}
              <div style={{height: "180px", display: "flex",justifyContent: "center", alignItems: "center", width: "100%"}}>    
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                  <div style={{borderBottom: "solid white 2px", borderRadius: "20px", width: "230px"}}></div>    
                  <div>
                    <Button variant="contained" style={{width: "200px", height: "50px"}} onClick={() => navigate("/create")}>create blog</Button>
                  </div>       
                </div>
              </div>
            </div>
          </div>
          <div className='animate-popup' style={{width: "400px", height:"400px", borderRadius: "500px", background: "white", display: "flex", justifyContent: "space-around", alignItems: "center"}}>
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
        </div>
      </div>
    </div>
  )
}
