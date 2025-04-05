import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SessionCard } from "@/components/session-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { SessionFilter } from "@/components/session-filter"

// Mock data for sessions
const sessions = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    category: "Programming",
    description:
      "Learn the basics of React Hooks and how to use them in your projects. We'll cover useState, useEffect, and custom hooks.",
    date: "2025-04-10T14:00:00",
    host: "Jane Smith",
    mode: "Video",
  },
  {
    id: "2",
    title: "Advanced Calculus Problem Solving",
    category: "Mathematics",
    description:
      "Practice solving complex calculus problems together. Bring your questions and we'll work through them as a group.",
    date: "2025-04-12T16:00:00",
    host: "John Doe",
    mode: "Video",
  },
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
  {
    id: "5",
    title: "Literature Discussion: Modern Classics",
    category: "Literature",
    description:
      "Join us to discuss modern literary classics. This session will focus on 'The Road' by Cormac McCarthy.",
    date: "2025-04-18T19:00:00",
    host: "Emily Johnson",
    mode: "Text",
  },
  {
    id: "6",
    title: "Physics Problem Solving Workshop",
    category: "Physics",
    description: "Collaborative workshop to solve challenging physics problems. Focus on mechanics and thermodynamics.",
    date: "2025-04-20T13:00:00",
    host: "David Wilson",
    mode: "Video",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Sessions</h1>
            <p className="text-muted-foreground mt-1">
              Browse and join peer learning sessions that match your interests
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/create-session">
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Create Session
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          <SessionFilter />
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

