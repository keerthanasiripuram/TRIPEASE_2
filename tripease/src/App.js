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
import SplitExpense from "./components/SplitExpense"
import DocumentManagement from "./components/DocumentManagement"
import Weather from "./components/Weather"
import Trip from "./components/Trip"
import Translator from './components/Translator';
import Explore from "./components/Explore"
import Emergency from "./components/Emergency"
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
      <Route path="/split" element={<SplitExpense/>}/>
      <Route path="/doc" element={<DocumentManagement/>}/>
      <Route path="/weather" element={<Weather/>}/>
      <Route path="/trip" element={<Trip/>}/>
      <Route path="/translator" element={<Translator/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/emergency" element={<Emergency/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
