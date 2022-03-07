import mongoose from "mongoose";

const item1 ={
    _id:mongoose.Types.ObjectId('61e61d2285fcebee7226e17e'),
    name:"jacket",
    description:"n/a",
    collectionName:'Purple collection',
    brandName:'jehucal',
    image:'google.com/image32',
    allitems: [mongoose.Types.ObjectId('61e61d2285fcebce7226e17e')],
}

const item1Details={
    _id:mongoose.Types.ObjectId('61e61d2285fcebce7226e17e'),
    size: 'xsmall',
    mintUID: 'jehucal1999',
    LinkedItemID: mongoose.Types.ObjectId('61e61d2285fcebee7226e17e'),
 }

const item2 ={
    _id:mongoose.Types.ObjectId('61e646abc8cbb83b8a4f732e'),
    name:"short",
    description:"n/a",
    collectionName:'Purple collection',
    brandName:'jehucal',
    image:'google.com/image35',
    allitems: [],
}

//Adminstrator
const adminDetails = {
    _id:mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    etherAddress: '0x7def0280c369a8565ace6b4fcbc5dd0dfc9f1553',
    username: "jehucal",
    itemsMinted: [],
    //ids
    itemsCreated:[item1._id,item2._id],
}

//Regular
const userDetails = {
    _id:mongoose.Types.ObjectId('5edd40c86762e0fb12000003'),
    etherAddress: '0x7def0280c369a8565ace6b4fcbc5dd0dfc9f1775',
    username: "userClive",
    itemsMinted: [],
    //ids
    itemsCreated:[],
}

export {userDetails,item1Details,adminDetails,item1,item2};