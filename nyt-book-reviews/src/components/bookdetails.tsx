import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookReview, getBookReviewByTitle } from "../services/booksretriever";

export default function BookReviews() {
    const [bookReviews, setBookReviews] = useState<BookReview[]>([]);
    const params = useParams();
    console.log(params);
    useEffect(() => {
        const getBookReviews = async () => {
            try {
                console.log("CALLING BOOK REVIEW RETRIEVER")
                const retrievedBookReviews = await getBookReviewByTitle(params.bookTitle as string);
                setBookReviews(retrievedBookReviews);
            } catch (error) {
                console.error("Error in fetching book review:", error);
            }
        } 

        getBookReviews();
    }, [])
    
    return(
        <>
        <div>
            <h2>
                Reviews:
            </h2>
            <table className="books-table">
                <thead className="books-table-title">
                    <tr>
                        <th className="column-header">Index</th>
                        <th className="column-header">Review Author</th>
                        <th className="column-header">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookReviews.map((bookReview, index) => (
                            <tr className="book-table-row" key={index}>
                                <td className="book-table-cell">{index + 1}</td>
                                <td className="book-table-cell"><a href={bookReview.url} target="_blank">{bookReview.url}</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Link to="/">Return Home</Link>
        </div>
        </>
    )
};