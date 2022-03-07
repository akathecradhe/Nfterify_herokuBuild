import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListItems from './ListItems';
import { GetItems } from './MainSection';
import ItemCard from './ItemCard';
import { useUser } from './useUser';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Modal from '@material-tailwind/react/Modal';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalBody from '@material-tailwind/react/ModalBody';

const ItemDetail = () => {
  const user = useUser();
  const [item, SetItem] = useState('');
  const [xsmall, SetXsmall] = useState([]);
  const [small, SetSmall] = useState([]);
  const [medium, SetMedium] = useState('');
  const [large, SetLarge] = useState('');
  const [xlarge, SetXlarge] = useState('');
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [sizeObject, setSizeObject] = useState([]);
  // let sizeObject= [];

  console.log(user.userRole, user.userInfoID);
  // let itemData = Array.from(GetItems(user.userRole,user.userInfoID));
  let { itemId } = useParams();
  console.log(itemId);
  let userDetailId = user.userInfoID;
  let role = user.userRole;

  let data;
  const baseurl = 'http://localhost:3001';
  console.log('/getUserDetails/' + userDetailId);
  let one = '/getUserDetails/' + userDetailId;
  let two = '/getItemDetails/' + itemId;
  let three = '/' + role + '/getItems/' + userDetailId;

  const requestOne = axios.get(one, { timeout: 600 });
  const requestTwo = axios.get(two, { timeout: 600 });
  const requestThree = axios.get(three, { timeout: 600 });

  axios
    .all([requestOne, requestTwo, requestThree])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const itemdetails = responses[1].data;
        const allItems = responses[2].data;
        // use/access the results
        //console.log("this is response oone "+JSON.stringify(responseOne),
        //     "this is response two "+JSON.stringify(responseTwo),
        //     "this is response three "+JSON.stringify(responesThree));

        data = { responseOne, itemdetails, allItems };
        console.log('this is one' + JSON.stringify(responseOne));
        console.log('this is two' + JSON.stringify(itemdetails));
        console.log('this is three' + JSON.stringify(allItems));

        //Find the item by ID
        let item = allItems.find((i) => i._id === itemId);
        SetItem(item);
        // console.log("ttype check "+JSON.stringify(itemdetails.data))
        // let size= itemdetails.data.filter(i => i.size === "xsmall" )

        function getSizeDetails(dataSet, size) {
          let x = Array.from(dataSet);
          let y = x.filter((i) => i.size === size);
          console.log('THIS IS THE FILTERED LIST' + JSON.stringify(y[0].size));
          return y;
        }

        //console.log("ttype check "+ JSON.stringify(size))
        let xsmall = getSizeDetails(itemdetails, 'xsmall');
        let small = getSizeDetails(itemdetails, 'small');
        let medium = getSizeDetails(itemdetails, 'medium');
        let large = getSizeDetails(itemdetails, 'large');
        let xlarge = getSizeDetails(itemdetails, 'xlarge');

        SetXsmall(xsmall);
        console.log('THIS IS THE SIZE OBJECT' + xsmall[0].mintUID);

        SetSmall(small);

        SetMedium(medium);
        SetLarge(large);
        SetXlarge(xlarge);
      })
    )
    .catch((errors) => {
      // react on errors.
      console.error(errors);
    });

  function setShowModalCode(statusIN) {
    if (statusIN == 'xsmall') {
      console.log('THIS IS THE SIZE small');

      setSizeObject(xsmall);
      console.log('THIS IS THE SIZE sizeobejct xsmall ' + xsmall);
      console.log(
        'THIS IS THE SIZE sizeobejct size ' + JSON.stringify(sizeObject)
      );
    } else if (statusIN === 'small') {
      setSizeObject(small);
    } else if (statusIN === 'medium') {
      setSizeObject(medium);
    } else if (statusIN === 'large') {
      setSizeObject(large);
    } else {
      setSizeObject(xlarge);
    }

    setShowModal(true);
  }

  return (
    <div className="bg-slate-50">
      <div className="flex ">
        <div>
          <Link className="px-10 mx-10" to={'/'}>
            {' '}
            <FaArrowCircleLeft size={40} />{' '}
          </Link>
        </div>
        <div>
          {/*//<img className=" " src={item.image} alt="display "/>*/}

          <div className="bg-white rounded-lg shadow-lg">
            <img src={item.image} alt="" className="rounded-t-lg" />
            <div className="p-6">
              <h2 className="font-bold content-center mb-2 text-2xl text-purple-800">
                {item.name}
              </h2>
              <h4 className="py-3">
                <span className="font-bold">Brand: </span> {item.brandName}
              </h4>
              <h4 className="py-3">Collection Name : {item.collectionName}</h4>
              <h4 className="break-words py-3 text-overflow">
                {' '}
                Description {item.description}
              </h4>
            </div>
          </div>
        </div>
        <div>
          <Modal
            size="regular"
            active={showModal}
            toggler={() => setShowModal(false)}
          >
            <ModalHeader toggler={() => setShowModal(false)}>
              Modal Title
            </ModalHeader>
            <ModalBody>
              <table className="table-fixed py-15">
                <thead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
                                                 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
                                                 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      MintUID
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
                                                     text-left text-xs font-semibold text-gray-700 truncate ... uppercase tracking-wider"
                    >
                      Owner
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
                                                  text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Claimed
                    </th>
                  </tr>
                </thead>
                {/*{*/}
                {/*    Object.values(sizeObject).forEach(val => {*/}
                {/*        console.log("this is the valjue"+ val._id)*/}
                {/*        (<TableBody  object={val} />);*/}
                {/*    })}*/}
                <tbody>
                  {sizeObject.map((obj) => {
                    return (
                      <tr className="px-5 py-3 border-b-2">
                        <td>{obj.size}</td>
                        <td>{obj.mintUID}</td>
                        {obj.length > 6 ? (
                          <td>obj.owner</td>
                        ) : (
                          <td>no owner</td>
                        )}
                        {obj.claimed === true ? <td>true</td> : <td>false</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </ModalBody>
          </Modal>

          <table className="table-fixed py-15">
            <thead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Sizes
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total Created
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Item Mint Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="px-5 py-3 border-b-2">
                <td>Extra Small</td>
                <td>{xsmall.length}</td>
                <td>
                  <button
                    onClick={(e) => {
                      setStatus('xsmall');
                      console.log('this is your status:  ' + status);
                      setShowModalCode('xsmall');
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    expand
                  </button>
                </td>
              </tr>
              <tr className="px-5 py-3 border-b-2">
                <td> Small</td>
                <td>{small.length}</td>
                <td>
                  <button
                    onClick={(e) => {
                      setStatus('small');
                      // console.log("this is your status:  "+status)
                      setShowModalCode('small');
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    expand
                  </button>
                </td>
              </tr>
              <tr className="px-5 py-3 border-b-2">
                <td>Medium</td>
                <td>{medium.length} </td>
                <td>
                  <button
                    onClick={(e) => {
                      setStatus('medium');
                      console.log('this is your status:  ' + status);
                      setShowModalCode('medium');
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    expand
                  </button>
                </td>
              </tr>
              <tr className="px-5 py-3 border-b-2">
                <td>Large</td>
                <td>{large.length} </td>
                <td>
                  <button
                    onClick={(e) => {
                      setStatus('large');
                      console.log('this is your status:  ' + status);
                      setShowModalCode('large');
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    expand
                  </button>
                </td>
              </tr>
              <tr className="px-5 py-3 border-b-2">
                <td>Extra Large</td>
                <td>{xlarge.length} </td>
                <td>
                  <button
                    onClick={(e) => {
                      setStatus('large');
                      console.log('this is your status:  ' + status);
                      setShowModalCode('large');
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    expand
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ItemDetail;

// function SizeModel(sizeObject) {
//
//     console.log("this is the size of th eobject " + sizeObject)
//     return(
//     <table className="table-fixed py-15">
//         <thead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//         <tr>
//             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
//              text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Size</th>
//             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
//             text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">MintUID</th>
//             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
//             text-left text-xs font-semibold text-gray-700 truncate ... uppercase tracking-wider">Owner</th>
//             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
//              text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Claimed</th>
//         </tr>
//         </thead>
//         {
//             sizeObject.map((sizeitem ) =>(
//             <TableBody key={sizeitem._id} object={sizeitem} />
//         ))
//         }
//
//     </table>
//     )
// }

// function TableBody(object){
//
//     console.log("this is the obbbject"+ JSON.stringify(object));
//     return(
//
//         <tbody>
//         <tr className="px-5 py-3 border-b-2">
//             <td>{object.size}</td>
//             <td>{object.mintUID}</td>
//             { object.length>6 ?
//                 <td>object.owner</td>
//                 :<td>no owner</td>
//             }
//             <td>{object.claimed}</td>
//
//         </tr>
//         </tbody>
//     )
// }
