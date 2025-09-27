"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Shield,
  Truck,
  Package,
  Home,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  List,
} from "lucide-react"

type UserRole = "admin" | "transporteur" | "affreteur"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: UserRole
}

const navigationConfig = {
  admin: [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Produits", href: "/admin/products" },
    { icon: ShoppingCart, label: "Commandes", href: "/admin/orders" },
    { icon: Users, label: "Utilisateurs", href: "/admin/users" },
    { icon: BarChart3, label: "Statistiques", href: "/admin/stats" },
    { icon: Settings, label: "Paramètres", href: "/admin/settings" },
  ],
  transporteur: [
    { icon: Home, label: "Dashboard", href: "/transporteur/dashboard" },
    { icon: List, label: "Courses disponibles", href: "/transporteur/courses" },
    { icon: Truck, label: "Mes livraisons", href: "/transporteur/deliveries" },
    { icon: BarChart3, label: "Historique", href: "/transporteur/history" },
    { icon: Settings, label: "Profil", href: "/transporteur/profile" },
  ],
  affreteur: [
    { icon: Home, label: "Dashboard", href: "/affreteur/dashboard" },
    { icon: Plus, label: "Nouvelle commande", href: "/affreteur/new-order" },
    { icon: ShoppingCart, label: "Mes commandes", href: "/affreteur/orders" },
    { icon: BarChart3, label: "Historique", href: "/affreteur/history" },
    { icon: Settings, label: "Profil", href: "/affreteur/profile" },
  ],
}

const roleConfig = {
  admin: { label: "Administrateur", icon: Shield, color: "text-primary" },
  transporteur: { label: "Transporteur", icon: Truck, color: "text-accent" },
  affreteur: { label: "Affréteur", icon: Package, color: "text-secondary" },
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  if (!user) return null

  const RoleIcon = roleConfig[userRole].icon
  const navigation = navigationConfig[userRole]

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <RoleIcon className={`h-8 w-8 ${roleConfig[userRole].color}`} />
          <div>
            <h2 className="font-bold text-lg">TransportPro</h2>
            <p className="text-sm text-muted-foreground">{roleConfig[userRole].label}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-12"
                  onClick={() => router.push(item.href)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">{user.email?.[0]?.toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground">{roleConfig[userRole].label}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <RoleIcon className={`h-6 w-6 ${roleConfig[userRole].color}`} />
          <span className="font-bold">TransportPro</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
