import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './style.css';

function Update() {
    const [books, setBooks] = useState({
        title:"",
        desc:"",
        price: null,
        cover:"",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.data;

    const bookId = location.pathname.split('/')[2];

    const handleChange =(e)=>{
        setBooks((prev)=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async (e)=>{
      e.preventDefault();
      try{
        await axios.put("http://localhost:3000/books/" + bookId, books);
        navigate('/');
      }catch(err){
          console.log(err);
      }
    };

  return (
    <div className='form'>
        <h1>Edit Book Details</h1>
        <input type="text" placeholder={data.title} name='title' onChange={handleChange}/>
        <input type="text" placeholder={data.desc}  name='desc' onChange={handleChange}/>
        <input type="number" placeholder={data.price}  name='price' onChange={handleChange}/>
        <input type="text" placeholder={data.cover}  name='cover' onChange={handleChange}/>
        <button className='formbtn' onClick={handleClick}>Edit</button>
    </div>
  )
}

export default Update