import {useState} from 'react'
import Header from './components/header';
import BooksList from './components/bookslist';

function App() {

  let [pageName,setPageName] = useState<string>('Starter Header')


  return (
    
    <div className="outer-content-holder">
      <Header pageName={pageName}/>
      <BooksList/>
    </div>

  );
}

export default App;
