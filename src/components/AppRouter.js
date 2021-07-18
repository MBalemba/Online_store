import React, {useContext, useEffect} from 'react';
import {Switch, Route, Redirect } from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component})=>
                <Route exact key={path} path={path} component={Component} />
            )}
            {publicRoutes.map(({path, Component})=>
                <Route exact={path!==SHOP_ROUTE} key={path} path={path} component={Component} />
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;