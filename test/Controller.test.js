import {clearDatabase,closeDatabase,dbconnect} from '../database/MockDbConnection'
import {userDetails, item1, item2,item1Details ,adminDetails} from './DummyDb'
import userDetailsModel from "../models/userDetailsModel";
import {findAllItemsCreatedByID, createItem,} from "../database/AdminDAO";
import {mintItem,findAllItemsMintedByID} from "../database/UserDAO";
import itemModel from "../models/itemModel";
import mongoose from "mongoose";
import itemDetailModel from "../models/itemDetail";
import itemDetail from "../models/itemDetail";


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbconnect();
});

/**
 * Seed the database.
 */
beforeEach(async () => {
    await createUserData();
});


/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await closeDatabase();
});



describe('Api end point testing', () => {

    /**
     * Should return the correct lists of items created by admin if provided id.
     */
    it('findAllItemsCreatedByID  ', async () => {

        const createdItems = await findAllItemsCreatedByID(adminDetails._id);
        expect(createdItems.length).toBe(2);
    });

    /**
     * Should return the An extra item in the the itemsCreated array
     */
    it(' Admin Create Item ', async () => {

        const idAdminDetails = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        //content from form
        const post = {
            name: "hat", description: "none", brandName: "jehucal",
            collectionName: "yellow collection", image: "googleimage99",
            userDetailsID: idAdminDetails,
            sizes: {xsmall: 2, small: 2, medium: 1, large: 2, xlarge: 3,}
        }

        await createItem(post);
        const userDetail = await userDetailsModel.findById(idAdminDetails);


        const newItemID3 = userDetail.itemsCreated[2];

        const itemDetail = await itemDetailModel.findById(newItemID3);

        console.log("itemDetail "+" "+ itemDetail )

        expect(userDetail.itemsCreated.length).toBe(3);

    })

    it(' User Mint Item ', async () => {

        const idUserDetails = mongoose.Types.ObjectId('5edd40c86762e0fb12000003');
        const idAdminDetails = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        //content from form
        const Adminpost = {
            name: "hat", description: "none", brandName: "jehucal",
            collectionName: "yellow collection", image: "googleimage99",
            userDetailsID: idAdminDetails,
            sizes: {xsmall: 2, small: 2, medium: 1, large: 2, xlarge: 3,}
        }

        await createItem(Adminpost);

        const userDetail1 = await userDetailsModel.findById(idUserDetails);
        console.log("user before mint "+ userDetail1);

        await mintItem(idUserDetails,'jehucal1999');


       const userDetail = await userDetailsModel.findById(idUserDetails);
       console.log("user after mint "+userDetail);


        //Expect user details to have 1 item in the minted
        expect(userDetail.itemsMinted.length).toBe(1);


    })

    it('findAllItems Minted by a user  ', async () => {

        const mintedItems = await findAllItemsMintedByID(userDetails._id);

        console.log(mintedItems.length);

        //expect none
        expect(mintedItems.length).toBe(0);
    });

});



const createUserData = async () => {
     await userDetailsModel.create(userDetails);
    await userDetailsModel.create(adminDetails);
    await itemModel.create(item1);
    await itemDetailModel.create(item1Details)
    await itemModel.create(item2);

}






