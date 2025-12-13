import { cookies } from "next/headers";
import HomePage from "./HomeClient";

export default async function Page() {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");

    if (!auth) {
        return <meta httpEquiv="refresh" content="0;url=/login" />;
    }

    return <HomePage />;
}
