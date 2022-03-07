import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useToken from './useToken';

const Login = () => {
  //const [emailValue, setEmailValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const baseurl = 'http://localhost:3001';
  const history = useHistory();
  const [token, setToken] = useToken();

  const OnClickLogin = async () => {
    // try {
    //get response to server
    let proceed;
    let itoken;
    let a;
    const response = await axios
      .post('/api/login', {
        email: emailValue,
        password: passwordValue,
      })
      .then((response) => {
        itoken = response.data;
        setToken(itoken);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
        console.error('There was an error!', error);
      });

    // if(proceed){
    //     setToken(itoken);
    //     history.push('/');
    // }
  };

  const OnClickforgetPass = async () => {
    alert('pass word not implemented yet');
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              blockify
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            Log in
          </h2>
          {errorMessage && (
            <div className="failfail p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
              {errorMessage}
            </div>
          )}

          <div className="mt-12">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            {/* <input
                                value={emailValue}
                                onChange={e => setEmailValue(e.target.value)}
                                placeholder="someone@gmail.com" /> */}
            <input
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="someone@gmail.com"
            />

            <hr />
            <input
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="password"
            />
            <hr />
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full w-36"
              disabled={!emailValue || !passwordValue}
              onClick={OnClickLogin}
            >
              Log In
            </button>
            <div></div>
            <button onClick={OnClickforgetPass}>Forgot your password?</button>

            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an account ?
              <button
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                onClick={() => history.push('/register')}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"></div>
      </div>
    </div>
  );
};

export default Login;
