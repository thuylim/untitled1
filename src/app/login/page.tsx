"use client"

import { useState } from "react"
import { login } from "@/libs/services/authActions"

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

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")

    const submit = async () => {
        try {
            await login(email, password)
            window.location.href = "/"
        } catch (e: any) {
            setErr(e.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <Card className="w-[380px] shadow-xl">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                    <CardDescription>
                        Chào mừng bạn quay trở lại 👋
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {err && (
                        <p className="text-sm text-center text-red-500">{err}</p>
                    )}

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
                        Đăng nhập
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Chưa có tài khoản?{" "}
                        <a
                            href="/register"
                            className="text-primary underline"
                        >
                            Đăng ký
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
