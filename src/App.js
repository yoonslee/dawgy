import React, { useState, useEffect } from "react";

import StartScreen from "./components/StartScreen";

function App() {
  const [dogs, setDogs] = useState([]);

  // useEffect(() => {

  // })

  return (
    <div className="App">
      <StartScreen />
    </div>
  );
}

export default App;
