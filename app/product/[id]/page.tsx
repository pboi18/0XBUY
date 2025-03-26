"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  MapPin,
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Truck,
  Calendar,
  Shield,
  User,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "../../components/theme-toggle"

// Sample product data
const product = {
  id: 1,
  title: "Vintage Film Camera",
  price: 149.99,
  condition: "Used - Excellent",
  location: "Brooklyn, NY",
  seller: {
    name: "CameraCollector",
    rating: 4.8,
    sales: 127,
    joined: "March 2020",
    responseTime: "Usually responds within 1 hour",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  description:
    "Classic film camera from the 1970s in excellent working condition. This vintage camera has been well-maintained and produces beautiful film photographs. The lens is clear with no scratches, and all mechanical parts function smoothly. Comes with the original leather case and strap.",
  specifications: [
    { name: "Brand", value: "Canon" },
    { name: "Model", value: "AE-1" },
    { name: "Year", value: "1976" },
    { name: "Film Type", value: "35mm" },
    { name: "Lens", value: "50mm f/1.8" },
    { name: "Shutter Speed", value: "1/1000 to 2 sec" },
    { name: "Condition", value: "Excellent - Fully functional" },
  ],
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  reviews: [
    {
      user: "PhotoEnthusiast",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "February 15, 2023",
      comment:
        "Amazing seller! The camera was exactly as described and shipping was fast. Very happy with my purchase.",
    },
    {
      user: "FilmLover",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "January 3, 2023",
      comment:
        "Good transaction overall. Camera works perfectly. Shipping took a bit longer than expected, but seller was communicative.",
    },
    {
      user: "VintageCollector",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "December 12, 2022",
      comment:
        "Excellent condition as promised. Seller was very knowledgeable and answered all my questions. Would buy from again!",
    },
  ],
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="mb-4 flex justify-between items-center">
        <Link
          href="/search"
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to search results
        </Link>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border aspect-square bg-muted">
            <Image
              src={product.images[currentImageIndex] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentImageIndex ? "border-primary" : "border-transparent hover:border-primary/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.seller.rating}</span>
                <span className="mx-1 text-muted-foreground">•</span>
                <span className="text-muted-foreground">{product.seller.sales} sales</span>
              </div>
              <div className="flex items-center ml-4 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {product.location}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
              <Badge variant="outline" className="mt-1">
                {product.condition}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`transition-colors ${isFavorite ? "text-red-500 hover:text-red-600" : ""}`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                <span className="sr-only">Add to favorites</span>
              </Button>
              <Button variant="outline" size="icon" className="transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button className="flex-1 gap-2 transition-transform hover:scale-105">
                <MessageCircle className="h-4 w-4" />
                Contact Seller
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <Truck className="h-4 w-4" />
                    Order Delivery
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Order Delivery</SheetTitle>
                    <SheetDescription>Complete your purchase with delivery</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="rounded-lg border p-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded overflow-hidden bg-muted">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{product.title}</h3>
                          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Delivery Options</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="standard"
                              name="delivery"
                              defaultChecked
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="standard" className="flex justify-between w-full">
                              <span>Standard Shipping (3-5 days)</span>
                              <span className="font-medium">$8.99</span>
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="express"
                              name="delivery"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="express" className="flex justify-between w-full">
                              <span>Express Shipping (1-2 days)</span>
                              <span className="font-medium">$14.99</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Order Summary</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Item Price</span>
                            <span>${product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$8.99</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${(product.price * 0.08).toFixed(2)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${(product.price + 8.99 + product.price * 0.08).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-4 transition-transform hover:scale-105">Proceed to Checkout</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Listed 2 days ago</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Buyer Protection</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{product.seller.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  <span>Member since {product.seller.joined}</span>
                </div>
              </div>
              <div className="ml-auto flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.seller.rating}</span>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{product.seller.responseTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="description">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="description" className="transition-all">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="transition-all">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="shipping" className="transition-all">
              Shipping
            </TabsTrigger>
            <TabsTrigger value="reviews" className="transition-all">
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between p-2 border-b">
                  <span className="font-medium">{spec.name}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Shipping Options</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">3-5 business days</p>
                    </div>
                    <p className="font-medium">$8.99</p>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-muted-foreground">1-2 business days</p>
                    </div>
                    <p className="font-medium">$14.99</p>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <div>
                      <p className="font-medium">Local Pickup</p>
                      <p className="text-sm text-muted-foreground">Brooklyn, NY</p>
                    </div>
                    <p className="font-medium">Free</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Shipping Policies</h3>
                <Accordion type="single" collapsible>
                  <AccordionItem value="returns">
                    <AccordionTrigger>Returns & Refunds</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        This seller accepts returns within 7 days of delivery. Buyer is responsible for return shipping
                        costs unless the item was misrepresented.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="international">
                    <AccordionTrigger>International Shipping</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        This seller ships internationally. Additional shipping costs and import duties may apply.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="insurance">
                    <AccordionTrigger>Shipping Insurance</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        All items are shipped with insurance. In case of damage during transit, please contact the
                        seller immediately with photos of the damaged item and packaging.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.round(product.seller.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                </div>
                <span className="font-medium text-lg">{product.seller.rating} out of 5</span>
                <span className="text-muted-foreground">({product.reviews.length} reviews)</span>
              </div>
              <Button variant="outline" className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground">
                Write a Review
              </Button>
            </div>

            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={review.avatar} alt={review.user} />
                      <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{review.user}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{review.date}</span>
                      </div>
                    </div>
                    <div className="ml-auto flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="mt-3 text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Items */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Similar Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Link href={`/product/${item + 1}`} key={item} className="group">
              <div className="rounded-lg border overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
                <div className="relative h-40 w-full bg-muted">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt="Similar product"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    Vintage Film Camera
                  </h3>
                  <p className="font-bold mt-1">${(Math.random() * 200 + 50).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

