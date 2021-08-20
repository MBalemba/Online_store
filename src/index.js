import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import TaskStore from "./store/Tasks";
import BasketStore from "./store/BasketStore";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';


export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

export const user = new UserStore()
export const device = new DeviceStore()
export const taskInstance = new TaskStore()
export const basket = new BasketStore()


const theme = createTheme();

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value = {{
            user: user,
            device: device,
            taskInstance: taskInstance,
            basket: basket
        }}>

            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>

        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

