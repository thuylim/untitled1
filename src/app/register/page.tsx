"use client"

import { useState } from "react"
import { register } from "@/libs/services/authActions"

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

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const submit = async () => {
        try {
            await register(email, password)
            setMsg("Đăng ký thành công! Đang chuyển sang đăng nhập...")
            setTimeout(() => {
                window.location.href = "/login"
            }, 1500)
        } catch (e: any) {
            setMsg(e.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <Card className="w-[380px] shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Đăng ký</CardTitle>
                    <CardDescription>
                        Tạo tài khoản mới
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {msg && <p className="text-sm text-center">{msg}</p>}

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Mật khẩu</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <Button className="w-full" onClick={submit}>
                        Đăng ký
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
