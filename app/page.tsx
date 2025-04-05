import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Calendar, Globe, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SkillShare Hub</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
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
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
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
                Features That Make Learning Together Better
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
                <Globe className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Online & Offline</h3>
                <p className="text-muted-foreground">
                  Host sessions virtually or in-person depending on your preference and availability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                Join thousands of students who are already enhancing their education through peer learning
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="User avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Computer Science Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "SkillShare Hub has transformed how I learn. Being able to connect with peers who are studying the
                  same topics has made complex subjects much easier to understand."
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="User avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-muted-foreground">Data Science Enthusiast</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I've hosted several sessions on Python programming, and the feedback has been incredible. Teaching
                  others has deepened my own understanding of the material."
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="User avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Aisha Patel</h4>
                    <p className="text-sm text-muted-foreground">Language Learner</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Finding conversation partners for practicing Spanish was always difficult until I found SkillShare
                  Hub. Now I have weekly sessions with peers from around the world."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-muted/50 py-24">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                Find answers to common questions about SkillShare Hub
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I join a session?</AccordionTrigger>
                  <AccordionContent>
                    After creating an account, you can browse available sessions on the dashboard. Click on any session
                    that interests you and then click the "Join Session" button. You'll receive details on how to
                    connect.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I host my own learning sessions?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Any registered user can host a session. Simply click on "Create New Session" from your
                    dashboard, fill out the session details, and publish it for others to join.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is SkillShare Hub free to use?</AccordionTrigger>
                  <AccordionContent>
                    SkillShare Hub is completely free for basic usage. We offer premium features for power users who
                    host multiple sessions or need advanced tools, but the core functionality is available to everyone
                    at no cost.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What types of sessions can I create?</AccordionTrigger>
                  <AccordionContent>
                    You can create sessions on any topic you're knowledgeable about. Popular categories include
                    programming, languages, mathematics, science, art, music, and professional skills. Sessions can be
                    online or in-person.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I cancel a session I've joined?</AccordionTrigger>
                  <AccordionContent>
                    You can view all sessions you've joined in the "My Sessions" page under the "Joined" tab. From
                    there, you can click "Leave Session" on any session you wish to cancel your participation in.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
            <span className="font-semibold">SkillShare Hub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillShare Hub. All rights reserved.
          </p>
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

