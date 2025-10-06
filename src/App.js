import { useState } from "react";
import "./App.css";
//import About from "./component/About";
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
import Alert from "./component/Alert";

import React from "react";
/*import { BrowserRouter as Router, Switch, Route ,Link } from "react-router-dom";*/

function App() {
  const [mode, setmode] = useState("light"); //whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "failed");
    }
  };

  return (
    <>
      {/*<Navbar title="TextUtils" aboutText="About TextUtils">*/}
      {/*<Navbar/>*/}
      {/*<Router>*/}
        <Navbar
          title="TextUtils"
          aboutText="About Us"
          mode={mode}
          toggleMode={toggleMode}
        />
        <Alert alert={alert} />
        <div className="container my-3">
        
          {/*<Switch>*/}
            {/*<Route path="/about">*/}
              {/*<About/>
            </Route>*/}
            {/*<Route path="/home">*/}
              <TextForm
                showAlert={showAlert}
                heading="Enter the text to analyze below"
                mode={mode}
              />
            {/*</Route>*/}
          {/*</Switch>*/}
        </div>
      {/*</Router>*/}
    </>
  );
}

export default App;
