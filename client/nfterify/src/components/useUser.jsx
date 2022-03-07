import { useState, useEffect } from 'react';
import  useToken  from './useToken';

//https://www.linkedin.com/learning/react-authentication/implementing-jwts-on-the-front-end?autoAdvance=true&autoSkip=true&autoplay=true&resume=false&u=35392996
//Devoloper: Shaun Wassell
export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        //jwt is made of 3 parts, we want the payload which is the 2nd
        const encodedPayload = token.split('.')[1];
        //returns javascript object
        console.log("this is the user"+ atob(encodedPayload))
        return JSON.parse(atob(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
}