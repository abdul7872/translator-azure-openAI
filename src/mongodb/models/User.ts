import mongoose, { Document, Schema } from "mongoose";
import connectDB from "../db";

export interface UserType extends Document {
    userId: string;
    translations: {
        timestamp: Date;
        fromText: string;
        from: string;
        toText: string;
        to: string;
    }[];
}

const translationsSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    fromText: String,
    from: String,
    toText: String,
    to: String,
})

const userScheme = new Schema<UserType>({
    userId: String,
    translations: [translationsSchema]
})

// check if already exists or not...
const User = mongoose.models.User || mongoose.model<UserType>("User", userScheme);

export async function addOrUpdateUser(userId: string, translation: Record<string, string>): Promise<UserType> {
    await connectDB();

    // Upsert option ensures that the document is created if it doesn't exist
    // The new: true option in the options object ensures that the method returns the updated document after the operation is complete. If you don't set new: true, the method will return the original document before the update.
    // In summary, the code you have will either update an existing user's document with new translations or create a new user document with the given userId, and translations, and save it into the database.
    const options = { upsert: true, new: true, setDefaultsOnInsert: true } as const;
    try {
        const user: UserType | null =  await User.findOneAndUpdate(
            { userId },
            { 
                $set:{ userId },
                $push: { translation }
            },
            options
        );
        if(!user) throw new Error("User not found!");
        return user;
        
    } catch (error) {
        console.error("Error on update user", error);
        throw error;
    }
} 
