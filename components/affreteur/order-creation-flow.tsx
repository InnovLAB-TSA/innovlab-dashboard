"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Package, Truck, CheckCircle, ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react"

interface OrderData {
  // Step 1: Pickup & Delivery
  pickupAddress: string
  pickupCity: string
  pickupPostalCode: string
  pickupDate: string
  pickupTime: string
  deliveryAddress: string
  deliveryCity: string
  deliveryPostalCode: string
  deliveryDate: string
  deliveryTime: string

  // Step 2: Cargo Details
  cargoType: string
  cargoDescription: string
  weight: string
  dimensions: string
  quantity: string
  fragile: boolean
  dangerous: boolean
  temperature: string

  // Step 3: Transport Options
  transportType: string
  urgency: string
  insurance: boolean
  specialInstructions: string

  // Step 4: Contact & Budget
  contactName: string
  contactPhone: string
  contactEmail: string
  estimatedBudget: string
}

const initialOrderData: OrderData = {
  pickupAddress: "",
  pickupCity: "",
  pickupPostalCode: "",
  pickupDate: "",
  pickupTime: "",
  deliveryAddress: "",
  deliveryCity: "",
  deliveryPostalCode: "",
  deliveryDate: "",
  deliveryTime: "",
  cargoType: "",
  cargoDescription: "",
  weight: "",
  dimensions: "",
  quantity: "",
  fragile: false,
  dangerous: false,
  temperature: "",
  transportType: "",
  urgency: "",
  insurance: false,
  specialInstructions: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  estimatedBudget: "",
}

const steps = [
  {
    id: 1,
    title: "Points de collecte et livraison",
    description: "Définissez les adresses de départ et d'arrivée",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Détails de la marchandise",
    description: "Décrivez votre cargaison",
    icon: Package,
  },
  {
    id: 3,
    title: "Options de transport",
    description: "Choisissez le type de transport",
    icon: Truck,
  },
  {
    id: 4,
    title: "Contact et budget",
    description: "Informations finales",
    icon: CheckCircle,
  },
]

