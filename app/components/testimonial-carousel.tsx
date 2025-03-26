"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export default function TestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Buyer",
      content:
        "As a buyer, I love how easy it is to find exactly what I'm looking for. The search functionality is incredible!",
    },
    {
      name: "Michael Chen",
      role: "Seller",
      content:
        "The seller analytics have helped me understand my customers better and grow my online business.",
    },
    {
      name: "Emily Rodriguez",
      role: "Regular User",
      content:
        "The payment system is so secure and fast. I never worry about my transactions on 0XBUY.",
    },
    {
      name: "David Wilson",
      role: "Premium Seller",
      content:
        "Since upgrading to Premium, my sales have increased by 15x! The extra visibility is worth every penny.",
    },
    {
      name: "Jessica Patel",
      role: "New User",
      content:
        "I was skeptical at first, but the local marketplace feature helped me find exactly what I needed just a few blocks away!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const handlePrevious = () => {
    if (isAnimating) return;
    setDirection("left");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setDirection("right");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [isAnimating, testimonials.length]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? "right" : "left");
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  // Reset animation state after transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the CSS transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg border bg-background p-6 shadow-sm min-h-[250px]">
        <div
          className={cn(
            "space-y-4 transition-all duration-500 ease-in-out",
            isAnimating &&
              direction === "right" &&
              "translate-x-[-10px] opacity-0",
            isAnimating &&
              direction === "left" &&
              "translate-x-[10px] opacity-0"
          )}
        >
          <div className="flex items-center">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-primary text-primary transition-transform hover:scale-110"
                />
              ))}
          </div>
          <p className="text-lg text-muted-foreground">
            &quot;{testimonials[currentIndex].content}&quot;
          </p>
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full transition-transform hover:scale-105">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt={testimonials[currentIndex].name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{testimonials[currentIndex].name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
          disabled={isAnimating}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
