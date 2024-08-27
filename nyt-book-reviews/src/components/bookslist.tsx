import React, {useState, useEffect} from "react";
import { BookListing, getBookList } from "../services/booksretriever";
import { Link } from "react-router-dom";

export default function BooksList() {
    const [booksList, setBooksList] = useState<BookListing[]>([]);

    const getBooksList = async () => {

        const cachedBooks = localStorage.getItem('bookslist');
        console.log("cached books:", cachedBooks);

        if (cachedBooks) {
            setBooksList(JSON.parse(cachedBooks));
            console.log("filling book list with cached books");
        } else {
            try {
                console.log("CALLING BOOK RETRIEVER");
                const retrievedBooks = await getBookList();
                setBooksList(retrievedBooks);
                
                console.log("caching books");
                localStorage.setItem('bookslist', JSON.stringify(retrievedBooks));
                
            } catch (error) {
                console.error("Error in fetching books:", error);
            }
        }
    } 

    useEffect(() => {
        getBooksList();
    }, [])

    return (
        <div className="inner-content-holder">
            <div className="main-header-wrapper">
                <h1 className="main-header">
                    NYT Best Sellers
                </h1>
            </div>
            <p className="page-description">Click a book title below to see a description and reviews!</p>
            <table className="books-table">
                <thead className="books-table-title">
                    <tr>
                        <th className="column-header">Title</th>
                        <th className="column-header">Author</th>
                        <th className="column-header book-publisher">Publisher</th>
                        <th className="column-header">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        booksList.map((book, index) => (
                            <tr className="book-table-row" key={index}>
                                <td className="book-table-cell book-title">
                                    <Link 
                                        to={`/reviews/${filterHashtags(book.title)}`}
                                        state={{ 
                                            title: book.title,
                                            description: book.description, 
                                            author: book.author 
                                        }}
                                    >{book.title}</Link>
                                    </td>
                                <td className="book-table-cell">{capitalizeWords(book.author)}</td>
                                <td className="book-table-cell book-publisher">{book.publisher}</td>
                                <td className="book-table-cell book-price">${book.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export const capitalizeWords = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const filterHashtags = (title: string) => {
    return title.replace(/#(?=\S)/g, '')
};
