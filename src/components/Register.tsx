import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import {BsFillPersonFill} from 'react-icons/bs';
import {HiLockClosed} from 'react-icons/hi';
import {MdMail} from 'react-icons/md';



interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    register();
  }

  const register = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    //save to localstorage
    localStorage.setItem('token', await response.json());
    setLoading(false);
  }

  return (
    <div className='form-container'>
        <form className="login-form" onSubmit={handleSubmit}>
            <div style={{display: "flex", flexDirection: "column", gap: "50px", width: "100%", justifyContent: "space-around"}}>
                <div style={{height: "120px", borderBottom: "solid gray 1px", width: "100%"}}>
                    <h1>Sign Up</h1>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "20px"}}>
                        
                    <TextField id="outlined-basic" label="name" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} style={{width: "100%"}} InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <BsFillPersonFill style={{height: "20px", width: "20px"}} />
                            </InputAdornment>
                        )
                    }}/>
                    <TextField id="outlined-basic" label="email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} style={{width: "100%"}} InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <MdMail style={{height: "20px", width: "20px"}} />
                            </InputAdornment>
                        )
                    }}/>
                    
                    <TextField id="outlined-basic" label="password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} style={{width: "100%"}} InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <HiLockClosed style={{height: "20px", width: "20px"}} />
                            </InputAdornment>
                        )
                    }}/>
                </div>
                <div style={{width: "100%"}}>
                    <Button variant={loading ? "outlined" : "contained"} type="submit" value="Submit" style={{width: "80%", height: "40px", borderRadius: "15px", borderColor: "gray", borderWidth: "1px"}}> 
                        {loading ?
                            <CircularProgress style={{color: "gray"}} size={24} /> 
                            :
                            <span>register</span>
                        }
                    </Button>
                </div>
            </div>
        </form>
    </div>
  );
}

export default Register;

