import logo from './logo.svg';

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
import globalRouter from './globalRouter'
import Navbar from "./components/navbar/Navbar";
import Trip1 from "./components/trip1/trip1"
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
     {/* <Route path="/reg" element={<Reg/>}/>
      <Route path="/modal" element={<Modal/>}/>*/}
      <Route path="/split" element={<SplitExpense/>}/>
      <Route path="/doc" element={<DocumentManagement/>}/>
      <Route path="/weather" element={<Weather/>}/>
      <Route path="/trip" element={<Trip/>}/>
      <Route path="/translator" element={<Translator/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/emergency" element={<Emergency/>}/>
      <Route path="/navbar" element={<Navbar/>}/>
      <Route path="/trip1" element={<Trip1/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
