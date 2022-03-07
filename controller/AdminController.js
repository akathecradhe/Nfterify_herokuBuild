import {createItem, findAllItemsCreatedByID,getItemDetailsById} from '../database/AdminDAO'
import userDetailsModel from "../models/userDetailsModel";
import itemDetailModel from "../models/itemDetail";



// fetches All the Items from the database.
const findAllcreated = async (req, res) => {
    //url ID
    try{

        const userID = req.params.userDetailId;

        const data = await findAllItemsCreatedByID(userID);

        res.json(data);
    }catch (e)
    {
        console.log(e)
    }

};

// Create new item to mint
const create =async (req, res) => {
    try {
        // get from form
        // name,description,brandName,collectionName,
        // image,userDetailsID,sizes
        const inputItem = req.body;
       // console.log(inputItem)

        await createItem(inputItem);
        //sending status code to show success
        res.sendStatus(201);
    }catch (e) {
        console.log(e)
    }
};

const getItemDetails = async (req, res) => {
    //url ID
        const itemID = req.params.ID;

     try{
         console.log("itemID line 46 itemdeetails controller" + itemID)

         const data = await getItemDetailsById(itemID)

        // console.log('this the itemDetails found by the ID '+itemID+' ' + data)

         res.json(data);

     }catch (e) {
         console.log(e)
     }
};

const getUserDetails = async (req, res) => {
    //url ID
    try{
        const userID = req.params.userDetailId;

        const userDetail =await userDetailsModel.findById(userID)

        //console.log('this the user detail '+ userDetail)

        res.json(userDetail);
    }catch (e)
    {
        cocd
    }


};





export {create, findAllcreated,getUserDetails,getItemDetails}
