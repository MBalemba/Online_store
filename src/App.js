import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useEffect} from "react";
import TaskContainer from "./utils/TaskContainer";

function App() {

    useEffect(()=>{
        console.log('render')
    })
    return (
        <BrowserRouter className="App">
            <NavBar/>
            <AppRouter/>
            <TaskContainer />
        </BrowserRouter>
    );
}

export default App;
