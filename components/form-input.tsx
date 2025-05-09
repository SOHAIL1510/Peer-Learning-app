import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ label, id, error, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className={error ? "border-destructive" : ""} {...props} />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  )
}

