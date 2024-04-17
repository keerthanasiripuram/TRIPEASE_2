import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Trial from "./components/Trial"
import Profile from "./pages/Profile"
import Reg from "./pages/Reg"
import Modal from "./components/Modal"
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/trial" element={<Trial/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/reg" element={<Reg/>}/>
      <Route path="/modal" element={<Modal/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
