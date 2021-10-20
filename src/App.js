import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home"
import "./index.scss";



export default function App() {
 
  return (
    <div>  
      <Navbar/>
      <Home/>
    </div>
  );
}