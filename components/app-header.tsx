"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Menu, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userName, setUserName] = useState("User")
  const [userInitial, setUserInitial] = useState("U")

  // Fetch current user data from localStorage on mount and when it changes
  useEffect(() => {
    const fetchCurrentUser = () => {
      try {
        const currentUserData = localStorage.getItem("currentUser")
        if (currentUserData) {
          const parsedData = JSON.parse(currentUserData)
          if (parsedData.name) {
            setUserName(parsedData.name)
            setUserInitial(parsedData.name.charAt(0).toUpperCase())
          }
        }
      } catch (error) {
        console.error("Error reading user data:", error)
      }
    }

    // Initial fetch
    fetchCurrentUser()

    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "currentUser" || e.key === "isAuthenticated") {
        fetchCurrentUser()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for when user data changes within the same window
    const handleUserDataChange = () => {
      fetchCurrentUser()
    }

    window.addEventListener("userDataChange", handleUserDataChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("userDataChange", handleUserDataChange)
    }
  }, [])

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Sessions", path: "/my-sessions" },
    { name: "Create Session", path: "/create-session" },
  ]

  const handleLogout = () => {
    // Clear authentication state and current user
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("currentUser")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Redirect to login page
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SkillShare Hub</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path) ? "text-primary" : "text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt={userName} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{userName}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Users className="h-6 w-6 text-primary" />
                    <span className="font-bold">SkillShare Hub</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                <div className="flex items-center gap-3 px-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={userName} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{userName}</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.path) ? "text-primary" : "text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/profile"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/profile") ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/settings") ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </nav>

                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

