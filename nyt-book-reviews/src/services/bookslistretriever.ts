import axios from "axios";

export interface BookListing {
    title: string,
    author: string,
    publisher: string,
    price: number
}

export const retrieveBooksList = async (): Promise<BookListing[]> => {
    const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/books/v3/lists/best-sellers.json?api-key=${NYT_API_KEY}`;
    // console.log("api key: " +NYT_API_KEY)
    // console.log("url: " +url)
    
    try {
        console.log("RETRIEVING BOOKS")
        const response = await axios.get(url);
        const booksList = response.data.results;
        console.log("BOOKS RETRIEVED!")
        return booksList;
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        throw error;  // Re-throw the error to handle it in the component
    }
};

