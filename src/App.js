import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useEffect} from "react";

function App() {

    useEffect(()=>{
        console.log('render')
    })
    return (
        <BrowserRouter className="App">
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
