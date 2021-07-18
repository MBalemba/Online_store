import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useContext, useEffect} from "react";
import TaskContainer from "./utils/TaskContainer";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App = observer(function () {
    const {user} = useContext(Context)
    useEffect(()=>{
        user.checkAutorize()
    }, [])
    return (
        <BrowserRouter className="App">
            <NavBar/>
            <AppRouter/>
            <TaskContainer />
        </BrowserRouter>
    );
})

export default App;
