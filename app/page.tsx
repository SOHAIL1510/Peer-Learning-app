import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Calendar, BookOpen, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PeerLearn</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Learn Together, <span className="text-primary">Grow Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              Connect with peers, share knowledge, and accelerate your learning through collaborative study sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  Explore Sessions
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border shadow-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              width={1280}
              height={720}
              alt="Dashboard preview"
              className="w-full"
              priority
            />
          </div>
        </section>

        <section id="features" className="bg-muted/50 py-24">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Powerful Features for Collaborative Learning
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                Everything you need to create, join, and manage peer learning sessions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground">
                  Create sessions that fit your calendar. Choose the perfect time for you and your peers.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Topic Categories</h3>
                <p className="text-muted-foreground">
                  Organize sessions by subject matter to help peers find exactly what they're looking for.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive Sessions</h3>
                <p className="text-muted-foreground">
                  Engage with peers through video, audio, or text-based sessions depending on your preference.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-24 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to start learning together?</h2>
            <p className="text-muted-foreground md:text-xl max-w-[600px] mx-auto">
              Join thousands of students who are already enhancing their education through peer learning.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Sign Up Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-muted/50">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-semibold">PeerLearn</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} PeerLearn. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

