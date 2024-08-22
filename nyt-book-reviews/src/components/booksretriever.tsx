import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BooksRetriever() {
    const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY
    const url = `https://api.nytimes.com/svc/books/v3/lists/best-sellers.json?api-key=${NYT_API_KEY}`;
    const [books, setbooks] = useState([])

    useEffect(() => {
        // console.log("api key:" + NYT_API_KEY)
        // console.log("url:" + url)
        axios.get(url)
            .then(response => {
                console.log(response.data);
                const booksList = response.data.results
                setbooks(booksList)
                console.log('books: ' + books)
                booksList.forEach((book:any, index:number) => {
                    console.log(`Book ${index + 1}:`, book);
                });
            })
            .catch(err => {
                console.error(err); // Use console.error to log the error
            });
    }, []); 

    
    return (
        <>
        
        </>
    );
}
