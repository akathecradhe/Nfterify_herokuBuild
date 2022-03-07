import itemModel from "../models/itemModel";
import userDetailsModel from "../models/userDetailsModel";
import itemDetailModel from "../models/itemDetail";
import crypto from 'crypto';


export async function findAllItemsCreatedByID(id){
        console.log("this is  findAll items created by function")
        let data;
        let userInfo = await userDetailsModel.findById(id);
      //  console.log("user id "+userInfo);

        let itemsCreated = userInfo.itemsCreated;
        //object with IDs of all the items created by Admin
        //finds all the items in Created
        try{
                data = await itemModel.find(

                    {'_id': { $in: itemsCreated}}
                );
        }catch (e){
                console.log("no item created")
                data = "no items created"
        }


        return data;
}

export async function getItemDetailsById(id) {
        //let data;
      //  let linkedID = id
        let itemDetail;
        let itemArray;
        let allitems;
        console.log("this is the GetItemdetailsby ID created by function")
        try {
                console.log("this is id"+ id)
                 allitems= await itemDetailModel.find();
                 itemArray = Array.from(allitems);
                 itemDetail= itemArray.filter(i => i.LinkedItemID.valueOf() === id)
            //    console.log('this the itemDetails found by the ID '+id+' ' + itemDetail)
                return itemDetail;
        }catch (e) {
                console.log(e)
        }


      //  console.log('this the itemDetail detail getItemDetailsById '+ itemDetail)
       // console.log('this the  data '+ data)



}




export async function createItem(item){
        let itemDetail
        let mintCode
        let randomString
       // console.log('this the item in' + item)
        ////ID of the current user
        //deleting the userdetailsID from body to allow it to map 1-1 withe item model
        const userdetailsID =item.userDetailsID;
        delete item.userDetailsID;

        //new item is created and added to DB
        const newItem = new itemModel(item);

    //    console.log('this theitem created'+ newItem)

        const userDetail = await userDetailsModel.findById(userdetailsID);

      //  console.log('this the user detail '+ userDetail)

        //setting the itemdetail scheme
        /* @sizes= strings of all values e.g xsmall, small
           @quantities= Int value of the magnitude of each size
           @branndName= user name of the userDetail*/
        const brandName = userDetail.username;
        const sizes= Object.keys(item.sizes);

        const quantities = Object.values(item.sizes);

        for (let i = 0; i < sizes.length ; i++) {
                for(let x = 0; x < parseInt(quantities[i]);x++){
                        //await setItemDetails(sizes[i],brandName,newItem._id);

                        randomString =  crypto.randomBytes(4).toString('hex');
                        mintCode = brandName + randomString;

                        itemDetail =  new itemDetailModel({size:sizes[i],mintUID:mintCode,LinkedItemID:newItem._id});
                        await itemDetail.save()
                     //   console.log('item detail '+ itemDetail)
                        newItem.allItems.push(itemDetail._id);
                        await newItem.save()
                     //   console.log('this the new item '+ newItem)
                }
        }
        //add the id of the item created
        // by updating the items minted array;
        userDetail.itemsCreated.push(newItem._id);
        await userDetail.save();

      //  console.log('this the user detail '+ userDetail)

}




