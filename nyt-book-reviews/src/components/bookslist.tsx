import React, {useState, useEffect} from "react";
import { BookListing, retrieveBooksList } from "../services/bookslistretriever";

export default function BooksList() {
    const [booksList, setBooksList] = useState<BookListing[]>([]);

    useEffect(() => {
        const getBooksList = async () => {
            try {
                console.log("CALLING BOOK RETRIEVER")
                const retrievedBooks = await retrieveBooksList();
                setBooksList(retrievedBooks);

                // Log each book object
                booksList.forEach((book, index) => {
                console.log(`Book ${index + 1}:`, book);
            });

            } catch (error) {
                console.error("Error in fetching books:", error);
            }
        } 

        getBooksList();
    }, [])

    return (
            <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    booksList.map((book, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.price}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}