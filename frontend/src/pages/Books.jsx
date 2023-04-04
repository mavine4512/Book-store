import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function Books() {
    const [books, setBooks] = useState([]);
    
     const navigate = useNavigate();
    useEffect(()=>{
     const fectAllBooks = async()=>{
        try{
          const res = await axios.get("http://localhost:3000/books")
          setBooks(res.data)
        }catch(err){
            console.log(err)
        }
     }
     fectAllBooks();
    },[]);

    const handleDelete= async (id)=>{
        try{
            await axios.delete("http://localhost:3000/books/"+id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }

    }
    function editBook(book) {
    navigate("/update/" + book.id,{ state: { data: book } });
  }

  return (
    <div>
        <h1>Book Store</h1>
        <div className='books'>
            {books.map(book=>(
                <div className='book' key={book.id}>
                    {book.cover && <img src={book.cover} alt="book.png"/>}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>Ksh {book.price}</span>
                    <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className='update' onClick={() => editBook(book)}>Update</button>
                </div>
            ))}
        </div>
        <button><Link to="/add">Add new book</Link></button>
    </div>
  )
}

export default Books