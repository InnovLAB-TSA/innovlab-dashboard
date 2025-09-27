"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Truck, Shield, Package } from "lucide-react"

type UserRole = "admin" | "transporteur" | "affreteur"

const roleConfig = {
  admin: {
    label: "Administrateur",
    icon: Shield,
    color: "text-primary",
    redirect: "/admin/dashboard",
  },
  transporteur: {
    label: "Transporteur",
    icon: Truck,
    color: "text-accent",
    redirect: "/transporteur/dashboard",
  },
  affreteur: {
    label: "Affréteur",
    icon: Package,
    color: "text-secondary",
    redirect: "/affreteur/dashboard",
  },
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("admin")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      // Store user info in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify({ email, role }))
      router.push(roleConfig[role].redirect)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(roleConfig).map(([key, config]) => {
          const Icon = config.icon
          return (
            <Card
              key={key}
              className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                role === key ? "ring-2 ring-primary bg-primary/5" : ""
              }`}
              onClick={() => setRole(key as UserRole)}
            >
              <div className="text-center">
                <Icon className={`h-6 w-6 mx-auto mb-1 ${config.color}`} />
                <p className="text-xs font-medium">{config.label}</p>
              </div>
            </Card>
          )
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        <p>Comptes de démonstration :</p>
        <p>admin@transport.com / transporteur@transport.com / affreteur@transport.com</p>
        <p>Mot de passe : demo123</p>
      </div>
    </div>
  )
}
