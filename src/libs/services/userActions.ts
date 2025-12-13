"use server";

import { connectDB } from "@/libs/mongodb";
import { User } from "@/models/User";
import { IUser } from "@/types/user";

export async function getUsers(): Promise<IUser[]> {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
}

export async function addUser(data: IUser): Promise<IUser> {
    await connectDB();
    const user = await User.create(data);
    return JSON.parse(JSON.stringify(user));
}

export async function updateUser(
    id: string,
    data: IUser
): Promise<IUser | null> {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function deleteUser(id: string): Promise<void> {
    await connectDB();
    await User.findByIdAndDelete(id);
}
