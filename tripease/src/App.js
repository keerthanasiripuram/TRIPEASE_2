import logo from './logo.svg';

import {BrowserRouter,Routes,Switch,Route, useNavigate} from "react-router-dom"
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
import Hotel from "./pages/Hotel/Hotel";
import Spot from "./components/spot/Spot";
import NotFound from './components/NotFound';
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
      <Route exact path="/split" element={<SplitExpense/>}/>
      <Route exact path="/doc" element={<DocumentManagement/>}/>
      <Route exact path="/weather" element={<Weather/>}/>
      <Route exact path="/trip" element={<Trip/>}/>
      <Route exact path="/translator" element={<Translator/>}/>
      <Route exact path="/explore" element={<Explore/>}/>
      <Route exact path="/emergency" element={<Emergency/>}/>
      <Route exact path="/navbar" element={<Navbar/>}/>
      <Route exact path="/trip1" element={<Trip1/>}/>
      <Route exact path="/hotel" element={<Hotel/>}/>
      {/* <Route path="/attractions" element={<Attractions/>}/> */}
      <Route exact path="/spots" Component={Spot}/>
      {/* <Route path="/*" element={<NotFound/>}/> */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
