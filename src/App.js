import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useContext, useEffect, useState} from "react";
import TaskContainer from "./utils/TaskContainer";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {ClimbingBoxLoader, PuffLoader} from "react-spinners";

const App = observer(function () {
    const {user} = useContext(Context)
    const [loader, setLoader] = useState(true)


    useEffect(()=>{
        user.checkAutorize()
            .then(()=>{
                setTimeout(()=>{setLoader(false)}, 1000)
            })
    }, [])




    return (
        <BrowserRouter className="App">
            {loader
                ?
                <div style={{position: 'absolute', display: 'flex', justifyContent:'center', alignItems:"center",  top: '0', bottom: '0', left:'0', right: '0', width: '100vw', height: '100vh'}}>

                        <PuffLoader speedMultiplier={3} size={200} />

                </div>
                :
                <>
                    <NavBar/>
                    <AppRouter/>
                    <TaskContainer />
                </>
            }

        </BrowserRouter>
    );
});

export default App;
