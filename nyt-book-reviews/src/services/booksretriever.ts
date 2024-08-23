import axios from "axios";

export interface BookListing {
    title: string,
    author: string,
    publisher: string,
    price: number
}

export interface BookReview {
    book_title: string,
    book_author: string,
    url: string,
    publication_dt:string
}

export const getBookList = async (): Promise<BookListing[]> => {
    const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/books/v3/lists/best-sellers.json?api-key=${NYT_API_KEY}`;
    // console.log("api key: " +NYT_API_KEY)
    // console.log("url: " +url)
    
    try {
        console.log("RETRIEVING BOOKS")
        const response = await axios.get(url);
        const booksList = response.data.results;
        // console.log("BOOKS RETRIEVED!")
        // console.log("BOOKS RETRIEVED, Number of books: ", booksList.length);

        // Log each book object
        booksList.forEach((book:any, index:number) => {
            console.log(`Book ${index + 1}:`, book);
        });
        
        return booksList;
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        throw error;  // Re-throw the error to handle it in the component
    }
};

export const getBookReviewByTitle = async (bookTitle:string): Promise<BookReview[]> => {
    const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${encodeURIComponent(bookTitle)}&api-key=${NYT_API_KEY}`;
    console.log("url: " +url)
    
    try {
        console.log("RETRIEVING BOOK REVIEWS")
        const response = await axios.get(url);
        const bookReviews = response.data.results;
        console.log("BOOK REVIEW RETRIEVED!")
        console.log(bookReviews)

        // Log each book object
        bookReviews.forEach((Revieww:any, index:number) => {
            console.log(`Book Revieww ${index + 1}:`, bookReviews);
        });
        
        return bookReviews;
    } catch (error) {
        console.error("Error fetching book reviews:", error);
        throw error;  // Re-throw the error to handle it in the component
    }
};


