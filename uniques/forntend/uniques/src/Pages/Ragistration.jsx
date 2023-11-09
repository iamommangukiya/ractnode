import axios from 'axios'
import React, { useState } from 'react'
import 'bootstrap'

import 'bootstrap/dist/js/bootstrap.min.js';



function Ragistration() {
    const[formdata,setformdata]=useState({
        username:"",
        password:"",
        email:""
    })

    const FormHandeler = async (e) => {
        e.preventDefault();
 
 

        try {
          var res=await axios.post("http://localhost:8080/user/create", formdata);
          console.log(res.data)
          
        } catch (ex) {
          console.log(ex);
        }
      }
      
      const InputHandler = (e) => {
        const { name, value } = e.target;
        setformdata({
          ...formdata,
          [name]: value
        });
      }
      
  return (
    <>
    
    <h1 className='text-align-center'>Create Account</h1>
      <form onSubmit= {FormHandeler}
     
      >
        <label htmlFor="">Name</label>
        <input type="text" name="username" value={formdata.name} onChange={InputHandler}/>
        <label htmlFor="">email</label>
        <input type="email" name="email" value={formdata.email} onChange={InputHandler}/>
        <label htmlFor="">password</label>
        <input type="text" name="password" value={formdata.password} onChange={InputHandler}/>
        <input type="submit" />
    </form>
    
    </>
  )
}

export default Ragistration