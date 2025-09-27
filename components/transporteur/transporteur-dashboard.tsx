"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Truck, Package, Clock, CheckCircle, TrendingUp, Star, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function TransporteurDashboard() {
  const router = useRouter()

  const stats = [
    {
      title: "Courses disponibles",
      value: "8",
      change: "+3 nouvelles",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Livraisons actives",
      value: "4",
      change: "En cours",
      icon: Truck,
      color: "text-accent",
    },
    {
      title: "Terminées ce mois",
      value: "23",
      change: "+15%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Revenus du mois",
      value: "€2,340",
      change: "+12%",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  const activeDeliveries = [
    {
      id: "CMD-001",
      client: "Transport Express SARL",
      route: "Paris → Lyon",
      status: "en_route",
      progress: 65,
      estimatedArrival: "16:30",
      cargo: "Électronique - 150kg",
    },
    {
      id: "CMD-004",
      client: "Logistique Pro",
      route: "Marseille → Nice",
      status: "pickup",
      progress: 10,
      estimatedArrival: "14:00",
      cargo: "Alimentaire - 200kg",
    },
  ]

  const availableJobs = [
    {
      id: "JOB-001",
      client: "Fret Rapide",
      route: "Bordeaux → Nantes",
      distance: "340 km",
      cargo: "Mobilier - 500kg",
      payment: "€850",
      urgency: "urgent",
      pickupDate: "2024-01-16",
    },
    {
      id: "JOB-002",
      client: "Cargo Solutions",
      route: "Lille → Strasbourg",
      distance: "520 km",
      cargo: "Textile - 300kg",
      payment: "€680",
      urgency: "normal",
      pickupDate: "2024-01-17",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_route":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En route</Badge>
      case "pickup":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Collecte</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Livré</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    return urgency === "urgent" ? <Badge variant="destructive">Urgent</Badge> : <Badge variant="outline">Normal</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard Transporteur</h1>
          <p className="text-muted-foreground">Gérez vos livraisons et trouvez de nouvelles courses</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="font-medium">4.8</span>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">Vérifié</Badge>
        </div>
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
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Livraisons en cours
            </CardTitle>
            <CardDescription>Vos livraisons actuelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{delivery.id}</div>
                      <p className="text-sm text-muted-foreground">{delivery.client}</p>
                    </div>
                    {getStatusBadge(delivery.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {delivery.route}
                    </div>
                    <p className="text-sm text-muted-foreground">{delivery.cargo}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{delivery.progress}%</span>
                    </div>
                    <Progress value={delivery.progress} />
                    <p className="text-xs text-muted-foreground">Arrivée estimée: {delivery.estimatedArrival}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Voir toutes les livraisons
            </Button>
          </CardContent>
        </Card>

        {/* Available Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Courses disponibles
            </CardTitle>
            <CardDescription>Nouvelles opportunités de transport</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableJobs.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{job.id}</div>
                      <p className="text-sm text-muted-foreground">{job.client}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-green-600">{job.payment}</div>
                      {getUrgencyBadge(job.urgency)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {job.route} ({job.distance})
                    </div>
                    <p className="text-sm text-muted-foreground">{job.cargo}</p>
                    <p className="text-xs text-muted-foreground">Collecte: {job.pickupDate}</p>
                  </div>

                  <Button className="w-full">Accepter la course</Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() => router.push("/transporteur/courses")}
            >
              Voir toutes les courses
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Raccourcis vers les fonctions principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="justify-start gap-3 h-12" onClick={() => router.push("/transporteur/courses")}>
              <Package className="h-5 w-5" />
              Parcourir les courses
            </Button>

            <Button
              variant="outline"
              className="justify-start gap-3 h-12 bg-transparent"
              onClick={() => router.push("/transporteur/deliveries")}
            >
              <Truck className="h-5 w-5" />
              Mes livraisons
            </Button>

            <Button
              variant="outline"
              className="justify-start gap-3 h-12 bg-transparent"
              onClick={() => router.push("/transporteur/history")}
            >
              <Clock className="h-5 w-5" />
              Historique
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
