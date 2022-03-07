import React from "react";
import {BiLogOut} from "react-icons/bi";
import {useHistory} from 'react-router-dom';
import Button from "@material-tailwind/react/Button"

function NavBar (){

    const history = useHistory();

    const logout = () => {
        sessionStorage.removeItem('token');
        history.push('/login')
    }

    return (

        <div>
            <nav className="flex bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="/" className="flex">
                        <span
                            className="self-center text-3xl  font-semibold whitespace-nowrap hover:text-blue-700 ">NFTERITY</span>
                    </a>

                        <ul className="flex flex-col mt-4 sm:flex-row sm:space-x-8 sm:mt-0 sm:text-sm sm:font-medium">
                            <li className="nav-item text-black  ">
                                <Button className="nav-link hover:text-blue-700 "
                                        color="lightBlue"
                                        buttonType="link"
                                        size="regular"
                                        onClick={()=>logout()}>
                                    <BiLogOut className="text-black" name="place" size="30" />
                                    <span className=" text-black">LogOut</span>
                                </Button>
                            </li>
                        </ul>

                </div>
            </nav>

        </div>
    )
}

export default NavBar;