import Link from "next/link"
import { Plus, Calendar, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { SessionCard } from "@/components/session-card"

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
    mode: "Video",
  },
  {
    id: "2",
    title: "Advanced JavaScript Patterns",
    category: "Programming",
    description:
      "Deep dive into advanced JavaScript patterns including closures, prototypes, and functional programming concepts.",
    date: "2025-04-20T15:00:00",
    host: "You",
    mode: "Video",
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
    mode: "Audio",
  },
  {
    id: "4",
    title: "Machine Learning Study Group",
    category: "Data Science",
    description:
      "Weekly study group focusing on machine learning algorithms and implementations. This week: neural networks.",
    date: "2025-04-16T15:00:00",
    host: "Alex Chen",
    mode: "Video",
  },
]

export default function MySessionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Sessions</h1>
            <p className="text-muted-foreground mt-1">Manage your hosted sessions and view sessions you've joined</p>
          </div>
          <Link href="/create-session">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Session
            </Button>
          </Link>
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
            {hostedSessions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {hostedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} isHost />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">You're not hosting any sessions yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first session to share your knowledge with peers
                </p>
                <Link href="/create-session">
                  <Button>Create a Session</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          <TabsContent value="joined" className="space-y-6">
            {joinedSessions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {joinedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">You haven't joined any sessions yet</h3>
                <p className="text-muted-foreground mb-6">Browse available sessions and join ones that interest you</p>
                <Link href="/dashboard">
                  <Button>Browse Sessions</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

