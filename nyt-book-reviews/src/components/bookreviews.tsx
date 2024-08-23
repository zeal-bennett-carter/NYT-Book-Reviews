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
        <div className="reviews-wrapper">
            

            {loading ? (
                <h2>Loading...</h2>
            ) :
            retrievalSuccess && bookReviews.length != 0 ? (
                <div>
                    <h2 className="reviews-header">
                        Reviews:
                    </h2>
                    <table className="books-table">
                    <thead className="books-table-title">
                        <tr>
                            <th className="column-header">Index</th>
                            <th className="column-header">Review Author</th>
                            <th className="column-header">Link</th>
                            <th className="column-header">Publication Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookReviews.map((bookReview, index) => (
                                <tr className="book-table-row" key={index}>
                                    <td className="book-table-cell">{index + 1}</td>
                                    <td className="book-table-cell">{bookReview.byline}</td>
                                    <td className="book-table-cell"><a href={bookReview.url} target="_blank">{bookReview.url}</a></td>
                                    <td className="book-table-cell">{bookReview.publication_dt}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
                    <Link className="return-button" to="/">Return Home</Link>
                </div>
            ): 
            retrievalSuccess && bookReviews.length == 0 ? 
            (
                <div>
                    <h2>No Reviews Found</h2>
                    <Link className="return-button" to="/">Return Home</Link>
                </div>
            ):
            (
                <div>
                    <h2>NYT API Rate Limit Reached, Please Return Home</h2>
                    <Link className="return-button" to="/">Return Home</Link>
                </div>
            ) 
            }
            

            
        </div>
    )
};