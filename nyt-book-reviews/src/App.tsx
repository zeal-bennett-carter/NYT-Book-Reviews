import {useState} from 'react'
import Header from './components/header';

function App() {

  let [pageName,setPageName] = useState<string>('Starter Header')


  return (
    <div className="outer-content-holder">
      <Header pageName={pageName}/>
    </div>
  );
}

export default App;
