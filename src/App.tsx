import { Routes, Route } from 'react-router-dom';
import Questions from './views/Questions';
import Registration from './views/Registration';
import Navigation from './components/Navigation';
import Home from './Home';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap-icons/font/bootstrap-icons.css";


export default function App() {


  return (
    <>
    <Navigation/>
    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/questions" element={<Questions />} />
          <Route path="/registration" element={<Registration />}/>
    </Routes>
    </>
  );
};

