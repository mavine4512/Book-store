import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { toast } from "react-toastify";

function Books() {
    const [books, setBooks] = useState([]);
    
     const navigate = useNavigate();

    useEffect(()=>{
     const fetchAllBooks = async()=>{
        try{
          const res = await axios.get("http://localhost:3000/books")
          setBooks(res.data)
        }catch(err){

            toast.error("Fetch" + err);
            console.log(err)
        }
     }
     fetchAllBooks();
    },[]);

    const handleDelete= async (id)=>{
        try{
            await axios.delete("http://localhost:3000/books/"+id);
            toast.success("You have deleted successfully");
            window.location.reload();
        }catch(err){
            toast.error("Deleting" + err);
            console.log(err);
        }

    }
    function editBook(book) {
    navigate("/update/" + book.id,{ state: { data: book } });
  }

  return (
    <div>
        <h1 style={{marginBottom:'20px'}}>Online Book Store</h1>
        {books.length > 0 ?(<div className='books'>
            {books.map(book=>(
                <div className='book' key={book.id}>
                    {book.cover && <img src={book.cover} alt="book.png"/>}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>Ksh {book.price}</span>
                    <div className='btn'> 
                    <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className='update' onClick={() => editBook(book)}>Update</button>
                    </div>
                </div>
            ))}
        </div>):(
           <div style={{marginTop:'20px',marginBottom:'20px'}}>
               <p>You dont have any book yet, click add new book to add.</p>
            </div>
            )}
        
        <button className='addbtn'><Link className='link' to="/add">Add new book</Link></button>
    </div>
  )
}

export default Books