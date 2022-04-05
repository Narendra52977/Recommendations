
import './App.css';

import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header';
import Pages from './components/Pages';
function App() {
  return (
    <Router>
       <div className='Main'>
         <Header/>
         <Pages/>
       </div>
    </Router>
   
  );
}

export default App;
