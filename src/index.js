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


const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1170,
            xl: 1920,
        },
    },

    typography: {
        htmlFontSize: 16,
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontFamily: 'Nunito',
            fontWeight: 300,
            fontSize: "103px",
            lineHeight: '144px',
            letterSpacing: "-1.5px",
        },

        h2: {
            fontFamily: 'nunito',
            fontWeight: 300,
            fontSize: "3.75rem",
            lineHeight: '88px',
            letterSpacing: "-0.5px",
        },

        h3: {
            fontFamily: 'nunito',
            fontWeight: 400,
            fontSize: "51px",
            lineHeight: '72px',
            letterSpacing: "0px",
        },
        h4: {
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: '48px',
            letterSpacing: "0.25px",
        },
        h5: {
            fontFamily: 'nunito',
            fontWeight: 400,
            fontSize: "26px",
            lineHeight: '40px',
            letterSpacing: "0px",
        },
        h6: {
            fontFamily: 'nunito',
            fontWeight: 500,
            fontSize: "21px",
            lineHeight: '32px',
            letterSpacing: "0.15px",
        },
        subtitle1: {
            fontFamily: 'nunito',
            fontWeight: 400,
            fontSize: "17px",
            lineHeight: '24px',
            letterSpacing: "0.15px",
        },

        subtitle2: {
            fontFamily: 'nunito',
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: '24px',
            letterSpacing: "0.1px",
        },

        body1: {
            fontFamily: 'nunito',
            fontWeight: 400,
            fontSize: "17px",
            lineHeight: '24px',
            letterSpacing: "0.5px",
        },

        body2: {
            fontFamily: 'nunito',
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: '24px',
            letterSpacing: "0.25px",
        },

        button: {
            fontFamily: 'nunito',
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: '16px',
            letterSpacing: "1.25px",
        },

        caption: {
            fontFamily: 'nunito',
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: '16px',
            letterSpacing: "0.4px",
        },

        overline: {
            fontFamily: 'nunito',
            fontWeight: 500,
            fontSize: "11px",
            lineHeight: '16px',
            letterSpacing: "1.5px",
        },

    },


});

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

