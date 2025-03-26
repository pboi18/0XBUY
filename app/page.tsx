"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingBag,
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Shirt,
  Home,
  Sparkles,
  BookOpen,
  Car,
} from "lucide-react";

import TestimonialCarousel from "./components/testimonial-carousel";
import { ThemeToggle } from "./components/theme-toggle";

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  seller: {
    name: string;
    rating: number;
    joinDate: string;
    responseRate: number;
    responseTime: string;
  };
  description: string;
  specifications: {
    category: string;
    brand: string;
    model: string;
    year: string;
    condition: string;
    location: string;
  };
  images: string[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    user: {
      name: string;
      avatar: string;
    };
    date: string;
  }[];
}

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;

      e.preventDefault();
      const href = target.getAttribute("href");
      if (!href) return;

      const element = document.querySelector(href);
      if (!element) return;

      element.scrollIntoView({ behavior: "smooth" });
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual auth check
        const mockUser = {
          id: "1",
          email: "user@example.com",
          name: "John Doe",
          image: "https://i.pravatar.cc/150?img=1",
        };
        setUser(mockUser);
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // TODO: Replace with actual API call
        const mockFavorites: Product[] = [
          {
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
              "A beautiful vintage film camera in excellent condition.",
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
            ],
            reviews: [],
          },
        ];
        setFavorites(mockFavorites);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual Google sign-in
      const mockUser = {
        id: "1",
        email: "user@example.com",
        name: "John Doe",
        image: "https://i.pravatar.cc/150?img=1",
      };
      setUser(mockUser);
    } catch (err) {
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual sign-out
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  if (favorites.length === 0) {
    return <div className="text-center py-4">No favorites found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">0XBUY</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#categories"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Categories
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonies"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonies
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={handleGoogleSignIn}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="container py-12 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Your Trusted Marketplace for Everything Tech
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Buy and sell tech gadgets, vintage cameras, and more. Join our
                  community of tech enthusiasts today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {!user && (
                  <Button
                    size="lg"
                    className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
                    onClick={handleGoogleSignIn}
                  >
                    Get Started <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-transform hover:scale-105"
                  asChild
                >
                  <Link href="/sell">Sell Now</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full">
                <Image
                  alt="Hero"
                  className="object-cover"
                  height={600}
                  src="/hero-image.jpg"
                  style={{
                    aspectRatio: "600/600",
                    objectFit: "cover",
                  }}
                  width={600}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section id="categories" className="container py-12 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Browse by Category
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover a wide range of tech categories to suit your needs.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/category/computers"
                  className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <Cpu className="h-6 w-6" />
                    <h3 className="font-semibold">Computers</h3>
                  </div>
                </Link>
                <Link
                  href="/category/clothing"
                  className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <Shirt className="h-6 w-6" />
                    <h3 className="font-semibold">Clothing</h3>
                  </div>
                </Link>
                <Link
                  href="/category/home"
                  className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <Home className="h-6 w-6" />
                    <h3 className="font-semibold">Home</h3>
                  </div>
                </Link>
                <Link
                  href="/category/electronics"
                  className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <Sparkles className="h-6 w-6" />
                    <h3 className="font-semibold">Electronics</h3>
                  </div>
                </Link>
                <Link
                  href="/category/books"
                  className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <BookOpen className="h-6 w-6" />
                    <h3 className="font-semibold">Books</h3>
                  </div>
                </Link>
                <Link
                  href="/category/vehicles"
                  className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <Car className="h-6 w-6" />
                    <h3 className="font-semibold">Vehicles</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="container py-12 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose 0XBUY?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience the best features that make buying and selling
                  easier.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-lg border p-6">
                  <Zap className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Fast & Easy</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    List your items quickly and find what you need instantly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border p-6">
                  <Shield className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Secure Transactions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your payments and personal information are always protected.
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border p-6">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Market Insights</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get real-time data on market trends and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section id="testimonies" className="container py-12 md:py-24">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Don&apos;t just take our word for it
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                See what our community has to say about their experience.
              </p>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        {/* Search section */}
        <section className="container py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find What You Need
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Search through thousands of items in our marketplace.
              </p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search..." />
              <Button type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">0XBUY</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your trusted marketplace for everything tech.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Quick Links</p>
            <nav className="flex flex-col gap-2">
              <Link
                href="#categories"
                className="text-sm text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Categories
              </Link>
              <Link
                href="#features"
                className="text-sm text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Features
              </Link>
              <Link
                href="#testimonies"
                className="text-sm text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Testimonies
              </Link>
              <Link
                href="#about"
                className="text-sm text-gray-500 hover:text-primary dark:text-gray-400"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t">
          <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 0XBUY. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
