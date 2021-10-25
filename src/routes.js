import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    USER_ROUTE
} from "./utils/consts";
import Basket from "./pages/Basket/Basket";
import MainPage_v2 from "./pages/Shop/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage/DevicePage";
import UserPage from "./pages/UserPage/UserPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: USER_ROUTE,
        Component: UserPage,
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: MainPage_v2,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: DEVICE_ROUTE,
        Component: DevicePage,
    },
    {
        path: BASKET_ROUTE,
        Component: Basket,
    },
]
