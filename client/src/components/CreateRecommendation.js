import axios from 'axios'
import React, { useState } from 'react'

export default function CreateRecommendation() {
    const [user,setUser]=useState({userid:''})
    const [loading,setLoading]=useState(false)
    const handleChange=e=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
    }
    const handleAdd=()=>{
        setLoading(true)
        axios.post(`/api/${user.userid}/recommendation`)
          .then(res=>{setLoading(false); alert('Added New recommendation to user is successful')})
          .catch(err=>{setLoading(false);alert(err.response.data.msg)})
    }
    const handleReset=()=>{
        axios.patch(`/api/${user.userid}/recommendations`).then(res=>{alert('reset user recommendations')}).catch(err=>alert(err.response.data.msg))
    }
  return (
    <div>
        <input type='text' name='userid' placeholder='enter user id' value={user.userid} onChange={handleChange}/>
        <button onClick={handleAdd}>ADD</button>
        <button onClick={handleReset}>reset</button>
        {
            loading&&<div>loading...</div>
        }
    </div>
  )
}
