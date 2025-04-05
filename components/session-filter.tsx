import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export function SessionFilter() {
  return (
    <div className="space-y-6">
      <div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search sessions..." className="pl-8" />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="programming" />
            <Label htmlFor="programming">Programming</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="mathematics" />
            <Label htmlFor="mathematics">Mathematics</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="languages" />
            <Label htmlFor="languages">Languages</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="science" />
            <Label htmlFor="science">Science</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="literature" />
            <Label htmlFor="literature">Literature</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Session Mode</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All Modes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video">Video</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="audio" id="audio" />
            <Label htmlFor="audio">Audio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="text" />
            <Label htmlFor="text">Text</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-3">Time</h3>
        <RadioGroup defaultValue="anytime">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="anytime" id="anytime" />
            <Label htmlFor="anytime">Anytime</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="today" id="today" />
            <Label htmlFor="today">Today</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tomorrow" id="tomorrow" />
            <Label htmlFor="tomorrow">Tomorrow</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="this-week" id="this-week" />
            <Label htmlFor="this-week">This Week</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="next-week" id="next-week" />
            <Label htmlFor="next-week">Next Week</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

