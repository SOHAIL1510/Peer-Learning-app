"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (loginError) setLoginError("")
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Find user with matching email and password
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)

      if (!user) {
        // For demo purposes, create a demo user if no users exist
        if (users.length === 0 && formData.email === "demo@example.com" && formData.password === "Demo123!") {
          const demoUser = {
            id: "demo-user",
            name: "Demo User",
            email: "demo@example.com",
            password: "Demo123!",
            bio: "This is a demo user account.",
            avatarUrl: "",
          }

          // Add demo user to users array
          users.push(demoUser)
          localStorage.setItem("users", JSON.stringify(users))

          // Set current user
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              id: demoUser.id,
              name: demoUser.name,
              email: demoUser.email,
              bio: demoUser.bio,
              avatarUrl: demoUser.avatarUrl,
            }),
          )

          // Set authentication state
          localStorage.setItem("isAuthenticated", "true")

          toast({
            title: "Demo login successful!",
            description: "Welcome to SkillShare Hub, Demo User.",
          })

          // Redirect to dashboard
          router.push("/dashboard")
          return
        }

        setLoginError("Invalid email or password. Please try again.")
        setIsLoading(false)
        return
      }

      // Set current user (excluding password for security)
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          avatarUrl: user.avatarUrl,
        }),
      )

      // Set authentication state
      localStorage.setItem("isAuthenticated", "true")

      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.name}!`,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SkillShare Hub</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>

        {loginError && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="rememberMe" className="text-sm font-normal">
              Remember me for 30 days
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>For demo purposes, you can use:</p>
          <p>Email: demo@example.com</p>
          <p>Password: Demo123!</p>
        </div>
      </div>
    </motion.div>
  )
}

