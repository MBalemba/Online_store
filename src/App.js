import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useContext, useEffect, useState} from "react";
import TaskContainer from "./utils/TaskContainer";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {ClimbingBoxLoader, PuffLoader} from "react-spinners";
import {Container} from "@material-ui/core";
import {Footer} from "./components/Shop/MainShop/MainShop";




const App = observer(function () {

    const {user, basket} = useContext(Context)
    const [loader, setLoader] = useState(true)


    useEffect(()=>{
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault()
            // Chrome требует установки возвратного значения.
            basket.SaveInCookie()
        });
    })

    useEffect(()=>{
        basket.SetFromCookie()
    }, [])


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
                    <Container>
                        <Footer/>
                    </Container>
                    <TaskContainer />
                </>
            }

        </BrowserRouter>
    );
});

export default App;
