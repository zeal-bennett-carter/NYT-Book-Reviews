import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import BookReviews from "../components/bookreviews";
import { getBookReviewByTitle } from '../services/booksretriever';


jest.mock('../services/booksretriever', () => ({
    getBookReviewByTitle: jest.fn(),
}));

test('BooksList component renders correctly with intended values when review(s) retrieved', async () => {
    const mockReviews = [{ byline: 'byline Author 1', url: 'nytreviews.com/book1', publication_dt: '01-01-2024' }];
    (getBookReviewByTitle as jest.Mock).mockResolvedValue(mockReviews);

    const mockLocationState = {
        state: {
            title: 'Mock Book Title',
            author: 'Mock Author',
            description: 'Mock Book Description'
        }
    };

    await act(async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/bookreviews', state: mockLocationState.state }]}>
                    <BookReviews />
            </MemoryRouter>
        );
    });
    await waitFor(() => {
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument();
      expect(screen.getByText('Author(s): Mock Author')).toBeInTheDocument();
      expect(screen.getByText('Description: Mock Book Description')).toBeInTheDocument();
      expect(screen.getByText('byline Author 1')).toBeInTheDocument();
      expect(screen.getByText('nytreviews.com/book1')).toBeInTheDocument();
      expect(screen.getByText('01-01-2024' )).toBeInTheDocument();
    });
});

test('BooksList component renders no reviews message correctly when book has no reviews', async () => {
    (getBookReviewByTitle as jest.Mock).mockResolvedValue([]);

    const mockLocationState = {
        state: {
            title: 'Mock Book Title',
            author: 'Mock Author',
            description: 'Mock Book Description'
        }
    };

    await act(async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/bookreviews', state: mockLocationState.state }]}>
                    <BookReviews />
            </MemoryRouter>
        );
    });
    await waitFor(() => {
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument();
      expect(screen.getByText('Author(s): Mock Author')).toBeInTheDocument();
      expect(screen.getByText('Description: Mock Book Description')).toBeInTheDocument();
      expect(screen.getByText('No Reviews Found')).toBeInTheDocument();
    });
});

test('BooksList component renders API limit message when attempt to get reviews fails', async () => {
    (getBookReviewByTitle as jest.Mock).mockRejectedValue(new Error('Failed to Get Book Reviews'));

    const mockLocationState = {
        state: {
            title: 'Mock Book Title',
            author: 'Mock Author',
            description: 'Mock Book Description'
        }
    };

    await act(async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/bookreviews', state: mockLocationState.state }]}>
                    <BookReviews />
            </MemoryRouter>
        );
    });
    await waitFor(() => {
      expect(screen.getByText('NYT API Rate Limit Reached, Please Return Home')).toBeInTheDocument();
    });
});