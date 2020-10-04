import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Reserving from "../src/Reserving";
import Nav from "../src/nav";

function App() {
  return (
    <div class="cover-container d-flex p-2 mx-auto flex-column">      
      <div class="inner cover">
        <Reserving />
      </div>
    </div>                       
  );
}

export default App;
