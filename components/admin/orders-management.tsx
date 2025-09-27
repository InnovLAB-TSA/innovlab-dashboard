"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Edit, MapPin, Package, User } from "lucide-react"

interface Order {
  id: string
  clientName: string
  clientEmail: string
  pickupAddress: string
  deliveryAddress: string
  cargoType: string
  weight: number
  status: "pending" | "assigned" | "en_route" | "delivered" | "cancelled"
  priority: "normal" | "high" | "urgent"
  transporteur?: string
  createdAt: string
  estimatedDelivery: string
  totalCost: number
}

const mockOrders: Order[] = [
  {
    id: "CMD-001",
    clientName: "Transport Express SARL",
    clientEmail: "contact@transport-express.com",
    pickupAddress: "123 Rue de la République, 75001 Paris",
    deliveryAddress: "456 Avenue de la Liberté, 69001 Lyon",
    cargoType: "Électronique",
    weight: 150,
    status: "en_route",
    priority: "high",
    transporteur: "Jean Dupont",
    createdAt: "2024-01-15",
    estimatedDelivery: "2024-01-17",
    totalCost: 450,
  },
  {
    id: "CMD-002",
    clientName: "Logistique Pro",
    clientEmail: "admin@logistique-pro.fr",
    pickupAddress: "789 Boulevard du Commerce, 13001 Marseille",
    deliveryAddress: "321 Rue des Entrepreneurs, 31000 Toulouse",
    cargoType: "Alimentaire",
    weight: 300,
    status: "delivered",
    priority: "normal",
    transporteur: "Marie Martin",
    createdAt: "2024-01-14",
    estimatedDelivery: "2024-01-16",
    totalCost: 680,
  },
  {
    id: "CMD-003",
    clientName: "Fret Rapide",
    clientEmail: "orders@fret-rapide.com",
    pickupAddress: "555 Place du Marché, 33000 Bordeaux",
    deliveryAddress: "777 Quai des Antilles, 44000 Nantes",
    cargoType: "Mobilier",
    weight: 500,
    status: "pending",
    priority: "urgent",
    createdAt: "2024-01-13",
    estimatedDelivery: "2024-01-15",
    totalCost: 850,
  },
]

export function OrdersManagement() {
  const [orders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Livré</Badge>
      case "en_route":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En route</Badge>
      case "assigned":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Assigné</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Prioritaire</Badge>
      case "normal":
        return <Badge variant="outline">Normal</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Gestion des Commandes</h1>
        <p className="text-muted-foreground">Supervisez et gérez toutes les commandes de transport</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une commande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="assigned">Assigné</SelectItem>
                <SelectItem value="en_route">En route</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Commandes ({filteredOrders.length})
          </CardTitle>
          <CardDescription>Liste de toutes les commandes de transport</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Trajet</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Transporteur</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.createdAt}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.clientName}</div>
                      <div className="text-sm text-muted-foreground">{order.clientEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {order.pickupAddress.split(",")[1]}
                      </div>
                      <div className="text-sm">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {order.deliveryAddress.split(",")[1]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.cargoType}</div>
                      <div className="text-sm text-muted-foreground">{order.weight} kg</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell>
                    {order.transporteur ? (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {order.transporteur}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Non assigné</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">€{order.totalCost}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails de la commande {order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Informations client</h4>
                                  <p className="text-sm">{selectedOrder.clientName}</p>
                                  <p className="text-sm text-muted-foreground">{selectedOrder.clientEmail}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Statut</h4>
                                  <div className="space-y-2">
                                    {getStatusBadge(selectedOrder.status)}
                                    {getPriorityBadge(selectedOrder.priority)}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Trajet</h4>
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    <strong>Départ:</strong> {selectedOrder.pickupAddress}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Arrivée:</strong> {selectedOrder.deliveryAddress}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Marchandise</h4>
                                  <p className="text-sm">{selectedOrder.cargoType}</p>
                                  <p className="text-sm text-muted-foreground">{selectedOrder.weight} kg</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Coût total</h4>
                                  <p className="text-lg font-bold">€{selectedOrder.totalCost}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
