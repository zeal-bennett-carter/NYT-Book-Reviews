import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getBookList, getBookReviewByTitle, BookListing, BookReview } from '../services/booksretriever';

const mockAxios = new MockAdapter(axios);

describe('booksretriever', () => {
    beforeAll(() => {
        process.env.REACT_APP_NYT_API_KEY = 'test-api-key';
    });

    afterEach(() => {
        mockAxios.reset(); 
    });

    describe('getBookList', () => {
        it('should fetch and return book listings', async () => {
            const mockBooks: BookListing[] = [
                { title: 'Book 1', author: 'Author 1', description: 'Description 1', publisher: 'Publisher 1', price: 10 }
            ];

            mockAxios.onGet('https://api.nytimes.com/svc/books/v3/lists/best-sellers.json?api-key=test-api-key').reply(200, {
                results: mockBooks
            });

            const result = await getBookList();
            expect(result).toEqual(mockBooks);
        });

        it('should throw an error if the request fails', async () => {
            mockAxios.onGet('https://api.nytimes.com/svc/books/v3/lists/best-sellers.json?api-key=test-api-key').reply(500);

            await expect(getBookList()).rejects.toThrow('Request failed with status code 500');
        });
    });

    describe('getBookReviewByTitle', () => {
        it('should fetch and return book reviews', async () => {
            const mockReviews: BookReview[] = [
                { book_title: 'Book 1', book_author: 'Author 1', byline: 'Byline 1', url: 'http://example.com', publication_dt: '2023-01-01' }
            ];

            mockAxios.onGet('https://api.nytimes.com/svc/books/v3/reviews.json?title=Book%201&api-key=test-api-key').reply(200, {
                results: mockReviews
            });

            const result = await getBookReviewByTitle('Book 1');
            expect(result).toEqual(mockReviews);
        });

        it('should throw an error if the request fails', async () => {
            mockAxios.onGet('https://api.nytimes.com/svc/books/v3/reviews.json?title=Book%201&api-key=test-api-key').reply(500);

            await expect(getBookReviewByTitle('Book 1')).rejects.toThrow('Request failed with status code 500');
        });
    });
});