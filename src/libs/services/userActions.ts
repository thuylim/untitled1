"use server";

import { connectDB } from "@/libs/mongodb";
import { User } from "@/models/User";
import { IUser } from "@/types/user";

/** LẤY DANH SÁCH */
export async function getUsers(): Promise<IUser[]> {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
}

/** THÊM */
export async function addUser(data: IUser): Promise<IUser> {
    await connectDB();
    const user = await User.create(data);
    return JSON.parse(JSON.stringify(user));
}

/** SỬA */
export async function updateUser(
    id: string,
    data: IUser
): Promise<IUser | null> {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user ? JSON.parse(JSON.stringify(user)) : null;
}

/** XOÁ */
export async function deleteUser(id: string): Promise<void> {
    await connectDB();
    await User.findByIdAndDelete(id);
}
