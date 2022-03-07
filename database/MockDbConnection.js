import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

// code from https://javascript.plainenglish.io/unit-testing-node-js-mongoose-using-jest-106a39b8393d

let mongod = undefined;


/**
 * Connect to the in-memory database.
 */
const dbconnect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
    };

    await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
    if (mongod) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    }
};

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
    if (mongod) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};

export {clearDatabase,closeDatabase,dbconnect};


