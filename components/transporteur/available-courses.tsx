"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, MapPin, Package, Clock, Euro, User, Phone, Mail } from "lucide-react"

interface Course {
  id: string
  client: string
  clientEmail: string
  clientPhone: string
  pickupAddress: string
  deliveryAddress: string
  pickupDate: string
  deliveryDate: string
  cargoType: string
  cargoDescription: string
  weight: number
  dimensions: string
  distance: string
  estimatedDuration: string
  payment: number
  urgency: "normal" | "high" | "urgent"
  vehicleType: string
  specialRequirements?: string
  fragile: boolean
  dangerous: boolean
}

const mockCourses: Course[] = [
  {
    id: "JOB-001",
    client: "Fret Rapide SARL",
    clientEmail: "contact@fret-rapide.com",
    clientPhone: "01 23 45 67 89",
    pickupAddress: "555 Place du Marché, 33000 Bordeaux",
    deliveryAddress: "777 Quai des Antilles, 44000 Nantes",
    pickupDate: "2024-01-16",
    deliveryDate: "2024-01-16",
    cargoType: "Mobilier",
    cargoDescription: "Chaises de bureau ergonomiques",
    weight: 500,
    dimensions: "200x120x80 cm",
    distance: "340 km",
    estimatedDuration: "4h 30min",
    payment: 850,
    urgency: "urgent",
    vehicleType: "Camion (1-3T)",
    fragile: false,
    dangerous: false,
  },
  {
    id: "JOB-002",
    client: "Cargo Solutions",
    clientEmail: "orders@cargo-solutions.fr",
    clientPhone: "02 34 56 78 90",
    pickupAddress: "321 Rue des Entrepreneurs, 59000 Lille",
    deliveryAddress: "654 Avenue de l'Europe, 67000 Strasbourg",
    pickupDate: "2024-01-17",
    deliveryDate: "2024-01-18",
    cargoType: "Textile",
    cargoDescription: "Vêtements et tissus",
    weight: 300,
    dimensions: "150x100x60 cm",
    distance: "520 km",
    estimatedDuration: "6h 15min",
    payment: 680,
    urgency: "normal",
    vehicleType: "Fourgonnette",
    fragile: false,
    dangerous: false,
  },
  {
    id: "JOB-003",
    client: "Tech Express",
    clientEmail: "shipping@tech-express.com",
    clientPhone: "03 45 67 89 01",
    pickupAddress: "123 Zone Industrielle, 69000 Lyon",
    deliveryAddress: "456 Parc Technologique, 06000 Nice",
    pickupDate: "2024-01-18",
    deliveryDate: "2024-01-19",
    cargoType: "Électronique",
    cargoDescription: "Serveurs et équipements informatiques",
    weight: 200,
    dimensions: "100x80x50 cm",
    distance: "470 km",
    estimatedDuration: "5h 45min",
    payment: 750,
    urgency: "high",
    vehicleType: "Fourgonnette",
    specialRequirements: "Manipulation délicate requise",
    fragile: true,
    dangerous: false,
  },
]

export function AvailableCourses() {
  const [courses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")
  const [vehicleFilter, setVehicleFilter] = useState<string>("all")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesUrgency = urgencyFilter === "all" || course.urgency === urgencyFilter
    const matchesVehicle = vehicleFilter === "all" || course.vehicleType === vehicleFilter

    return matchesSearch && matchesUrgency && matchesVehicle
  })

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Prioritaire</Badge>
      case "normal":
        return <Badge variant="outline">Normal</Badge>
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  const handleAcceptCourse = (courseId: string) => {
    console.log("Course acceptée:", courseId)
    // Here you would typically make an API call to accept the course
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Courses Disponibles</h1>
        <p className="text-muted-foreground">Trouvez et acceptez de nouvelles opportunités de transport</p>
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
                  placeholder="Rechercher une course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Toutes les urgences" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les urgences</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">Prioritaire</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les véhicules" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les véhicules</SelectItem>
                <SelectItem value="Fourgonnette">Fourgonnette</SelectItem>
                <SelectItem value="Camion (1-3T)">Camion (1-3T)</SelectItem>
                <SelectItem value="Semi-remorque">Semi-remorque</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{course.id}</CardTitle>
                  <CardDescription>{course.client}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">€{course.payment}</div>
                  {getUrgencyBadge(course.urgency)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">Départ:</span>
                  {course.pickupAddress.split(",")[1]}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="font-medium">Arrivée:</span>
                  {course.deliveryAddress.split(",")[1]}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Distance:</span> {course.distance}
                </div>
                <div>
                  <span className="font-medium">Durée:</span> {course.estimatedDuration}
                </div>
                <div>
                  <span className="font-medium">Poids:</span> {course.weight}kg
                </div>
                <div>
                  <span className="font-medium">Véhicule:</span> {course.vehicleType}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4" />
                  <span>
                    {course.cargoType} - {course.cargoDescription}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Collecte: {course.pickupDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {course.fragile && <Badge variant="destructive">Fragile</Badge>}
                {course.dangerous && <Badge variant="destructive">Dangereux</Badge>}
                {course.specialRequirements && <Badge variant="secondary">Instructions spéciales</Badge>}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Voir détails
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Détails de la course {course.id}</DialogTitle>
                    </DialogHeader>
                    {selectedCourse && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Informations client
                            </h4>
                            <p className="text-sm">{selectedCourse.client}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {selectedCourse.clientEmail}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {selectedCourse.clientPhone}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Euro className="h-4 w-4" />
                              Rémunération
                            </h4>
                            <p className="text-2xl font-bold text-green-600">€{selectedCourse.payment}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedCourse.payment / Number.parseInt(selectedCourse.distance)).toFixed(2)} €/km
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Itinéraire complet</h4>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <strong>Collecte:</strong> {selectedCourse.pickupAddress}
                            </p>
                            <p className="text-sm">
                              <strong>Livraison:</strong> {selectedCourse.deliveryAddress}
                            </p>
                            <p className="text-sm">
                              <strong>Distance totale:</strong> {selectedCourse.distance} (
                              {selectedCourse.estimatedDuration})
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Détails de la marchandise</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm">
                                <strong>Type:</strong> {selectedCourse.cargoType}
                              </p>
                              <p className="text-sm">
                                <strong>Description:</strong> {selectedCourse.cargoDescription}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm">
                                <strong>Poids:</strong> {selectedCourse.weight}kg
                              </p>
                              <p className="text-sm">
                                <strong>Dimensions:</strong> {selectedCourse.dimensions}
                              </p>
                            </div>
                          </div>
                          {selectedCourse.specialRequirements && (
                            <p className="text-sm mt-2">
                              <strong>Instructions spéciales:</strong> {selectedCourse.specialRequirements}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {selectedCourse.fragile && <Badge variant="destructive">Fragile</Badge>}
                          {selectedCourse.dangerous && <Badge variant="destructive">Dangereux</Badge>}
                          {getUrgencyBadge(selectedCourse.urgency)}
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button className="flex-1" onClick={() => handleAcceptCourse(course.id)}>
                  Accepter la course
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune course disponible</h3>
            <p className="text-muted-foreground">Aucune course ne correspond à vos critères de recherche.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
