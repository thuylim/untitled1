"use client";

import { useEffect, useState } from "react";
import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
} from "@/libs/services/userActions";
import { logout } from "@/libs/services/authActions";
import { IUser } from "@/types/user";


export default function HomePage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [form, setForm] = useState<IUser>({
        status: "",
        country: "",
        city: "",
        isp: "",
        query: "",
    });
    const [editId, setEditId] = useState<string | null>(null);

    const load = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            await load();
        };

        fetchData();
    }, []);

    const submit = async () => {
        if (editId) {
            await updateUser(editId, form);
        } else {
            await addUser(form);
        }
        setForm({ status: "", country: "", city: "", isp: "", query: "" });
        setEditId(null);
        load();
    };

    const onEdit = (u: IUser) => {
        setForm(u);
        setEditId(u._id!);
    };

    const onDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xoá không?")) return;
        await deleteUser(id);
        load();
    };

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 className="title">Quản lý IP</h1>

                <button
                    className="btn btn-danger"
                    onClick={async () => {
                        await logout();
                        window.location.href = "/login";
                    }}
                >
                    Đăng xuất
                </button>
            </div>


            {/* FORM */}
            <div className="card">
                <div className="card-title">
                    {editId ? "Chỉnh sửa User" : "Thêm thông tin IP"}
                </div>

                <div className="form-grid">
                    {["status", "country", "city", "isp", "query"].map((key) => (
                        <div className="form-item" key={key}>
                            <label>{key.toUpperCase()}</label>
                            <input
                                value={form[key as keyof IUser] || ""}
                                onChange={(e) =>
                                    setForm({ ...form, [key]: e.target.value })
                                }
                                placeholder={`Nhập ${key}`}
                            />
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 16 }}>
                    <button
                        className={`btn ${
                            editId ? "btn-success" : "btn-primary"
                        }`}
                        onClick={submit}
                    >
                        {editId ? "Lưu" : "Thêm"}
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="card table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>Status</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>ISP</th>
                        <th>Query</th>
                        <th className="actions">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.status}</td>
                            <td>{u.country}</td>
                            <td>{u.city}</td>
                            <td>{u.isp}</td>
                            <td>{u.query}</td>
                            <td className="actions">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => onEdit(u)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(u._id!)}
                                >
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}

                    {users.length === 0 && (
                        <tr>
                            <td colSpan={6} className="empty">
                                Chưa có user nào
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
