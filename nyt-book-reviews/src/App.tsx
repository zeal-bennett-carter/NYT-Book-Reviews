import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Header from './components/header';
import BooksList from './components/bookslist';
import BookDetails from './components/bookdetails';
import InvalidURL from './components/invalidUrl';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BooksList/>,
      errorElement: <InvalidURL/>
    },
    {
      path: 'details/:bookTitle',
      element: <BookDetails/>,
      errorElement: <InvalidURL/>
    }
  ]);

  let [pageName,setPageName] = useState<string>('Starter Header')

  return (
    
    <div className="outer-content-holder">
      <Header pageName={pageName}/>
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
