import React, {useState, useEffect} from "react";
import { BookListing, retrieveBooksList } from "../services/bookslistretriever";

export default function BooksList() {
    const [booksList, setBooksList] = useState<BookListing[]>([]);

    const capitalizeWords = (str: string): string => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        const getBooksList = async () => {
            try {
                console.log("CALLING BOOK RETRIEVER")
                const retrievedBooks = await retrieveBooksList();
                setBooksList(retrievedBooks);
            } catch (error) {
                console.error("Error in fetching books:", error);
            }
        } 

        getBooksList();
    }, [])

    return (
        <table className="books-table">
            <thead className="books-table-title">
                <tr>
                    <th className="column-header">Title</th>
                    <th className="column-header">Author</th>
                    <th className="column-header">Publisher</th>
                    <th className="column-header">Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    booksList.map((book, index) => (
                        <tr className="book-table-row" key={index}>
                            <td className="book-table-cell book-title">{book.title}</td>
                            <td className="book-table-cell">{capitalizeWords(book.author)}</td>
                            <td className="book-table-cell">{book.publisher}</td>
                            <td className="book-table-cell book-price">${book.price}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}