import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchData } from "./testFetch";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData("http://127.0.0.1:5000/demo").then((value) => {
      setData(value);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
