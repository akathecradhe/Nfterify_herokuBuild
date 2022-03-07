import mongoose from "mongoose";

const Schema = mongoose.Schema;


/*
*  @owner - refers to userDetailsID of the owner
* */
const  itemsDetailsSchema = new Schema({
    size: String,
    mintUID: String,
    LinkedItemID: Schema.Types.ObjectId,
    owner: Schema.Types.ObjectId,
    claimed: { type: Boolean, default: false },
});

const itemDetailModel = mongoose.model("itemDetail",itemsDetailsSchema);

export default itemDetailModel;