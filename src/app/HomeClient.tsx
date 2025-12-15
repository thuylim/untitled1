"use client"

import { useEffect, useState } from "react"
import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
} from "@/libs/services/userActions"
import { logout } from "@/libs/services/authActions"
import { IUser } from "@/types/user"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function HomePage() {
    const [users, setUsers] = useState<IUser[]>([])
    const [form, setForm] = useState<IUser>({
        status: "",
        country: "",
        city: "",
        isp: "",
        query: "",
    })
    const [editId, setEditId] = useState<string | null>(null)

    const load = async () => {
        const data = await getUsers()
        setUsers(data)
    }

    useEffect(() => {
        load()
    }, [])

    const submit = async () => {
        if (editId) {
            await updateUser(editId, form)
        } else {
            await addUser(form)
        }
        setForm({ status: "", country: "", city: "", isp: "", query: "" })
        setEditId(null)
        load()
    }

    const onEdit = (u: IUser) => {
        setForm(u)
        setEditId(u._id!)
    }

    const onDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xoá không?")) return
        await deleteUser(id)
        load()
    }

    return (
        <div className="min-h-screen bg-slate-100">
            {/* HEADER */}
            <header className="border-b bg-white">
                <div className="container flex h-16 items-center justify-between">
                    <h1 className="text-lg font-semibold">Quản lý IP</h1>
                    <Button
                        variant="destructive"
                        onClick={async () => {
                            await logout()
                            window.location.href = "/login"
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </header>

            <main className="container py-8 space-y-6">
                {/* FORM */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {editId ? "Chỉnh sửa IP" : "Thêm IP"}
                        </CardTitle>
                        <CardDescription>
                            Nhập thông tin IP
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid grid-cols-2 gap-4">
                        {(["status", "country", "city", "isp", "query"] as const).map(
                            (key) => (
                                <div key={key} className="space-y-2">
                                    <Label>{key.toUpperCase()}</Label>
                                    <Input
                                        value={form[key] || ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setForm({ ...form, [key]: e.target.value })
                                        }
                                    />
                                </div>
                            )
                        )}

                        <div className="col-span-2">
                            <Button onClick={submit}>
                                {editId ? "Lưu" : "Thêm"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* TABLE */}
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách IP</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Country</TableHead>
                                    <TableHead>City</TableHead>
                                    <TableHead>ISP</TableHead>
                                    <TableHead>Query</TableHead>
                                    <TableHead className="text-right">
                                        Hành động
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.map((u) => (
                                    <TableRow key={u._id}>
                                        <TableCell>{u.status}</TableCell>
                                        <TableCell>{u.country}</TableCell>
                                        <TableCell>{u.city}</TableCell>
                                        <TableCell>{u.isp}</TableCell>
                                        <TableCell>{u.query}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onEdit(u)}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => onDelete(u._id!)}
                                            >
                                                Xoá
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {users.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center text-muted-foreground"
                                        >
                                            Chưa có dữ liệu
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
