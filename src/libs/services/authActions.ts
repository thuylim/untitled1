"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { connectDB } from "@/libs/mongodb";
import { AuthUser } from "@/models/AuthUser";

export async function register(
    email: string,
    password: string
): Promise<boolean> {
    await connectDB();

    if (!email || !password) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    const exists = await AuthUser.findOne({ email });
    if (exists) {
        throw new Error("Email đã tồn tại");
    }

    const hash = await bcrypt.hash(password, 10);

    await AuthUser.create({
        email,
        password: hash,
    });

    return true;
}

export async function login(
    email: string,
    password: string
): Promise<boolean> {
    await connectDB();

    const user = await AuthUser.findOne({ email });
    if (!user) throw new Error("Sai email hoặc mật khẩu");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Sai email hoặc mật khẩu");

    const cookieStore = await cookies();
    cookieStore.set("auth", user._id.toString(), {
        httpOnly: true,
        path: "/",
    });

    return true;
}

export async function logout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("auth");
}
