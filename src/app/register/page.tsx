"use client";

import { useState } from "react";
import { register } from "@/libs/services/authActions";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const submit = async () => {
        try {
            await register(email, password);

            setMsg("Đăng ký thành công! Đang chuyển sang trang đăng nhập...");

            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } catch (e: any) {
            setMsg(e.message);
        }
    };


    return (
        <div className="container">
            <div className="card" style={{ maxWidth: 400, margin: "auto" }}>
                <h2 className="card-title">Đăng ký</h2>

                <p>{msg}</p>

                <div className="form-item">
                    <label>Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="form-item">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-success" onClick={submit}>
                    Đăng ký
                </button>
            </div>
        </div>
    );
}
