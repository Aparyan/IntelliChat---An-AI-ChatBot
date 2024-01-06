import Login from "./pages/Login";
import './styles/App.css';
import SpeechToText from "./pages/SpeechToText";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [ authorized, setAuthorized ] = useState(((localStorage.getItem("username") === 'null') || (localStorage.getItem("username") === null)) ? false : true);
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login authorized={authorized} />} />
        <Route path="/speech" element={<SpeechToText authorized={authorized} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;