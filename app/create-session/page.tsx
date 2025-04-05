import { DashboardHeader } from "@/components/dashboard-header"
import { CreateSessionForm } from "@/components/create-session-form"

export default function CreateSessionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Create a Learning Session</h1>
          <CreateSessionForm />
        </div>
      </main>
    </div>
  )
}

