import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, ShoppingBag, Star, CreditCard, Upload, MapPin, Phone, Mail, Edit, LogOut } from "lucide-react"
import { ThemeToggle } from "../components/theme-toggle"

export default function ProfilePage() {
  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/4">
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile picture"
                  fill
                  className="rounded-full object-cover border-4 border-background"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full bg-background transition-transform hover:scale-110"
                >
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Upload new picture</span>
                </Button>
              </div>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Member since March 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8/5 Buyer Rating</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
              <div className="flex justify-center mt-2">
                <ThemeToggle />
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Profile Content */}
        <div className="flex-1">
          <Tabs defaultValue="purchases" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="purchases" className="transition-all">
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Purchases</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="transition-all">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="feedback" className="transition-all">
                <Star className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Feedback</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="transition-all">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Payment</span>
              </TabsTrigger>
            </TabsList>

            {/* Purchase History Tab */}
            <TabsContent value="purchases" className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold">Purchase History</h2>
              <div className="space-y-4">
                {[
                  {
                    id: "ORD-12345",
                    date: "March 15, 2023",
                    product: "Vintage Camera",
                    price: "$149.99",
                    status: "Delivered",
                    statusColor: "text-green-600",
                  },
                  {
                    id: "ORD-12346",
                    date: "February 28, 2023",
                    product: "Mechanical Keyboard",
                    price: "$89.99",
                    status: "Delivered",
                    statusColor: "text-green-600",
                  },
                  {
                    id: "ORD-12347",
                    date: "January 15, 2023",
                    product: "Wireless Headphones",
                    price: "$129.99",
                    status: "Delivered",
                    statusColor: "text-green-600",
                  },
                ].map((order) => (
                  <Card key={order.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{order.product}</CardTitle>
                        <span className={`text-sm font-medium ${order.statusColor}`}>{order.status}</span>
                      </div>
                      <CardDescription>
                        Order #{order.id} • {order.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{order.price}</span>
                        <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Account Settings Tab */}
            <TabsContent value="settings" className="space-y-6 pt-4">
              <h2 className="text-2xl font-bold">Account Settings</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue="John Doe"
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      defaultValue="New York, USA"
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="space-y-2">
                  {[
                    "Email notifications for new messages",
                    "Email notifications for order updates",
                    "Email notifications for promotions and deals",
                    "SMS notifications for order updates",
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`pref-${i}`}
                        defaultChecked={i < 2}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={`pref-${i}`}>{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="transition-transform hover:scale-105">
                  Cancel
                </Button>
                <Button className="transition-transform hover:scale-105">Save Changes</Button>
              </div>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold">Feedback & Reviews</h2>
              <div className="space-y-4">
                {[
                  {
                    seller: "ElectronicsHub",
                    product: "Vintage Camera",
                    date: "March 20, 2023",
                    rating: 5,
                    comment: "Excellent seller! The camera was exactly as described and shipping was fast.",
                  },
                  {
                    seller: "KeyboardKing",
                    product: "Mechanical Keyboard",
                    date: "March 5, 2023",
                    rating: 4,
                    comment: "Good experience overall. The keyboard works great but arrived a day late.",
                  },
                ].map((review, i) => (
                  <Card key={i} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Review for {review.seller}</CardTitle>
                        <div className="flex">
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
                      <CardDescription>
                        {review.product} • {review.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold">Payment Methods</h2>

              <div className="space-y-4">
                <Card className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Credit Card</CardTitle>
                      <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                    </div>
                    <CardDescription>Visa ending in 4242</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Expires 04/25</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      Remove
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">PayPal</CardTitle>
                    <CardDescription>john.doe@example.com</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
                      Set as Default
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      Remove
                    </Button>
                  </CardFooter>
                </Card>

                <Button className="w-full gap-2 transition-transform hover:scale-105">
                  <CreditCard className="h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

