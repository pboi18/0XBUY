"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, provider, signInWithPopup } from "../app/firebase";
import { FaSignOutAlt } from "react-icons/fa"; // Import a sign-out icon
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Image from "next/image";
import {
  Search,
  ShoppingBag,
  Zap,
  Shield,
  BarChart3,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Map,
  Crown,
  Cpu,
  Shirt,
  Home,
  Sparkles,
  BookOpen,
  Car,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TestimonialCarousel from "./components/testimonial-carousel";
import { ThemeToggle } from "./components/theme-toggle";

// Define product interface
interface Product {
  id: string;
  title: string;
  price: number;
  condition: string;
  image?: string;
}

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorElement = target.closest('a[href^="#"]');
      if (!anchorElement) return;

      e.preventDefault();
      const id = anchorElement.getAttribute("href")?.slice(1);
      if (!id) return;

      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      const idToken = await currentUser.getIdToken();
      console.log("Firebase ID Token:", idToken);
      console.log("User signed in:", currentUser);
    } catch (error) {
      console.error("Error signing in with Google:", (error as Error).message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", (error as Error).message);
    }
  };

  useEffect(() => {
    // Reference to your Firestore collection
    const productsRef = collection(db, "products"); // Replace 'products' with your collection name

    // Set up real-time listener
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(productsData);
      setLoading(false);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-4">No products found</div>;
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
                <Button
                  size="sm"
                  className="transition-transform hover:scale-105"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="transition-transform hover:scale-105"
                onClick={handleGoogleSignIn}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Next Generation Marketplace
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Buy and sell with confidence on 0XBUY. The secure, fast, and
                    user-friendly marketplace for everyone.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {/* Only show "Get Started" if user is NOT authenticated */}
                  {!user && (
                    <Button
                      size="lg"
                      className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
                    >
                      Get Started <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}

                  {/* Sell Now button with orange hover effect */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="transition-all hover:scale-105 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                    asChild
                  >
                    <Link
                      href={user ? "/dashboard/sell" : "/signin?redirect=/sell"}
                    >
                      Sell Now
                    </Link>
                  </Button>
                </div>
              </div>

              <div
                className="flex items-center justify-center animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-full max-w-md space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search for products..."
                      className="w-full bg-background pl-8 rounded-lg border shadow-sm transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-lg border bg-background p-4 shadow-sm transition-transform hover:scale-105"
                      >
                        {product.image ? (
                          <Image
                            src={product.image || "/placeholder.svg"}
                            width={100}
                            height={100}
                            alt={product.title}
                            className="mx-auto h-24 w-24 rounded object-cover"
                          />
                        ) : (
                          <div className="mx-auto h-24 w-24 rounded bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              No image
                            </span>
                          </div>
                        )}
                        <h3 className="mt-2 text-sm font-medium truncate">
                          {product.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.condition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Browse Categories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Discover thousands of items across our most popular categories
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-3">
              {[
                {
                  name: "Electronics",
                  icon: <Cpu className="h-10 w-10 text-primary" />,
                },
                {
                  name: "Fashion",
                  icon: <Shirt className="h-10 w-10 text-primary" />,
                },
                {
                  name: "Home",
                  icon: <Home className="h-10 w-10 text-primary" />,
                },
                {
                  name: "Beauty",
                  icon: <Sparkles className="h-10 w-10 text-primary" />,
                },
                {
                  name: "Books",
                  icon: <BookOpen className="h-10 w-10 text-primary" />,
                },
                {
                  name: "Automotive",
                  icon: <Car className="h-10 w-10 text-primary" />,
                },
              ].map((category, index) => (
                <div
                  key={category.name}
                  className="flex flex-col items-center space-y-2 transition-transform hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted transition-all hover:bg-primary/10">
                    {category.icon}
                  </div>
                  <h3 className="text-center font-medium">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  What makes 0XBUY the best marketplace platform
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Zap className="h-8 w-8 text-primary" />,
                  title: "Lightning Fast",
                  description:
                    "Our platform is optimized for speed, ensuring quick transactions and seamless browsing.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Secure Payments",
                  description:
                    "Advanced security measures to protect your transactions and personal information.",
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-primary" />,
                  title: "Seller Analytics",
                  description:
                    "Comprehensive analytics to help sellers understand their performance and grow their business.",
                },
                {
                  icon: <ShoppingBag className="h-8 w-8 text-primary" />,
                  title: "Buy and Sell with Ease",
                  description:
                    "Intuitive interface that makes listing items and purchasing products simple for everyone.",
                },
                {
                  icon: <Map className="h-8 w-8 text-primary" />,
                  title: "Local Marketplace",
                  description:
                    "Find people close to you who sell exactly what you want, making transactions more convenient.",
                },
                {
                  icon: <Crown className="h-8 w-8 text-primary" />,
                  title: "Premium Services",
                  description:
                    "Upgrade to Premium and get 15x more customers with enhanced visibility and promotional tools.",
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonies"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Don&apos;t just take our word for it - hear from our satisfied
                  users
                </p>
              </div>
            </div>
            <div className="py-12">
              <TestimonialCarousel />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of users already buying and selling on 0XBUY
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
                >
                  Sign Up Now <ChevronRight className="h-4 w-4" />
                </Button>
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div
            id="about"
            className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">0XBUY</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The next generation marketplace for everyone.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Company</h3>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Press
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Resources</h3>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Legal</h3>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
            <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-medium">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="max-w-[220px] transition-all focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="transition-transform hover:scale-105"
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex items-center gap-4">
                {[
                  { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                  { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                  {
                    icon: <Instagram className="h-5 w-5" />,
                    label: "Instagram",
                  },
                  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} 0XBUY. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
