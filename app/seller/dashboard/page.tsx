"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BarChart,
  LineChart,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  MessageCircle,
  Star,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "../../components/theme-toggle"

// Sample seller data
const sellerData = {
  name: "CameraCollector",
  avatar: "/placeholder.svg?height=40&width=40",
  stats: {
    revenue: 2549.99,
    orders: 17,
    views: 1243,
    rating: 4.8,
  },
  products: [
    {
      id: 1,
      title: "Vintage Film Camera",
      price: 149.99,
      image: "/placeholder.svg?height=100&width=100",
      status: "Active",
      views: 342,
      likes: 28,
      listed: "2 days ago",
    },
    {
      id: 2,
      title: "Polaroid SX-70 Camera",
      price: 199.99,
      image: "/placeholder.svg?height=100&width=100",
      status: "Active",
      views: 187,
      likes: 15,
      listed: "1 week ago",
    },
    {
      id: 3,
      title: "Vintage Lens Set",
      price: 89.99,
      image: "/placeholder.svg?height=100&width=100",
      status: "Sold",
      views: 203,
      likes: 19,
      listed: "3 weeks ago",
    },
    {
      id: 4,
      title: "Camera Tripod",
      price: 45.99,
      image: "/placeholder.svg?height=100&width=100",
      status: "Draft",
      views: 0,
      likes: 0,
      listed: "Not listed",
    },
  ],
  orders: [
    {
      id: "ORD-12345",
      product: "Vintage Lens Set",
      buyer: "PhotoEnthusiast",
      date: "March 10, 2023",
      price: 89.99,
      status: "Delivered",
    },
    {
      id: "ORD-12346",
      product: "Vintage Film Camera",
      buyer: "FilmLover",
      date: "March 5, 2023",
      price: 149.99,
      status: "Shipped",
    },
    {
      id: "ORD-12347",
      product: "Polaroid SX-70 Camera",
      buyer: "VintageCollector",
      date: "February 28, 2023",
      price: 199.99,
      status: "Processing",
    },
  ],
  messages: [
    {
      id: 1,
      user: "PhotoEnthusiast",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Is the vintage lens set still available?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      user: "FilmLover",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Thanks for shipping so quickly!",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 3,
      user: "CameraNewbie",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Would you take $130 for the film camera?",
      time: "2 days ago",
      unread: false,
    },
  ],
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8 animate-fade-in">
      {/* Seller Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={sellerData.avatar} alt={sellerData.name} />
            <AvatarFallback>{sellerData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{sellerData.name}'s Dashboard</h1>
            <p className="text-muted-foreground">Manage your products, orders, and analytics</p>
          </div>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 transition-transform hover:scale-105">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product listing to sell on 0XBUY</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter product title"
                    className="transition-all focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category" className="transition-all hover:border-primary">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="collectibles">Collectibles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select>
                    <SelectTrigger id="condition" className="transition-all hover:border-primary">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Used - Like New</SelectItem>
                      <SelectItem value="excellent">Used - Excellent</SelectItem>
                      <SelectItem value="good">Used - Good</SelectItem>
                      <SelectItem value="fair">Used - Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product in detail..."
                    className="min-h-[120px] transition-all focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag & drop images here or click to browse</p>
                      <p className="text-xs text-muted-foreground">(Up to 5 images, max 5MB each)</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="transition-colors">
                  Save as Draft
                </Button>
                <Button className="transition-transform hover:scale-105">Publish Listing</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only md:not-sr-only">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Seller Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Edit Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Store Settings</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Notification Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">Close Store</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview" className="transition-all">
            <BarChart className="h-4 w-4 mr-2 hidden sm:inline" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="transition-all">
            <Package className="h-4 w-4 mr-2 hidden sm:inline" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="transition-all">
            <ShoppingBag className="h-4 w-4 mr-2 hidden sm:inline" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="messages" className="transition-all">
            <MessageCircle className="h-4 w-4 mr-2 hidden sm:inline" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="analytics" className="transition-all">
            <LineChart className="h-4 w-4 mr-2 hidden sm:inline" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${sellerData.stats.revenue.toFixed(2)}</div>
                  <div className="p-2 bg-green-100 text-green-800 rounded-full">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-green-600 flex items-center mt-2">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{sellerData.stats.orders}</div>
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-full">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-green-600 flex items-center mt-2">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Product Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{sellerData.stats.views}</div>
                  <div className="p-2 bg-purple-100 text-purple-800 rounded-full">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-red-600 flex items-center mt-2">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  3% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Seller Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{sellerData.stats.rating}</div>
                  <div className="p-2 bg-yellow-100 text-yellow-800 rounded-full">
                    <Star className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex mt-2">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(sellerData.stats.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  <span className="text-xs text-muted-foreground ml-2">Based on 32 reviews</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your most recent sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sellerData.orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{order.product}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{order.buyer}</span>
                          <span className="mx-1">•</span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.price.toFixed(2)}</p>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                                ? "secondary"
                                : "outline"
                          }
                          className="mt-1"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full transition-all hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setActiveTab("orders")}
                >
                  View All Orders
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Your latest conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sellerData.messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                      <Avatar>
                        <AvatarImage src={message.avatar} alt={message.user} />
                        <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{message.user}</p>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                      </div>
                      {message.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full transition-all hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setActiveTab("messages")}
                >
                  View All Messages
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Your sales over the past 30 days</CardDescription>
                </div>
                <Select defaultValue="30days">
                  <SelectTrigger className="w-[180px] transition-all hover:border-primary">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Sales chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] transition-all hover:border-primary">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 transition-transform hover:scale-105">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Create a new product listing to sell on 0XBUY</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Product Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter product title"
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          className="transition-all focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger id="category" className="transition-all hover:border-primary">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="home">Home & Garden</SelectItem>
                            <SelectItem value="collectibles">Collectibles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select>
                        <SelectTrigger id="condition" className="transition-all hover:border-primary">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="like-new">Used - Like New</SelectItem>
                          <SelectItem value="excellent">Used - Excellent</SelectItem>
                          <SelectItem value="good">Used - Good</SelectItem>
                          <SelectItem value="fair">Used - Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your product in detail..."
                        className="min-h-[120px] transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Product Images</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center gap-2">
                          <Plus className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Drag & drop images here or click to browse</p>
                          <p className="text-xs text-muted-foreground">(Up to 5 images, max 5MB each)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="transition-colors">
                      Save as Draft
                    </Button>
                    <Button className="transition-transform hover:scale-105">Publish Listing</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerData.products.map((product) => (
              <Card key={product.id} className="transition-all hover:shadow-md">
                <div className="relative">
                  <div className="relative h-48 w-full bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Badge
                    variant={
                      product.status === "Active" ? "default" : product.status === "Sold" ? "secondary" : "outline"
                    }
                    className="absolute top-2 right-2"
                  >
                    {product.status}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{product.title}</CardTitle>
                  <CardDescription>${product.price.toFixed(2)}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{product.views} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      <span>{product.likes} likes</span>
                    </div>
                    <div>
                      <span>Listed {product.listed}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">Promote Listing</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Mark as Sold</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] transition-all hover:border-primary">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellerData.orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.buyer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Shipped"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Update Status</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Contact Buyer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="sm:w-1/3">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                {sellerData.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      message.id === 1 ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={message.avatar} alt={message.user} />
                      <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{message.user}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                    </div>
                    {message.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:w-2/3 border rounded-lg overflow-hidden">
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={sellerData.messages[0].avatar} alt={sellerData.messages[0].user} />
                    <AvatarFallback>{sellerData.messages[0].user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{sellerData.messages[0].user}</h3>
                    <p className="text-xs text-muted-foreground">Last active 30 minutes ago</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    View Profile
                  </Button>
                </div>
              </div>

              <div className="h-[400px] p-4 overflow-y-auto bg-muted/30">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-t-lg rounded-r-lg p-3 max-w-[80%]">
                      <p>Hi there! I'm interested in your vintage lens set. Is it still available?</p>
                      <span className="text-xs opacity-70 block text-right mt-1">2 hours ago</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-t-lg rounded-l-lg p-3 max-w-[80%]">
                      <p>Yes, it's still available! It's in excellent condition and includes 3 lenses.</p>
                      <span className="text-xs opacity-70 block text-right mt-1">1 hour ago</span>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-muted rounded-t-lg rounded-r-lg p-3 max-w-[80%]">
                      <p>Great! Would you be willing to meet in person so I can test them?</p>
                      <span className="text-xs opacity-70 block text-right mt-1">45 minutes ago</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-t-lg rounded-l-lg p-3 max-w-[80%]">
                      <p>Sure, I'm available this weekend. Where would you like to meet?</p>
                      <span className="text-xs opacity-70 block text-right mt-1">30 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="transition-all focus:ring-2 focus:ring-primary/50"
                  />
                  <Button className="gap-2 transition-transform hover:scale-105">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <h2 className="text-xl font-bold">Performance Analytics</h2>
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px] transition-all hover:border-primary">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Sales chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>How your products are performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Product performance chart would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[300px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Traffic sources chart would appear here</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Top Sources</h3>
                  <div className="space-y-2">
                    {[
                      { source: "Direct Search", percentage: 45, color: "bg-blue-500" },
                      { source: "Social Media", percentage: 30, color: "bg-purple-500" },
                      { source: "Marketplace Browse", percentage: 15, color: "bg-green-500" },
                      { source: "External Links", percentage: 10, color: "bg-yellow-500" },
                    ].map((source, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{source.source}</span>
                          <span className="font-medium">{source.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`${source.color} h-2 rounded-full`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

