import logo from './logo.svg';
import Home from './pages/Home';
import Results from './pages/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar';


function App() {
  return (
    <Router>
      <div>
        <CustomNavbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/results" element={<Results/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;