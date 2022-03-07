import itemModel from "../models/itemModel";
import userDetailsModel from "../models/userDetailsModel";
import itemDetailModel from "../models/itemDetail";


export async function mintItem(user,uid){

    //current user that we need to insert the item into And make new owner
    //const userInfo = await userDetailsModel.findById(user);

    //Find the item with the uniqueID
    const itemDetail = await  itemDetailModel.findOne({mintUID:uid})
    console.log("item detail before :  " + itemDetail);
    //item to be added to user'minted
    const item = itemDetail.LinkedItemID;

    //current user that we need to insert the item into And make new owner
    await userDetailsModel.findOneAndUpdate({"_id":user},
        { $push: { itemsMinted: [item] } });

    //Change the status of the itemDetail object
    // await itemDetail.updateOne({owner:user},{claimed:true})
    itemDetail.owner= user;
    itemDetail.claimed=true;
    await itemDetail.save();
    console.log("item detail After :  " + itemDetail);
}

export async function findAllItemsMintedByID(id){
    let data;
    let userInfo = await userDetailsModel.findById(id);
    let itemsMinted= userInfo.itemsMinted;
    //object with IDs of all the items created by Admin
    //finds all the items in Created
    try{
        data = await itemModel.find(
            {'_id': { $in: itemsMinted}}
        );


    }catch (e) {
        console.log("no items Minted")
        data = "no items Minted"
    }
    console.log("heres the " +data)
    return data;
}