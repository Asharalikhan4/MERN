import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
    email: string;
    password: string;
    name: string;
    isAdmin?: boolean;
    token?: string;
    tokenExpiration?: Date;
    cart?: mongoose.Schema.Types.ObjectId[];
    orders?: mongoose.Schema.Types.ObjectId[];
    wishlist?: mongoose.Schema.Types.ObjectId[];
}

const UserSchema: Schema = new mongoose.Schema<UserDocument>({
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    token: {
        type: String,
        required: false
    },
    tokenExpiration: {
        type: Date,
        required: false
    }
}, {
    timestamps: true,
});

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;