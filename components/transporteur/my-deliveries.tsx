"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, MapPin, Clock, CheckCircle, AlertTriangle, Navigation } from "lucide-react"

interface Delivery {
  id: string
  client: string
  route: string
  pickupAddress: string
  deliveryAddress: string
  status: "assigned" | "pickup" | "en_route" | "delivered" | "delayed"
  progress: number
  estimatedArrival: string
  cargo: string
  weight: number
  payment: number
  startDate: string
  actualDelivery?: string
}

const mockDeliveries: Delivery[] = [
  {
    id: "CMD-001",
    client: "Transport Express SARL",
    route: "Paris → Lyon",
    pickupAddress: "123 Rue de la République, 75001 Paris",
    deliveryAddress: "456 Avenue de la Liberté, 69001 Lyon",
    status: "en_route",
    progress: 65,
    estimatedArrival: "16:30",
    cargo: "Électronique",
    weight: 150,
    payment: 450,
    startDate: "2024-01-15",
  },
  {
    id: "CMD-004",
    client: "Logistique Pro",
    route: "Marseille → Nice",
    pickupAddress: "789 Boulevard du Commerce, 13001 Marseille",
    deliveryAddress: "321 Promenade des Anglais, 06000 Nice",
    status: "pickup",
    progress: 10,
    estimatedArrival: "14:00",
    cargo: "Alimentaire",
    weight: 200,
    payment: 320,
    startDate: "2024-01-15",
  },
  {
    id: "CMD-002",
    client: "Fret Rapide",
    route: "Bordeaux → Toulouse",
    pickupAddress: "555 Place du Marché, 33000 Bordeaux",
    deliveryAddress: "777 Rue de la Paix, 31000 Toulouse",
    status: "delivered",
    progress: 100,
    estimatedArrival: "12:00",
    cargo: "Mobilier",
    weight: 500,
    payment: 680,
    startDate: "2024-01-14",
    actualDelivery: "11:45",
  },
  {
    id: "CMD-005",
    client: "Cargo Solutions",
    route: "Lille → Strasbourg",
    pickupAddress: "321 Rue des Entrepreneurs, 59000 Lille",
    deliveryAddress: "654 Avenue de l'Europe, 67000 Strasbourg",
    status: "delayed",
    progress: 45,
    estimatedArrival: "18:30",
    cargo: "Textile",
    weight: 300,
    payment: 580,
    startDate: "2024-01-13",
  },
]

export function MyDeliveries() {
  const [deliveries] = useState<Delivery[]>(mockDeliveries)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredDeliveries = deliveries.filter((delivery) => {
    return statusFilter === "all" || delivery.status === statusFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Livré</Badge>
      case "en_route":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En route</Badge>
      case "pickup":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Collecte</Badge>
      case "assigned":
        return <Badge variant="secondary">Assigné</Badge>
      case "delayed":
        return <Badge variant="destructive">Retardé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "en_route":
        return <Navigation className="h-5 w-5 text-blue-600" />
      case "pickup":
        return <Truck className="h-5 w-5 text-orange-600" />
      case "delayed":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    console.log(`Updating delivery ${deliveryId} to status: ${newStatus}`)
    // Here you would typically make an API call to update the delivery status
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Mes Livraisons</h1>
        <p className="text-muted-foreground">Gérez et suivez vos livraisons en cours</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Navigation className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliveries.filter((d) => d.status === "en_route" || d.status === "pickup").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveries.filter((d) => d.status === "delivered").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retardées</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveries.filter((d) => d.status === "delayed").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="assigned">Assigné</SelectItem>
              <SelectItem value="pickup">Collecte</SelectItem>
              <SelectItem value="en_route">En route</SelectItem>
              <SelectItem value="delivered">Livré</SelectItem>
              <SelectItem value="delayed">Retardé</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(delivery.status)}
                  <div>
                    <CardTitle className="text-lg">{delivery.id}</CardTitle>
                    <CardDescription>{delivery.client}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">€{delivery.payment}</div>
                  {getStatusBadge(delivery.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">Départ:</span>
                    {delivery.pickupAddress.split(",")[1]}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="font-medium">Arrivée:</span>
                    {delivery.deliveryAddress.split(",")[1]}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Cargo:</span> {delivery.cargo} ({delivery.weight}kg)
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Début:</span> {delivery.startDate}
                  </div>
                  {delivery.actualDelivery && (
                    <div className="text-sm">
                      <span className="font-medium">Livré le:</span> {delivery.actualDelivery}
                    </div>
                  )}
                </div>
              </div>

              {delivery.status !== "delivered" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{delivery.progress}%</span>
                  </div>
                  <Progress value={delivery.progress} />
                  <p className="text-xs text-muted-foreground">Arrivée estimée: {delivery.estimatedArrival}</p>
                </div>
              )}

              {delivery.status !== "delivered" && (
                <div className="flex gap-2">
                  {delivery.status === "assigned" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateDeliveryStatus(delivery.id, "pickup")}
                      className="bg-transparent"
                    >
                      Commencer la collecte
                    </Button>
                  )}
                  {delivery.status === "pickup" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateDeliveryStatus(delivery.id, "en_route")}
                      className="bg-transparent"
                    >
                      Marchandise collectée
                    </Button>
                  )}
                  {delivery.status === "en_route" && (
                    <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, "delivered")}>
                      Marquer comme livré
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Voir sur la carte
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeliveries.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune livraison</h3>
            <p className="text-muted-foreground">Aucune livraison ne correspond à vos critères de recherche.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
