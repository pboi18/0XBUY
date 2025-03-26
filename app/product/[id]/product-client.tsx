"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Share2, Star } from "lucide-react";

export function ProductClient() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Use sample data for now
  const product = sampleProduct;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "aspect-square rounded-lg overflow-hidden border-2",
                  currentImageIndex === index
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                )}
              >
                <Image
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-2xl font-semibold text-primary mt-2">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className={cn(
                "rounded-full",
                isFavorite && "text-red-500 hover:text-red-600"
              )}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <Label className="text-muted-foreground capitalize">
                    {key}
                  </Label>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Seller Information</h2>
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {product.seller.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{product.seller.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.seller.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Member since</Label>
                  <p>{product.seller.joinDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Response rate</Label>
                  <p>{product.seller.responseRate}%</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Response time</Label>
                  <p>{product.seller.responseTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{review.user.name}</p>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {review.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample product data for development
const sampleProduct = {
  id: "1",
  title: "Vintage Film Camera",
  price: 299.99,
  condition: "Excellent",
  location: "San Francisco, CA",
  seller: {
    name: "John Doe",
    rating: 4.8,
    joinDate: "Jan 2023",
    responseRate: 98,
    responseTime: "Usually responds in 1 hour",
  },
  description:
    "A beautiful vintage film camera in excellent condition. Includes original leather case and manual. Perfect for collectors or photographers looking to experiment with film photography.",
  specifications: {
    category: "Cameras",
    brand: "Leica",
    model: "M3",
    year: "1954",
    condition: "Excellent",
    location: "San Francisco, CA",
  },
  images: [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ],
  reviews: [
    {
      id: "1",
      rating: 5,
      comment:
        "Exactly as described! The camera is in perfect condition and works beautifully.",
      user: {
        name: "Alice Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      date: "2 days ago",
    },
    {
      id: "2",
      rating: 4,
      comment:
        "Great seller, fast shipping. The camera is in good condition, just needed a minor adjustment.",
      user: {
        name: "Bob Johnson",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      date: "1 week ago",
    },
  ],
};
