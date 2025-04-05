"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppHeader } from "@/components/app-header"
import { SessionCard } from "@/components/session-card"
import { SessionCardSkeleton } from "@/components/session-card-skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for hosted sessions
const hostedSessions = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    category: "Programming",
    description:
      "Learn the basics of React Hooks and how to use them in your projects. We'll cover useState, useEffect, and custom hooks.",
    date: "2025-04-10T14:00:00",
    host: "You",
    mode: "Online",
  },
  {
    id: "2",
    title: "Advanced JavaScript Patterns",
    category: "Programming",
    description:
      "Deep dive into advanced JavaScript patterns including closures, prototypes, and functional programming concepts.",
    date: "2025-04-20T15:00:00",
    host: "You",
    mode: "Online",
  },
]

// Mock data for joined sessions
const joinedSessions = [
  {
    id: "3",
    title: "Spanish Conversation Practice",
    category: "Languages",
    description: "Improve your Spanish speaking skills through conversation practice. All levels welcome!",
    date: "2025-04-15T18:00:00",
    host: "Maria Rodriguez",
    mode: "Offline",
  },
  {
    id: "4",
    title: "Machine Learning Study Group",
    category: "Data Science",
    description:
      "Weekly study group focusing on machine learning algorithms and implementations. This week: neural networks.",
    date: "2025-04-16T15:00:00",
    host: "Alex Chen",
    mode: "Online",
  },
]

export default function MySessionsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [hosted, setHosted] = useState<any[]>([])
  const [joined, setJoined] = useState<any[]>([])
  const [sessionToCancel, setSessionToCancel] = useState<any>(null)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  // Simulate API call to fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setHosted(hostedSessions)
        setJoined(joinedSessions)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load sessions. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [toast])

  const handleCancelSession = (session: any) => {
    setSessionToCancel(session)
    setIsAlertDialogOpen(true)
  }

  const confirmCancelSession = () => {
    if (sessionToCancel) {
      // If it's a hosted session
      if (sessionToCancel.host === "You") {
        setHosted((prev) => prev.filter((s) => s.id !== sessionToCancel.id))
        toast({
          title: "Session cancelled",
          description: `Your session "${sessionToCancel.title}" has been cancelled.`,
        })
      } else {
        // If it's a joined session
        setJoined((prev) => prev.filter((s) => s.id !== sessionToCancel.id))
        toast({
          title: "Left session",
          description: `You have left "${sessionToCancel.title}".`,
        })
      }
    }
    setIsAlertDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Sessions</h1>
              <p className="text-muted-foreground mt-1">Manage your hosted sessions and view sessions you've joined</p>
            </div>
            <Button asChild className="gap-2">
              <a href="/create-session">
                <Plus className="h-4 w-4" /> Create Session
              </a>
            </Button>
          </div>

          <Tabs defaultValue="hosting" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="hosting" className="gap-2">
                <Users className="h-4 w-4" /> Hosting
              </TabsTrigger>
              <TabsTrigger value="joined" className="gap-2">
                <Calendar className="h-4 w-4" /> Joined
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hosting" className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <SessionCardSkeleton key={index} />
                  ))}
                </div>
              ) : hosted.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {hosted.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      isHost
                      onCancel={() => handleCancelSession(session)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">You're not hosting any sessions yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first session to share your knowledge with peers
                  </p>
                  <Button asChild>
                    <a href="/create-session">Create a Session</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="joined" className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <SessionCardSkeleton key={index} />
                  ))}
                </div>
              ) : joined.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {joined.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      onCancel={() => handleCancelSession(session)}
                      showLeaveButton
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">You haven't joined any sessions yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse available sessions and join ones that interest you
                  </p>
                  <Button asChild>
                    <a href="/dashboard">Browse Sessions</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{sessionToCancel?.host === "You" ? "Cancel Session" : "Leave Session"}</AlertDialogTitle>
            <AlertDialogDescription>
              {sessionToCancel?.host === "You"
                ? "Are you sure you want to cancel this session? This action cannot be undone."
                : "Are you sure you want to leave this session? You can rejoin later if you change your mind."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelSession}
              className={sessionToCancel?.host === "You" ? "bg-destructive" : ""}
            >
              {sessionToCancel?.host === "You" ? "Cancel Session" : "Leave Session"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

