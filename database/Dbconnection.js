import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.mongoUri;
console.log(uri);

const dbConnect = async () => {
    try {
        //  mongoose.set(`useUnifiedTopology`, true);
        //  mongoose.set('useNewUrlParser', true);
        mongoose.connect(uri)
    } catch (e) {
        console.log(e)
    }

    const connection = mongoose.connection;
    if(connection.readyState>= 1){
        console.log("connected to the database");
        return;
    }
    connection.on("error",() => console.log("failed connection"));
}

export default dbConnect;