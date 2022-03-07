import Image from "@material-tailwind/react/Image";
import H6 from "@material-tailwind/react/Heading6";
import {FaEthereum} from "react-icons/fa";
import {Link,useHistory} from 'react-router-dom';
import React from "react";
import axios from 'axios';
import {useState,useEffect} from "react";
import { useUser } from '../useUser';
import Icon from "@material-tailwind/react/Icon";
import ItemCard from "../ItemCard";
/*
* ui adpeted from : https://demos.creative-tim.com/material-tailwind-kit-react/#/profile?ref=readme-mtkr using materail ui and taillwindcss
* https://material-tailwind.com/
*
* */
export default function UserMainSection () {
    const history= useHistory();
    const user = useUser();
    const [itemList,setItemList]=useState('');
    const ProfilePicture = 'https://s3-alpha-sig.figma.com/img/26dc/f97a/323f0974666539a8ad5cc68f377c2a92?Expires=1643587200&Signature=ATG9~PlpGSnPpSyi44I26GvhYMb2fAzfrvpmkp9AJMb2r3GkqF3XxmESdhVdZU00aodgp39GSeSn72UshVv225WcBsxw2mXyEZWer788B3t~sLLTZmbsOF~hMq6xTfGUY0BjpxjA4ejqFpXRpNzzNKA4aTan4~w3-7Sa4cMyefg35vewVq1LJPpze8eDjXzOhp~Ar18sWGoSjomjT--t6v6lCJKTulXwQku24ZYjSanDT9OGZxTx2q5QtBHUWVjp8en2jwJIHC4cESH7wD-x7tp76uBpKXJ4TjyrIe7Gd5driYwSD~MQ3sb3RISoQm9r2~YFH9g94f099qyqHr48iQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
    const [view, setView] = useState('mint');
    const setToMint = () => {
      setView('mint')
    }
    const setToWallet = () => {
        setView('wallet')
    }
    //let itemData = Array.from(GetItems(user.userRole,user.userInfoID));

    axios.get('http://localhost:3001'+'/'+user.userRole+'/getItems/'+user.userInfoID,{timeout: 1000})
        .then( (response) =>
        {
            setItemList(response.data)

            console.log(response.data);
        }).catch(errors => {
        // react on errors.
        console.error(errors);
    });

    console.log("This is the item data "+ JSON.stringify(itemList) );
    let itemData= Array.from(itemList)
    return (
                <>
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <div className="w-40 -mt-20 bg-white border rounded-full ">
                                            <Image src={ProfilePicture} alt="Profile picture" raised rounded/>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center flex justify-center mt-10 lg:justify-end lg:mt-0">
                                    <button className="btn border-blue-500 " type="button"><Icon name="settings" size="lg" />Settings</button>
                                </div>


                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className=" flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center ">

                                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                                <button type="button"
                                                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200  ">
                                                     <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                                            22
                                                        </span>
                                                    <span className="text-sm text-gray-700">
                                                            Items created
                                                        </span>
                                                </button>

                                                <button type="button"
                                                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200   ">
                                                   <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                                            89
                                                        </span>
                                                    <span className="text-sm text-gray-700">
                                                            Collections
                                                        </span>
                                                </button>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="text-center my-8">
                                <H6 color="gray">@{user.username}</H6>
                                <div className="mt-0 mb-2 text-gray-700  flex items-center justify-center gap-2">
                                    <FaEthereum  name="place" size="" />
                                    <span className='text-tahiti truncate ... text-cyan-400 '>0xd12Cd8A37F074e7eAFae618C986Ff825666198bd </span>
                                </div>
                            </div>
                            <div className="flex justify-center gap-x-40 ">
                                <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                                    <button className="font-medium text-center text-gray-500 rounded-t-lg border-b-2
                                                border-transparent hover:text-blue-700 hover:border-blue-700 " aria-current="page"
                                            onClick={() =>setToMint()}  >
                                          Mint
                                    </button>
                                </div>
                                <div className="mb-3 text-gray-700 text-center  gap-6">
                                    <span>
                                        <button className="font-medium text-center text-gray-500 rounded-t-lg border-b-2
                                              border-transparent hover:text-blue-700 hover:border-blue-700 "
                                                onClick={() => setToWallet()}>
                                              Wallet
                                        </button>
                                    </span>
                                </div>
                            </div>

                    <div className="mb-10 py-2 border-t border-gray-200 text-center">

                        {/*//show create item*/}
                        <>
                            {view === 'mint' && (
                                // <AddTripButton addTrip={() => setState('add-trip') } />
                                <>
                                <button
                                        className="btn border-blue-500 " type="button" onClick={()=>history.push('/mint')}>
                                    Mint item
                                </button>
                                </>
                            )}
                        </>

                        {/*//show wallet*/}
                        <>
                            {view === 'wallet' && (
                                <div className="container mx- justify-center">
                                            <div className="px-3 py-10 gap-y-10 sm:grid
                                             mdsm2:grid-cols mdsm1:grid-cols-3

                                             md:grid-cols-3 xl:grid-cols-3">
                                                {
                                                    itemData.map((item) =>  (
                                                            <ItemCard key={item._id} item ={item}  />
                                                    ))
                                                }
                                            </div>

                                </div>

                            )}
                        </>
                    </div>

                     </>

);
}


export function GetItems(role,userDetailId){
    const [itemList, setItemList] = useState([]);
    const baseurl= 'http://localhost:3001';
    console.log('usrl ' + baseurl+'/'+role+'/getItems/'+userDetailId );

    useEffect(() => {
            async function makeAPICall(){

                await axios.get('http://localhost:3001'+'/'+role+'/getItems/'+userDetailId)
                    .then( (response) =>
                    {
                        setItemList(response.data);
                        console.log(response.data);
                    });
            }
            makeAPICall()
        }
        , [])

    console.log(itemList);
    return itemList;

};