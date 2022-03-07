import  {useState}  from 'react';
//https://www.linkedin.com/learning/react-authentication/implementing-jwts-on-the-front-end?autoAdvance=true&autoSkip=true&autoplay=true&resume=false&u=35392996
//Devoloper: Shaun Wassell
const useToken = () => {
    //our local storage is used to initate the token variable
    const [token, setTokenInternal] = useState( () => {

        return sessionStorage.getItem('token');
    });

    const setToken = newToken => {
        let a;
        // the token fetched from the backend is set in the local storage
        try {
            sessionStorage.setItem('token', newToken);
            a = sessionStorage.getItem('token');
            console.log("the token has been set a" + a)
        } catch (error) {
            console.log(error)
        }


        setTokenInternal(newToken);
    }

    return [token, setToken];
}

export default useToken;