import {useState} from 'react'
import Header from './components/header';
import BooksRetriever from './components/booksretriever';

function App() {

  let [pageName,setPageName] = useState<string>('Starter Header')


  return (
    
    <div className="outer-content-holder">
      <Header pageName={pageName}/>
      <BooksRetriever/>
    </div>

  );
}

export default App;
