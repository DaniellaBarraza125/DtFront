import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Register from './components/Register/Register'
import { ChakraProvider } from "@chakra-ui/react";
import Schedule from "./components/Schedule/Schedule";
import EventDetail from "./components/EventDetail/EventDetail";
import Stepper from "./components/Stepper/Stepper";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";

function App() {
  return (
    <>
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/eventDetail/:id" element={<EventDetail/>} />
          <Route path="/stepper" element={<Stepper/>} />
          <Route path="/personalInfo" element={<PersonalInfo/>} />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;