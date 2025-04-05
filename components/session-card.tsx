import { Calendar, Clock, User, Video, Mic, MessageSquare, MoreVertical, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Session {
  id: string
  title: string
  category: string
  description: string
  date: string
  host: string
  mode: "Video" | "Audio" | "Text"
}

interface SessionCardProps {
  session: Session
  isHost?: boolean
}

export function SessionCard({ session, isHost = false }: SessionCardProps) {
  const sessionDate = new Date(session.date)
  const formattedDate = format(sessionDate, "MMMM d, yyyy")
  const formattedTime = format(sessionDate, "h:mm a")

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "Video":
        return <Video className="h-4 w-4" />
      case "Audio":
        return <Mic className="h-4 w-4" />
      case "Text":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Video className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {session.category}
            </Badge>
            <CardTitle>{session.title}</CardTitle>
            <CardDescription className="mt-1.5">
              <div className="flex items-center gap-1 text-sm">
                <User className="h-3.5 w-3.5" />
                <span>Hosted by {session.host}</span>
              </div>
            </CardDescription>
          </div>
          {isHost && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit Session</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Cancel Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{session.description}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            {getModeIcon(session.mode)}
            <span>{session.mode} Session</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isHost ? (
          <Button variant="outline" className="w-full">
            Manage Session
          </Button>
        ) : (
          <Button className="w-full">Join Session</Button>
        )}
      </CardFooter>
    </Card>
  )
}

