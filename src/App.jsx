import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Register from './components/Register/Register'
import { ChakraProvider } from "@chakra-ui/react";
import Schedule from "./components/Schedule/Schedule";

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
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;