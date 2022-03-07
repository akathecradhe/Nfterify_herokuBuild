import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useUser } from "../useUser";
import {FaArrowCircleLeft} from 'react-icons/fa'
import { useHistory,Link } from 'react-router-dom';


function MintItem() {
    const baseurl= 'http://localhost:3001'

    const [mintid, setMintId] = useState('');
    const history = useHistory ();

    //Get the current user
    const user= useUser();
    console.log(user);
    console.log("current userID is"+ user.userInfoID);
    //GET THE Id of the user details
    const userDetailsID = user.userInfoID;



    const postData =  () => {
        axios.post(baseurl+'/mintItems',{
            uniqueID: mintid
           ,currentUser:user.userInfoID,
        });
        console.log(mintid);
        history.push('/user');
        ;
    }

    return(

        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create An Item</h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w"></p>
            </div>

            <div>
                <Link to={"/"}> <FaArrowCircleLeft size={40} /> </Link>
            </div>

            <form className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={postData}>
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 drop-shadow-2xl">
                            <label htmlFor="itemname" className="block text-sm font-medium text-gray-700">Mint unique ID</label>
                            <div className="mt-1">
                                <input id="mintid" name="mintid"
                                       type="mintid" autoComplete="itemname" required className="shadow appearance-none border rounded w-full py-2 px-3
                                        text-gray-700 leading-tight focus:outline-none focus:shadow-out
                                         line focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                                       onChange={(e) => setMintId(e.target.value)} />
                            </div>


                        <div className="py-10">
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent
                                         rounded-full shadow-sm text-sm font-medium text-white bg-blue-300
                                   hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                            >Generate Item</button>
                        </div>
                </div>
            </form>


        </div>


    );
}

export default MintItem;