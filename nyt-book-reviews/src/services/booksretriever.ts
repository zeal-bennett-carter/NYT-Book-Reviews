import axios from "axios";

export interface BookListing {
    title: string,
    author: string,
    description: string,
    publisher: string,
    price: number
}

export interface BookReview {
    book_title: string,
    book_author: string,
    byline: string,
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
        // booksList.forEach((book:any, index:number) => {
        //     console.log(`Book ${index + 1}:`, book);
        // });
        
        return booksList;
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        throw error;  // Re-throw the error to handle it in the component
    }
};

export const getBookReviewByTitle = async (bookTitle:string, retryCount = 0): Promise<BookReview[]> => {
    const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${encodeURIComponent(bookTitle)}&api-key=${NYT_API_KEY}`;
    console.log("url: " +url)
    const maxRetries = 3; // Maximum number of retries
    const retryDelay = 1000; // Initial delay in milliseconds
    
    try {
        console.log("RETRIEVING BOOK REVIEWS")
        const response = await axios.get(url);
        const bookReviews = response.data.results;
        console.log("BOOK REVIEW RETRIEVED!")
        console.log(bookReviews)

        // Log each book object
        bookReviews.forEach((index:number) => {
            console.log(`Book Review ${index + 1}:`, bookReviews);
        });
        
        return bookReviews;
    } catch (error:any) {
        console.log("retry count: " + retryCount)
        if (error.response?.status === 429 && retryCount < maxRetries) {
            // Wait for a delay before retrying
            console.warn(`Rate limit exceeded. Retrying in ${retryDelay * (retryCount + 1)}ms...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)));
            // Retry the request with incremented retryCount
            await getBookReviewByTitle(bookTitle, retryCount + 1);
        } else {
            console.error("Error in fetching book review:", error);
        }
        throw error;  
    }
};


