import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './useToken';
import axios from 'axios';

const RegisterUser = () => {
  const [emailValue, setEmailValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmedPasswordValue, setConfirmedPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [storePassValue, setStorePass] = useState('');
  const [token, setToken] = useToken();
  const baseurl = 'http://localhost:3001';
  const history = useHistory();
  let user;

  const OnClickSignup = async () => {
    // try {
    let itoken;

    const response = await axios
      .post('/api/register', {
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        storePass: storePassValue,
      })
      .then((response) => {
        itoken = response.data;
        setToken(itoken);
        history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div></div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            Register
          </h2>

          <div className="mt-12">
            <h1>Sign Up</h1>
            {errorMessage && (
              <div className="fail p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                {errorMessage}
              </div>
            )}
            <input
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="someone@gmail.com"
            />

            <input
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              placeholder="user1"
            />

            <input
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="password"
            />

            <hr />

            <div className="py6">
              <input
                className=""
                type="password"
                value={confirmedPasswordValue}
                onChange={(e) => setConfirmedPasswordValue(e.target.value)}
                placeholder="password"
              />
              <hr />
            </div>

            <div className="py6">
              <input
                value={storePassValue}
                onChange={(e) => setStorePass(e.target.value)}
                placeholder="Store Pass"
              />
              <hr />
            </div>

            <div>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full w-36"
                disabled={
                  !emailValue ||
                  !passwordValue ||
                  passwordValue !== confirmedPasswordValue
                }
                onClick={OnClickSignup}
              >
                Sign Up
              </button>
            </div>

            <div>
              <button
                className=" text-blue-500"
                onClick={() => history.push('/login')}
              >
                Already have an account? Log In
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

export default RegisterUser;
