"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export function AffreteurDashboard() {
  const router = useRouter()

  const stats = [
    {
      title: "Commandes actives",
      value: "12",
      change: "+3",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "En attente",
      value: "5",
      change: "+2",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Livrées ce mois",
      value: "28",
      change: "+15%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Budget utilisé",
      value: "€3,450",
      change: "+12%",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  const recentOrders = [
    {
      id: "CMD-001",
      destination: "Paris → Lyon",
      status: "en_route",
      date: "2024-01-15",
      transporteur: "Transport Express",
    },
    {
      id: "CMD-002",
      destination: "Marseille → Toulouse",
      status: "delivered",
      date: "2024-01-14",
      transporteur: "Logistique Pro",
    },
    {
      id: "CMD-003",
      destination: "Bordeaux → Nantes",
      status: "pending",
      date: "2024-01-13",
      transporteur: "En attente d'attribution",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Livré</Badge>
      case "en_route":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En route</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard Affréteur</h1>
          <p className="text-muted-foreground">Gérez vos demandes de transport</p>
        </div>
        <Button onClick={() => router.push("/affreteur/new-order")}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle demande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> ce mois
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Commandes récentes
            </CardTitle>
            <CardDescription>Vos dernières demandes de transport</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{order.id}</div>
                    <p className="text-sm text-muted-foreground">{order.destination}</p>
                    <p className="text-xs text-muted-foreground">{order.transporteur}</p>
                  </div>
                  <div className="text-right space-y-1">
                    {getStatusBadge(order.status)}
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Voir toutes les commandes
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Raccourcis vers les fonctions principales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-3 h-12" onClick={() => router.push("/affreteur/new-order")}>
              <Plus className="h-5 w-5" />
              Créer une nouvelle demande
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 bg-transparent"
              onClick={() => router.push("/affreteur/orders")}
            >
              <Package className="h-5 w-5" />
              Voir mes commandes
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 bg-transparent"
              onClick={() => router.push("/affreteur/history")}
            >
              <Clock className="h-5 w-5" />
              Historique des transports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
