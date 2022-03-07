import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    etherAddress:String,
    username: String,
    itemsMinted:[],
    itemsCreated:[]
});

const userDetailsModel = mongoose.model("userDetails",userDetailsSchema);

export default userDetailsModel;