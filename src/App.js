import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Navigation from './Components/Navigation/Navigation';
import Keyword from './Components/Keyword/Keyword';


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/:keyword' element={<Keyword />} />
      </Routes>
    </>
  );
}

export default App;
