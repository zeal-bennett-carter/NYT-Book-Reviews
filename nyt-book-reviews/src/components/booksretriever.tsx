import axios from "axios";
import React, { useEffect } from "react";

export default function BooksRetriever() {
    const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY
    const url = `https://api.nytimes.com/svc/books/v3/lists/best-sellers.json?api-key=${NYT_API_KEY}`;

    useEffect(() => {
        console.log("api key:" + NYT_API_KEY)
        console.log("url:" + url)
        axios.get(url)
            .then(response => {
                console.log(response.data);
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
