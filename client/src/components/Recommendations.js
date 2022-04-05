import axios from 'axios'
import React, { useState } from 'react'

export default function Recommendations() {
    const [user,setUser]=useState({userid:''})
    const [data,setData]=useState('')
    const handleChange=e=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
    }
    const handleClick=()=>{
        axios.get(`/api/${user.userid}/recommendations`).then(res=>{setData(res.data.recommendation_list)}).catch(err=>alert(err.response.data.msg))
    }
  return (
    <div>
        <input type='text' name='userid' placeholder='enter user id' value={user.userid} onChange={handleChange}/>
        <button onClick={handleClick}>Show</button>
        {
            (data!=='')&&(data.length===0?<div>No recommendations found</div>:<table>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>rating</th>
                    <th>url</th>
                    </tr>
                </thead>
                <tbody>
                   { data.map(show=>{
                        return (<tr>
                            <td>{show.id}</td>
                            <td>{show.name}</td>
                            <td>{show.rating.average}</td>
                            <td>{show.url}</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>)
        }
    </div>
  )
}
