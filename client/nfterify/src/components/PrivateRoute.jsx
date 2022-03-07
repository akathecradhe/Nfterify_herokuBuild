import {Route, Redirect} from 'react-router-dom';
import { useUser } from './useUser';

import React from 'react'

function PrivateRoute(props) {

    const user = useUser();

    if(!user) return <Redirect to={"/Login"} />

    return <Route {...props}/>
}

export default PrivateRoute;