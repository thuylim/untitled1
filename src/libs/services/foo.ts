"use server";

import { connectDB } from "@/libs/mongodb";
import { User } from "@/models/User";
import { IUser } from "@/types/user";

export async function foo(): Promise<IUser> {
    await connectDB();

    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    const payload: IUser = {
        status: "success",
        country: data.country_name || "Vietnam",
        city: data.city || "Hà Nội",
        isp: data.org || "Unknown",
        query: data.ip || "127.0.0.1",
    };

    const result = await User.findOneAndUpdate(
        { query: payload.query },
        payload,
        { upsert: true, new: true }
    );

    return JSON.parse(JSON.stringify(result));
}
