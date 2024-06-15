import mongoose from "mongoose";

const mongooseURI = process.env.MONGO_DB_URI;

if(!mongooseURI) throw new Error("Please Define Mongoose URI!")

const connectDB = async () => {
    if(mongoose.connection?.readyState >= 1){
        console.log("Already Connecting to MongoDB!");
        return;
    }
    try {
        await mongoose.connect(mongooseURI)
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Couldn't connect to MongoDB:", error);
    }
}

export default connectDB;