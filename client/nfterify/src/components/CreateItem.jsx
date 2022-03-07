import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './useUser';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useHistory, Link } from 'react-router-dom';

function CreateItem() {
  const baseurl = 'http://localhost:3001';
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [collectionName, setCollectionName] = useState('');
  let brandName;
  const [image, setImage] = React.useState('url of object');
  const history = useHistory();

  const [small, setSmall] = useState(0);
  const [xSmall, setXsmall] = useState(0);
  const [medium, setMedium] = useState(0);
  const [large, setLarge] = useState(0);
  const [xLarge, setXlarge] = useState(0);

  const getRandomImg = () => {
    const images = [
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-cal1529_1445x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-Cal0466_533x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-Cal0451_533x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-Cal0468_533x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-Cal0470_533x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-cal2309_533x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/jokatee_533x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-cal1597_533x.jpg',
      'https://cdn.shopify.com/s/files/1/0270/1351/3269/products/Jehu-cal1586_533x.jpg',
    ];
    const randomNum = Math.floor(Math.random() * 8);
    console.log(randomNum);
    return images[randomNum];
  };

  useEffect(() => {
    setImage(getRandomImg());
  }, []);

  //Get the current user
  const user = useUser();
  console.log(user);
  console.log('current userID is' + user.userInfoID);
  //GET THE Id of the user details
  const userDetailsID = user.userInfoID;
  brandName = user.username;

  const postData = () => {
    const sizes = {
      xsmall: xSmall,
      small: small,
      medium: medium,
      large: large,
      xlarge: xLarge,
    };

    axios.post('/admin/createItem', {
      name: name,
      description: description,
      brandName: brandName,
      collectionName: collectionName,
      image: image,
      userDetailsID: user.userInfoID,
      sizes: sizes,
    });
    console.log(xSmall, small, medium, large, xLarge);
    history.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create An Item
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w"></p>
      </div>

      <div>
        <Link to={'/dashboard'}>
          {' '}
          <FaArrowCircleLeft size={40} />{' '}
        </Link>
      </div>

      <form
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        onSubmit={postData}
      >
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 drop-shadow-2xl">
          <div className="mb-0 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {' '}
                Image{' '}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-300 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-300"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="itemname"
                className="block text-sm font-medium text-gray-700"
              >
                Item Name
              </label>
              <div className="mt-1">
                <input
                  id="itemname"
                  name="itemname"
                  type="name"
                  autoComplete="itemname"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3
                         text-gray-700 leading-tight focus:outline-none focus:shadow-out
                         line focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Collection"
                className="block text-sm font-medium text-gray-700"
              >
                Collection
              </label>
              <div className="mt-1">
                <select
                  id="Collection"
                  name="Collection"
                  required
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                          leading-tight bg-white rounded-md shadow-sm
                        focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  onChange={(e) => setCollectionName(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Iced blue">Iced blue</option>
                  <option value="Purple swag">Purple swag</option>
                  <option value="Rain">Rain</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  type="description"
                  autoComplete="description"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                                leading-tight focus:outline-none focus:shadow-outline focus:outline-none focus:ring-blue-300 focus:border-blue-300
                                "
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <label
              htmlFor="heading"
              className="block text-sm font-medium text-gray-700"
            >
              Sizes Available
            </label>
            <div className="inline-grid grid-cols-6 gap-6">
              <span>
                <label
                  htmlFor="sizeXL"
                  className="block text-sm font-medium text-gray-700"
                >
                  XL
                </label>
                <div className="mt-1">
                  <input
                    id="sizeXL"
                    name="xLarge"
                    type="number"
                    placeholder="0"
                    min="0"
                    required
                    className="shadow appearance-none border rounded w-10 h-10
                                    py-2 px-3 text-gray-700 leading-tight focus:outline-none w-14 h-14
                                    focus:shadow-outlinefocus:outline-none focus:ring-blue-300 focus:border-blue-300
                                    "
                    onChange={(e) => setXlarge(e.target.value)}
                  />
                </div>
              </span>

              <span>
                <label
                  htmlFor="sizeL"
                  className="block text-sm font-medium text-gray-700"
                >
                  L
                </label>
                <div className="mt-1">
                  <input
                    id="sizeL"
                    name="large"
                    type="number"
                    placeholder="0"
                    min="0"
                    required
                    className="shadow appearance-none border rounded w-10 h-10
                                    py-2 px-3 text-gray-700 leading-tight focus:outline-none w-14 h-14
                                    focus:shadow-outlinefocus:outline-none focus:ring-blue-300 focus:border-blue-300
                                    "
                    onChange={(e) => setLarge(e.target.value)}
                  />
                </div>
              </span>

              <span>
                <label
                  htmlFor="sizeM"
                  className="block text-sm font-medium text-gray-700 "
                >
                  M
                </label>
                <div className="mt-1">
                  <input
                    id="sizeM"
                    name="medium"
                    type="number"
                    placeholder="0"
                    min="0"
                    required
                    className="shadow appearance-none border rounded w-10 h-10
                                    py-2 px-3 text-gray-700 leading-tight focus:outline-none w-14 h-14
                                    focus:shadow-outlinefocus:outline-none focus:ring-blue-300 focus:border-blue-300
                                    "
                    onChange={(e) => setMedium(e.target.value)}
                  />
                </div>
              </span>

              <span>
                <label
                  htmlFor="sizeS"
                  className="block text-sm font-medium text-gray-700"
                >
                  S
                </label>
                <div className="mt-1">
                  <input
                    id="sizeS"
                    name="small"
                    type="number"
                    placeholder="0"
                    min="0"
                    required
                    className="shadow appearance-none border rounded w-14 h-14
                                    py-2 px-3 text-gray-700 leading-tight focus:outline-none
                                    focus:shadow-outlinefocus:outline-none focus:ring-blue-300 focus:border-blue-300
                                    "
                    onChange={(e) => setSmall(e.target.value)}
                  />
                </div>
              </span>

              <span>
                <label
                  htmlFor="xSmall"
                  className="block text-sm font-medium text-gray-700"
                >
                  XS
                </label>
                <div className="mt-1">
                  <input
                    id="sizeXS"
                    name="xSmall"
                    type="number"
                    placeholder="0"
                    min="0"
                    className="shadow appearance-none border rounded w-14 h-14
                                    py-2 px-3 text-gray-700 leading-tight focus:outline-none
                                    focus:shadow-outlinefocus:outline-none focus:ring-blue-300 focus:border-blue-300
                                    "
                    onChange={(e) => setXsmall(e.target.value)}
                  />
                </div>
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent
                    rounded-full shadow-sm text-sm font-medium text-white bg-blue-300
                     hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                Generate Item
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateItem;