export function OrderCreationFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState<OrderData>(initialOrderData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const updateOrderData = (field: keyof OrderData, value: string | boolean) => {
    setOrderData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Order submitted:", orderData)
      router.push("/affreteur/orders?success=true")
    }, 2000)
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          orderData.pickupAddress &&
          orderData.pickupCity &&
          orderData.deliveryAddress &&
          orderData.deliveryCity
        )
      case 2:
        return !!(orderData.cargoType && orderData.weight && orderData.dimensions)
      case 3:
        return !!(orderData.transportType && orderData.urgency)
      case 4:
        return !!(orderData.contactName && orderData.contactPhone && orderData.contactEmail)
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Point de collecte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Adresse</Label>
                    <Input
                      id="pickupAddress"
                      placeholder="123 Rue de la République"
                      value={orderData.pickupAddress}
                      onChange={(e) => updateOrderData("pickupAddress", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickupCity">Ville</Label>
                      <Input
                        id="pickupCity"
                        placeholder="Paris"
                        value={orderData.pickupCity}
                        onChange={(e) => updateOrderData("pickupCity", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupPostalCode">Code postal</Label>
                      <Input
                        id="pickupPostalCode"
                        placeholder="75001"
                        value={orderData.pickupPostalCode}
                        onChange={(e) => updateOrderData("pickupPostalCode", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Date</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={orderData.pickupDate}
                        onChange={(e) => updateOrderData("pickupDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupTime">Heure</Label>
                      <Input
                        id="pickupTime"
                        type="time"
                        value={orderData.pickupTime}
                        onChange={(e) => updateOrderData("pickupTime", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-accent" />
                    Point de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Adresse</Label>
                    <Input
                      id="deliveryAddress"
                      placeholder="456 Avenue des Champs"
                      value={orderData.deliveryAddress}
                      onChange={(e) => updateOrderData("deliveryAddress", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryCity">Ville</Label>
                      <Input
                        id="deliveryCity"
                        placeholder="Lyon"
                        value={orderData.deliveryCity}
                        onChange={(e) => updateOrderData("deliveryCity", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryPostalCode">Code postal</Label>
                      <Input
                        id="deliveryPostalCode"
                        placeholder="69001"
                        value={orderData.deliveryPostalCode}
                        onChange={(e) => updateOrderData("deliveryPostalCode", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Date</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={orderData.deliveryDate}
                        onChange={(e) => updateOrderData("deliveryDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime">Heure</Label>
                      <Input
                        id="deliveryTime"
                        type="time"
                        value={orderData.deliveryTime}
                        onChange={(e) => updateOrderData("deliveryTime", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Informations sur la marchandise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cargoType">Type de marchandise</Label>
                    <Select value={orderData.cargoType} onValueChange={(value) => updateOrderData("cargoType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Électronique</SelectItem>
                        <SelectItem value="food">Alimentaire</SelectItem>
                        <SelectItem value="textile">Textile</SelectItem>
                        <SelectItem value="furniture">Mobilier</SelectItem>
                        <SelectItem value="chemical">Chimique</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantité</Label>
                    <Input
                      id="quantity"
                      placeholder="ex: 10 cartons"
                      value={orderData.quantity}
                      onChange={(e) => updateOrderData("quantity", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargoDescription">Description détaillée</Label>
                  <Textarea
                    id="cargoDescription"
                    placeholder="Décrivez votre marchandise..."
                    rows={3}
                    value={orderData.cargoDescription}
                    onChange={(e) => updateOrderData("cargoDescription", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids total (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="ex: 150"
                      value={orderData.weight}
                      onChange={(e) => updateOrderData("weight", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (L x l x h)</Label>
                    <Input
                      id="dimensions"
                      placeholder="ex: 120x80x60 cm"
                      value={orderData.dimensions}
                      onChange={(e) => updateOrderData("dimensions", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fragile"
                      checked={orderData.fragile}
                      onCheckedChange={(checked) => updateOrderData("fragile", checked as boolean)}
                    />
                    <Label htmlFor="fragile" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Marchandise fragile
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dangerous"
                      checked={orderData.dangerous}
                      onCheckedChange={(checked) => updateOrderData("dangerous", checked as boolean)}
                    />
                    <Label htmlFor="dangerous" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Matières dangereuses
                    </Label>
                  </div>
                </div>

                {orderData.dangerous && (
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Conditions de température</Label>
                    <Select
                      value={orderData.temperature}
                      onValueChange={(value) => updateOrderData("temperature", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambient">Température ambiante</SelectItem>
                        <SelectItem value="refrigerated">Réfrigéré (2-8°C)</SelectItem>
                        <SelectItem value="frozen">Congelé (-18°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Options de transport
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transportType">Type de véhicule</Label>
                    <Select
                      value={orderData.transportType}
                      onValueChange={(value) => updateOrderData("transportType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le véhicule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="van">Fourgonnette (jusqu'à 1T)</SelectItem>
                        <SelectItem value="truck">Camion (1-3T)</SelectItem>
                        <SelectItem value="semi">Semi-remorque (3T+)</SelectItem>
                        <SelectItem value="refrigerated">Camion frigorifique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgence</Label>
                    <Select value={orderData.urgency} onValueChange={(value) => updateOrderData("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Niveau d'urgence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (3-5 jours)</SelectItem>
                        <SelectItem value="express">Express (24-48h)</SelectItem>
                        <SelectItem value="urgent">Urgent (même jour)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insurance"
                    checked={orderData.insurance}
                    onCheckedChange={(checked) => updateOrderData("insurance", checked as boolean)}
                  />
                  <Label htmlFor="insurance">Assurance transport (recommandée)</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">Instructions spéciales</Label>
                  <Textarea
                    id="specialInstructions"
                    placeholder="Instructions particulières pour le transporteur..."
                    rows={3}
                    value={orderData.specialInstructions}
                    onChange={(e) => updateOrderData("specialInstructions", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Contact et finalisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nom du contact</Label>
                    <Input
                      id="contactName"
                      placeholder="Jean Dupont"
                      value={orderData.contactName}
                      onChange={(e) => updateOrderData("contactName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Téléphone</Label>
                    <Input
                      id="contactPhone"
                      placeholder="06 12 34 56 78"
                      value={orderData.contactPhone}
                      onChange={(e) => updateOrderData("contactPhone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="contact@entreprise.com"
                    value={orderData.contactEmail}
                    onChange={(e) => updateOrderData("contactEmail", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedBudget">Budget estimé (optionnel)</Label>
                  <Input
                    id="estimatedBudget"
                    placeholder="ex: 500€"
                    value={orderData.estimatedBudget}
                    onChange={(e) => updateOrderData("estimatedBudget", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Trajet</h4>
                    <p className="text-sm text-muted-foreground">
                      {orderData.pickupCity} → {orderData.deliveryCity}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Marchandise</h4>
                    <p className="text-sm text-muted-foreground">
                      {orderData.cargoType} - {orderData.weight}kg
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {orderData.fragile && <Badge variant="destructive">Fragile</Badge>}
                  {orderData.dangerous && <Badge variant="destructive">Dangereux</Badge>}
                  {orderData.insurance && <Badge variant="secondary">Assuré</Badge>}
                  <Badge variant="outline">{orderData.urgency}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Nouvelle demande de transport</h1>
        <p className="text-muted-foreground">Créez votre demande de transport en quelques étapes simples</p>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                          ? "border-primary text-primary"
                          : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${isCompleted ? "bg-primary" : "bg-muted-foreground"}`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mb-2" />
          <div className="text-center">
            <h3 className="font-medium">{steps[currentStep - 1]?.title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1]?.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Précédent
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={nextStep} disabled={!isStepValid(currentStep)}>
            Suivant
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!isStepValid(currentStep) || isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Créer la demande"}
          </Button>
        )}
      </div>
    </div>
  )
}
