"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CalendarIcon, Clock, Info } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { AppHeader } from "@/components/app-header"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateSessionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    period: "am",
  })

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    mode: "Online",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (formError) setFormError("")
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formError) setFormError("")
  }

  const handleTimeChange = (field: keyof typeof time, value: string) => {
    setTime((prev) => ({ ...prev, [field]: value }))
    if (formError) setFormError("")
  }

  const handleModeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mode: value }))
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setFormError("Please enter a session title")
      return false
    }

    if (!formData.category) {
      setFormError("Please select a category")
      return false
    }

    if (!formData.description.trim()) {
      setFormError("Please enter a session description")
      return false
    }

    if (!date) {
      setFormError("Please select a date")
      return false
    }

    if (!time.hour || !time.minute) {
      setFormError("Please select a time")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Session created!",
        description: "Your learning session has been successfully created.",
      })

      // Redirect to my sessions page
      router.push("/my-sessions")
    } catch (error) {
      setFormError("Failed to create session. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    "Programming",
    "Mathematics",
    "Languages",
    "Data Science",
    "Literature",
    "Physics",
    "Art",
    "Music",
    "Business",
    "Other",
  ]

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
          <h1 className="text-3xl font-bold tracking-tight mb-6">Create a Learning Session</h1>

          {formError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title for your session"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what participants will learn and any prerequisites"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            (!time.hour || !time.minute) && "text-muted-foreground",
                          )}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {time.hour && time.minute
                            ? `${time.hour}:${time.minute} ${time.period.toUpperCase()}`
                            : "Select a time"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4">
                        <div className="grid gap-2">
                          <Select value={time.hour} onValueChange={(value) => handleTimeChange("hour", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                <SelectItem key={hour} value={hour.toString().padStart(2, "0")}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select value={time.minute} onValueChange={(value) => handleTimeChange("minute", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Minute" />
                            </SelectTrigger>
                            <SelectContent>
                              {["00", "15", "30", "45"].map((minute) => (
                                <SelectItem key={minute} value={minute}>
                                  {minute}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select value={time.period} onValueChange={(value) => handleTimeChange("period", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="AM/PM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="am">AM</SelectItem>
                              <SelectItem value="pm">PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Session Mode</Label>
                  <RadioGroup defaultValue="Online" value={formData.mode} onValueChange={handleModeChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Online" id="online" />
                      <Label htmlFor="online">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Offline" id="offline" />
                      <Label htmlFor="offline">Offline (In-person)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.mode === "Offline" && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="Enter the meeting location" required />
                  </div>
                )}

                <div className="flex items-start space-x-2 text-sm">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-muted-foreground">
                    By creating a session, you agree to our community guidelines and terms of service.
                  </p>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Session"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

