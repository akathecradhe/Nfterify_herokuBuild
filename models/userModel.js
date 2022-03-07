import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username:String,
    password: String,
    role: { type: String, default: 'user' },
    userDetailId: Schema.Types.ObjectId,
    isVerified: Boolean
});

const userModel = mongoose.model("userModel",userSchema);

export default userModel;
