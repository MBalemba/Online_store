import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import TaskStore from "./store/Tasks";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)



ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value = {{
            user: new UserStore(),
            device: new DeviceStore(),
            taskInstance: new TaskStore(),
            basket: new BasketStore()
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

