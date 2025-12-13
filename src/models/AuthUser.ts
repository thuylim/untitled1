import mongoose, { Schema, Model } from "mongoose";

export interface IAuthUser {
    _id?: string;
    email: string;
    password: string;
    createdAt?: string;
}

const AuthUserSchema = new Schema<IAuthUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export const AuthUser: Model<IAuthUser> =
    mongoose.models.AuthUser ||
    mongoose.model<IAuthUser>("AuthUser", AuthUserSchema);
