import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './style.css';

function Add() {
    const [books, setBooks] = useState({
        title:"",
        desc:"",
        price: null,
        cover:"",
    });

    const navigate = useNavigate();
    const handleChange =(e)=>{
        setBooks((prev)=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async (e)=>{
      e.preventDefault();
      try{
        await axios.post("http://localhost:3000/books", books);
        navigate('/');
      }catch(err){
          console.log(err);
      }
    };

  return (
    <div className='form'>
        <h1>Add New Book</h1>
        <input type="text" placeholder='Book title' name='title' onChange={handleChange}/>
        <input type="text" placeholder='Book Description' name='desc' onChange={handleChange}/>
        <input type="number" placeholder='Book Price' name='price' onChange={handleChange}/>
        <input type="text" placeholder='Book Cover' name='cover' onChange={handleChange}/>
        <button className='formbtn' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add