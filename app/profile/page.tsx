"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Pencil, User, X } from "lucide-react"
import Image from "next/image"

import { AppHeader } from "@/components/app-header"
import { useToast } from "@/components/ui/use-toast"

interface UserData {
  id: string
  name: string
  email: string
  bio: string
  avatarUrl?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    bio: "",
  })

  // Check authentication and fetch user data
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated")

      if (!isAuthenticated || isAuthenticated !== "true") {
        // Redirect to login if not authenticated
        router.push("/login")
        return false
      }
      return true
    }

    const fetchUserData = () => {
      try {
        // Get current user data
        const currentUserData = localStorage.getItem("currentUser")

        if (currentUserData) {
          const parsedData = JSON.parse(currentUserData)
          setUserData(parsedData)
          setFormData(parsedData)
        } else {
          // If somehow authenticated but no current user data, redirect to login
          localStorage.removeItem("isAuthenticated")
          router.push("/login")
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate a slight delay to show loading state
    const timer = setTimeout(() => {
      if (checkAuth()) {
        fetchUserData()
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Update current user data
      localStorage.setItem("currentUser", JSON.stringify(formData))

      // Also update the user in the users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((user: any) => {
        if (user.id === formData.id) {
          return {
            ...user,
            name: formData.name,
            email: formData.email,
            bio: formData.bio,
            avatarUrl: formData.avatarUrl,
          }
        }
        return user
      })

      localStorage.setItem("users", JSON.stringify(updatedUsers))

      // Update state
      setUserData(formData)
      setIsEditing(false)

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <div className="flex-1 container py-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex-1 container py-8 flex items-center justify-center">
        <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={containerVariants}>
          {isEditing ? (
            <motion.div className="bg-white rounded-lg shadow-md p-8" variants={itemVariants}>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar URL (optional)
                    </label>
                    <input
                      type="text"
                      id="avatarUrl"
                      name="avatarUrl"
                      value={formData.avatarUrl || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div className="bg-white rounded-lg shadow-md overflow-hidden" variants={itemVariants}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex items-center justify-center">
                <motion.div
                  className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {userData?.avatarUrl ? (
                    <Image
                      src={userData.avatarUrl || "/placeholder.svg"}
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h1 className="text-2xl font-bold text-gray-800" variants={itemVariants}>
                      {userData?.name}
                    </motion.h1>
                    <motion.p className="text-gray-500 mb-4" variants={itemVariants}>
                      {userData?.email}
                    </motion.p>
                  </div>
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Pencil size={18} />
                  </motion.button>
                </div>

                <motion.div className="mt-6" variants={itemVariants}>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Bio</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{userData?.bio}</p>
                </motion.div>

                <motion.div className="mt-8 pt-6 border-t border-gray-200" variants={itemVariants}>
                  <p className="text-sm text-gray-500">Profile information is stored in your browser's localStorage.</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

