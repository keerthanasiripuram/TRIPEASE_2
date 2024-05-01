import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/home/Home"
import Trial from "./components/trial/Trial"
import Profile from "./pages/profile/Profile"
import Reg from "./pages/Reg"
import Modal from "./components/Modal"
import SplitExpense from "./components/split-expense/SplitExpense"
import DocumentManagement from "./components/document-management/DocumentManagement"
import Weather from "./components/weather-info/Weather"
import Trip from "./components/trip/Trip"
import Translator from './components/Translator';
import Explore from "./components/Explore"
import Emergency from "./components/Emergency"
import globalRouter from './globalRouter';

function GlobleRouter() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
}

function App() {
  return (
    <>
    <BrowserRouter>
    <GlobleRouter/>
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
