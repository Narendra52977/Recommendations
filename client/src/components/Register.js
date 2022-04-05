import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [user,setUser]=useState({
        name:'',
        email:''
    })

    const onChangeInput=e=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
    }
    const registerSubmit=async e=>{
        e.preventDefault()
        try{
         let res= await axios.post('/user/register',{...user})
         if(res.status===200){
             alert('User successfully registered')
         }
        }catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
            <input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/>
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/>
                <div className="row">
                <button type="submit">
                    Register
                </button>
                </div>
            </form>
        </div>
    )
}
