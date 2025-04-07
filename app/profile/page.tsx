"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Pencil, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppHeader } from "@/components/app-header"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [profile, setProfile] = useState({
    fullName: "Sohail Khan",
    email: "soha985012@gmail.com",
    role: "Learner/Host",
    bio: "Passionate about learning and teaching programming concepts. I enjoy hosting sessions on JavaScript and React.",
  })

  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    bio: profile.bio,
  })

  const fetchUser = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    try {
      const res = await fetch("https://skillshare-hub-backend.onrender.com/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: Bearer ${token},
        },
      })

      const data = await res.json()
      console.log("User res is", data)

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login")
          return
        }
        setError(data.message || "Failed to fetch user.")
        return
      }

      setProfile((prev) => ({
        ...prev,
        fullName: data.name,
        email: data.email,
      }))
    } catch (err) {
      console.error("User fetch failed:", err)
      setError("Server error. Try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setFormData({
      fullName: profile.fullName,
      bio: profile.bio,
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProfile((prev) => ({
        ...prev,
        fullName: formData.fullName,
        bio: formData.bio,
      }))

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold tracking-tight mb-6">My Profile</h1>

          <Card>
            <CardHeader className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt={profile.fullName} />
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
                <CardDescription>{profile.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profile.email} disabled />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed. Contact support for assistance.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" name="bio" value={formData.bio} onChange={handleChange} />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Email</h3>
                    <p>{profile.email}</p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Bio</h3>
                    <p>{profile.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="gap-2" onClick={handleEdit}>
                  <Pencil className="h-4 w-4" /> Edit Profile
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your password and account security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
