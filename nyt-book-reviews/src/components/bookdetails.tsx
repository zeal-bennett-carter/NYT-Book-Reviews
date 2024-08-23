import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookReview, getBookReviewByTitle } from "../services/booksretriever";

export default function BookReviews() {
    const [bookReviews, setBookReviews] = useState<BookReview[]>([]);
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [retrievalSuccess, setRetrievalSuccess] = useState<boolean>(true);
    console.log(params);

    const getBookReviews = async (retryCount = 0) => {
        console.log("CALLING BOOK REVIEW RETRIEVER");
        try {
            const retrievedBookReviews = await getBookReviewByTitle(params.bookTitle as string);
            setBookReviews(retrievedBookReviews);
            console.log("success, setting loading to false")
            setLoading(false);
            console.log("loading value:" + loading)
        } catch (error) {
            console.error("Failed to Book Reviews");
            setLoading(false);
            setRetrievalSuccess(false);
        }
    };

    useEffect(() => {
        getBookReviews();
    }, [])

    
    
    return(
        <>
        <div>
            <h2>
                Reviews:
            </h2>

            {loading ? (
                <p>Loading...</p>
            ) :
            retrievalSuccess && bookReviews.length != 0 ? (
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
                                <td className="book-table-cell">{bookReview.byline}</td>
                                <td className="book-table-cell"><a href={bookReview.url} target="_blank">{bookReview.url}</a></td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            ): 
            retrievalSuccess && bookReviews.length == 0 ? 
            (
                <p>No Reviews Found</p>
            ):
            (
                <p>NYT API Rate Limit Reached</p>
            ) 
            }
            

            <Link to="/">Return Home</Link>
        </div>
        </>
    )
};