"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { AppHeader } from "@/components/app-header"
import { SessionCard } from "@/components/session-card"
import { SessionCardSkeleton } from "@/components/session-card-skeleton"
import { JoinSessionModal } from "@/components/join-session-modal"
import { useToast } from "@/components/ui/use-toast"

// Mock data for sessions
const mockSessions = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    category: "Programming",
    description:
      "Learn the basics of React Hooks and how to use them in your projects. We'll cover useState, useEffect, and custom hooks.",
    date: "2025-04-10T14:00:00",
    host: "Jane Smith",
    mode: "Online",
  },
  {
    id: "2",
    title: "Advanced Calculus Problem Solving",
    category: "Mathematics",
    description:
      "Practice solving complex calculus problems together. Bring your questions and we'll work through them as a group.",
    date: "2025-04-12T16:00:00",
    host: "John Doe",
    mode: "Online",
  },
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
  {
    id: "5",
    title: "Literature Discussion: Modern Classics",
    category: "Literature",
    description:
      "Join us to discuss modern literary classics. This session will focus on 'The Road' by Cormac McCarthy.",
    date: "2025-04-18T19:00:00",
    host: "Emily Johnson",
    mode: "Online",
  },
  {
    id: "6",
    title: "Physics Problem Solving Workshop",
    category: "Physics",
    description: "Collaborative workshop to solve challenging physics problems. Focus on mechanics and thermodynamics.",
    date: "2025-04-20T13:00:00",
    host: "David Wilson",
    mode: "Offline",
  },
]

export default function DashboardPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState<any[]>([])
  const [filteredSessions, setFilteredSessions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  // Simulate API call to fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSessions(mockSessions)
        setFilteredSessions(mockSessions)
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

  // Filter sessions based on search, category, and date
  useEffect(() => {
    let result = [...sessions]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (session) =>
          session.title.toLowerCase().includes(query) ||
          session.description.toLowerCase().includes(query) ||
          session.category.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((session) => session.category === categoryFilter)
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toDateString()
      result = result.filter((session) => {
        const sessionDate = new Date(session.date).toDateString()
        return sessionDate === filterDate
      })
    }

    setFilteredSessions(result)
  }, [searchQuery, categoryFilter, dateFilter, sessions])

  const handleJoinSession = (session: any) => {
    setSelectedSession(session)
    setIsJoinModalOpen(true)
  }

  const confirmJoinSession = () => {
    toast({
      title: "Session joined!",
      description: `You have successfully joined "${selectedSession.title}"`,
    })
    setIsJoinModalOpen(false)
  }

  const categories = ["Programming", "Mathematics", "Languages", "Data Science", "Literature", "Physics"]

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Discover Sessions</h1>
              <p className="text-muted-foreground mt-1">
                Browse and join peer learning sessions that match your interests
              </p>
            </div>
            <Button asChild>
              <a href="/create-session">Create New Session</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search sessions..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <DatePicker date={dateFilter} setDate={setDateFilter} className="w-full" />
                </div>

                {(searchQuery || categoryFilter !== "all" || dateFilter) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("all")
                      setDateFilter(undefined)
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-6">
                  {isLoading ? (
                    <div className="grid grid-cols-1 gap-6">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <SessionCardSkeleton key={index} />
                      ))}
                    </div>
                  ) : filteredSessions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {filteredSessions.map((session) => (
                        <SessionCard key={session.id} session={session} onJoin={() => handleJoinSession(session)} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <h3 className="text-lg font-medium mb-2">No sessions found</h3>
                      <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setCategoryFilter("all")
                          setDateFilter(undefined)
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="popular" className="space-y-6">
                  <div className="text-center py-12 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Popular sessions coming soon</h3>
                    <p className="text-muted-foreground">We're working on this feature. Check back later!</p>
                  </div>
                </TabsContent>
                <TabsContent value="new" className="space-y-6">
                  <div className="text-center py-12 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">New sessions coming soon</h3>
                    <p className="text-muted-foreground">We're working on this feature. Check back later!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </main>

      <JoinSessionModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onConfirm={
          confirmJoinSession}
        session={selectedSession}
        />
      </div>
    )
  }

