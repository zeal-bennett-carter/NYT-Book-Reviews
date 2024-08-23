import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import BooksList from './components/bookslist';
import InvalidURL from './components/invalidUrl';
import BookReviews from './components/bookreviews';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BooksList/>,
      errorElement: <InvalidURL/>
    },
    {
      path: 'reviews/:bookTitle',
      element: <BookReviews/>,
      errorElement: <InvalidURL/>
    }
  ]);

  let [pageName,setPageName] = useState<string>('NYT Bestsellers')

  console.log("App component rendered");

  return (
    
    <div className="outer-content-holder">
        <RouterProvider router={router} />
    </div>

  );
}

export default App;
