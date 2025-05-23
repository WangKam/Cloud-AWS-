import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => (
 <BrowserRouter>
   <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth' exact component={Auth} />
      </Switch>
    </Container> 
 </BrowserRouter>
  
 
);


import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <h1>Upload Image</h1>
      <FileUpload />
    </div>
  );
}

export default App;
