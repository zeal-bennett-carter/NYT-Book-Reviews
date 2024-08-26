import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BooksList from '../components/bookslist';
import { getBookList } from '../services/booksretriever';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../services/booksretriever', () => ({
    getBookList: jest.fn(),
  }));

test('Bookslist component renders correctly', async () => {
    const mockBooks = [{ title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', price: 10 }];
    (getBookList as jest.Mock).mockResolvedValue(mockBooks);
    await act(async () => {
        render(
            <BrowserRouter>
                <BooksList />
            </BrowserRouter>
        );
    });
    await waitFor(() => {
      expect(screen.getByText('NYT Best Sellers')).toBeInTheDocument();
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Publisher 1')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
    });
});
