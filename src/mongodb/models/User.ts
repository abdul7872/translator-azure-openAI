import mongoose, { Document, Schema } from "mongoose";

interface UserType extends Document {
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
    timestamp: { type: Date, default: Date.now},
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
const User = mongoose.models.User || mongoose.model<UserType>("User", userScheme)