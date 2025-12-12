import mongoose from "mongoose";
import type { MongooseCache } from "@/types/global";

// ÉP KIỂU RÕ RÀNG Ở ĐÂY
const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Thiếu MONGODB_URI trong file .env.local");
}

function getCache(): MongooseCache {
    if (!global.mongoose) {
        global.mongoose = { conn: null, promise: null };
    }
    return global.mongoose;
}

export async function connectDB(): Promise<typeof mongoose> {
    const cache = getCache();

    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        cache.promise = mongoose.connect(MONGODB_URI).then((m) => m);
    }

    cache.conn = await cache.promise;
    return cache.conn;
}
