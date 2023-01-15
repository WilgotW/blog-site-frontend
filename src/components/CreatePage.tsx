import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {RxCross2} from 'react-icons/rx'; 

import { useNavigate } from 'react-router-dom';

interface BlogPost {
    title: string;
    content: string;
}

const CreatePage: React.FC = () => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [succes, setSucces] = useState<boolean>(false);
    const [title, setTitle] = useState<String>("");
    const [content, setContent] = useState<String>("");
    
    const nav = useNavigate();
    const navigate = (path: String) => nav(path.toString());

    const post = async (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        
        
        setLoading(true);

        try{
            const response = await fetch("http://localhost:4000/api/blog/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'token': `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            })

            console.log(await response.json());
            setSucces(true);
            
        }catch(err){
            console.log(err);
        }

        setLoading(false);
    }
    return (
        <div style={{display: "flex", justifyContent: "center", height: "100vh"}} className="background-gradient">
            
            <div style={{position: "absolute", width: "500px", height: "100px"}}>
                <div style={{display: "flex", justifyContent: "right", alignItems: "center", height: "80px"}}>
                    <RxCross2 className='hover-icon' style={{height: "30px", width: "30px"}} onClick={() => navigate("/")} />
                </div>
            </div>
            
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "fit-content", background: "white", paddingRight: "50px", paddingLeft: "50px"}}>
                <div className='animate-popup' style={{display: "flex", flexDirection: "column", gap: "50px"}}>
                    <h1 style={{fontWeight: "400"}}>New Blog</h1>
                    <div style={{marginBottom: "200px", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
                        
                        <div style={{display: "flex", justifyContent: "left", width: "100%"}}>
                            <TextField id="outlined-basic" label="Title" variant="filled" value={title} onChange={ev => setTitle(ev.target.value)}/>
                        </div>
                        <TextField
                            value={content} onChange={ev => setContent(ev.target.value)}
                            id="outlined-multiline-static"
                            label="Content"
                            multiline
                            rows={10}
                            style={{width: "500px"}}
                        />
                        <div style={{display: "flex", justifyContent: "left", width: "100%"}}>

                            <Button onClick={ev => post(ev)} variant={loading ? "outlined" : "contained"} type="submit" value="Submit" style={{width: "150px", height: "50px"}}> 
                                {loading ?
                                    <CircularProgress style={{color: "gray"}} size={24} /> 
                                    :
                                    <span>POST BLOG</span>
                                }
                            </Button>
                        </div>
                        <div style={{height: "75px"}}>
                            {succes &&
                                <span style={{color: "#6B4BCB"}}>Succesfully created blog!</span>                             
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePage;