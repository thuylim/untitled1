"use client";

import { useState } from "react";
import { login } from "@/libs/services/authActions";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const submit = async () => {
        try {
            await login(email, password);
            location.href = "/";
        } catch (e: any) {
            setErr(e.message);
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: 400, margin: "auto" }}>
                <h2 className="card-title">Đăng nhập</h2>

                {err && <p style={{ color: "red" }}>{err}</p>}

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

                <button className="btn btn-primary" onClick={submit}>
                    Đăng nhập
                </button>
                <p style={{ marginTop: 12 }}>
                    Chưa có tài khoản?{" "}
                    <a href="/register" style={{ color: "#2563eb" }}>
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
}
