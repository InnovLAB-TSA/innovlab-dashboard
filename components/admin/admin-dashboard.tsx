"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, AlertTriangle, TrendingUp, Clock, CheckCircle, XCircle, Users, Euro } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const monthlyData = [
  { month: "Jan", orders: 65, revenue: 12400 },
  { month: "Fév", orders: 78, revenue: 15600 },
  { month: "Mar", orders: 90, revenue: 18200 },
  { month: "Avr", orders: 81, revenue: 16800 },
  { month: "Mai", orders: 95, revenue: 19500 },
  { month: "Jun", orders: 110, revenue: 22000 },
]

const transporterPerformance = [
  { name: "Jean Dupont", orders: 45, rating: 4.8 },
  { name: "Marie Martin", orders: 32, rating: 4.6 },
  { name: "Pierre Durand", orders: 28, rating: 4.4 },
  { name: "Sophie Leblanc", orders: 25, rating: 4.7 },
]

export function AdminDashboard() {
  const stats = [
    {
      title: "Commandes totales",
      value: "1,234",
      change: "+12%",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Transporteurs actifs",
      value: "89",
      change: "+5%",
      icon: Truck,
      color: "text-accent",
    },
    {
      title: "Colis en retard",
      value: "23",
      change: "-8%",
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      title: "Revenus du mois",
      value: "€45,678",
      change: "+18%",
      icon: Euro,
      color: "text-green-600",
    },
  ]

  const recentOrders = [
    {
      id: "CMD-001",
      client: "Transport Express SARL",
      destination: "Paris → Lyon",
      status: "en_route",
      priority: "high",
      date: "2024-01-15",
    },
    {
      id: "CMD-002",
      client: "Logistique Pro",
      destination: "Marseille → Toulouse",
      status: "delivered",
      priority: "normal",
      date: "2024-01-14",
    },
    {
      id: "CMD-003",
      client: "Fret Rapide",
      destination: "Bordeaux → Nantes",
      status: "delayed",
      priority: "high",
      date: "2024-01-13",
    },
    {
      id: "CMD-004",
      client: "Cargo Solutions",
      destination: "Lille → Strasbourg",
      status: "pending",
      priority: "normal",
      date: "2024-01-12",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Livré</Badge>
      case "en_route":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En route</Badge>
      case "delayed":
        return <Badge variant="destructive">Retardé</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    return priority === "high" ? <Badge variant="destructive">Urgent</Badge> : <Badge variant="outline">Normal</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard Administrateur</h1>
        <p className="text-muted-foreground">Vue d'ensemble de la plateforme de transport</p>
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
                  <span className="text-green-600">{stat.change}</span> par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Évolution des revenus
            </CardTitle>
            <CardDescription>Revenus mensuels des 6 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, "Revenus"]} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Commandes mensuelles
            </CardTitle>
            <CardDescription>Nombre de commandes par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Commandes récentes
            </CardTitle>
            <CardDescription>Dernières commandes de transport</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      {getPriorityBadge(order.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">{order.client}</p>
                    <p className="text-sm">{order.destination}</p>
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

        {/* Top Transporters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Transporteurs
            </CardTitle>
            <CardDescription>Meilleurs transporteurs du mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transporterPerformance.map((transporter, index) => (
                <div key={transporter.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{transporter.name}</p>
                      <p className="text-sm text-muted-foreground">{transporter.orders} commandes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{transporter.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Alertes système
          </CardTitle>
          <CardDescription>Notifications importantes nécessitant votre attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">Colis en retard critique</p>
                <p className="text-sm text-red-700">3 colis ont plus de 48h de retard</p>
                <Progress value={75} className="mt-2 h-2" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Stock faible</p>
                <p className="text-sm text-yellow-700">5 produits ont un stock limité</p>
                <Progress value={25} className="mt-2 h-2" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Nouveau transporteur</p>
                <p className="text-sm text-green-700">2 nouveaux transporteurs validés</p>
                <Progress value={100} className="mt-2 h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
