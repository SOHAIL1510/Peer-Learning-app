"use client"

import { Calendar, Clock, Globe, MapPin, User } from "lucide-react"
import { format } from "date-fns"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface JoinSessionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  session: any
}

export function JoinSessionModal({ isOpen, onClose, onConfirm, session }: JoinSessionModalProps) {
  if (!session) return null

  const sessionDate = new Date(session.date)
  const formattedDate = format(sessionDate, "MMMM d, yyyy")
  const formattedTime = format(sessionDate, "h:mm a")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Session</DialogTitle>
          <DialogDescription>You're about to join the following session:</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              {session.category}
            </Badge>
            <h3 className="text-lg font-semibold">{session.title}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <User className="h-3.5 w-3.5" />
              <span>Hosted by {session.host}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{session.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              {session.mode === "Online" ? (
                <Globe className="h-4 w-4 text-muted-foreground" />
              ) : (
                <MapPin className="h-4 w-4 text-muted-foreground" />
              )}
              <span>{session.mode}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

