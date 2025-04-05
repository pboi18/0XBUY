"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  ChevronRight,
  Cpu,
  Shirt,
  Home,
  Sparkles,
  BookOpen,
  Car,
  Zap,
  Shield,
  BarChart3,
  Map,
  Crown,
  // LogOut,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
import { Button } from "@/components/ui/button";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "./firebase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./components/theme-toggle";
import MetaAccountPage from "./components/MetaAccountPage"; // Import MetaAccountPage
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Add DialogTitle

// type User = {
//   email: string;
//   key: string;
// };

type Suggestion = {
  id: string;
  name?: string;
  title?: string;
};

type Product = {
  id: string;
  title: string;
  price: number;
  images?: string[];
};
export default function LandingPage() {
  const [showMetaAccountModal, setShowMetaAccountModal] = useState(false); // State for MetaAccount modal
  const [userAddress, setUserAddress] = useState<string | null>(null); // State for Meta Account address
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  // const [setSearchResults] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [setShowSearchResults] = useState<boolean>(false);
  // const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleSignIn = () => {
    setShowMetaAccountModal(true); // Show the MetaAccount modal
  };
  // const handleMetaAccountSubmit = (address: string) => {
  //   setUserAddress(address); // Update user address
  //   setShowMetaAccountModal(false); // Hide the MetaAccount modal
  // };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const [, setIsReady] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    setIsReady(true);
  }, []);
  const {
    data: { bech32Address },
    isConnected,
  } = useAbstraxionAccount();

  useEffect(() => {
    if (isConnected && bech32Address) {
      setUserAddress(bech32Address); // Update the state when the user connects
    }
  }, [isConnected, bech32Address]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, limit(4));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
        setProducts(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsSearching(true);
      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("name", ">=", searchTerm),
          where("name", "<=", searchTerm + "\uf8ff"),
          limit(5)
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };
    const timerId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleSearch = async (searchValue = searchTerm) => {
    if (searchValue.trim() === "") {
      // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
      setSearchResults([]);
      // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("name", ">=", searchValue),
        where("name", "<=", searchValue + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
      setSearchResults(results);
      // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
      // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  }; // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  }; // @ts-expect-error: 'user' might be null or undefined, but we handle it appropriately

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    handleSearch(suggestion.name);
  };

  const handleSellNowClick = () => {
    if (userAddress) {
      router.push("/sell"); // Redirect to sell page if logged in
    } else {
      setShowMetaAccountModal(true); // Show the MetaAccount modal
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
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
            {/* Search Icon */}
            <Link
              href="/search"
              className="text-muted-foreground hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            {userAddress ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <div className="relative group cursor-pointer">
                    {/* Profile Circle */}
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[-60px]">
                      {userAddress.substring(0, 1).toUpperCase()}
                    </div>
                    {/* User Address Tooltip */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-medium text-primary bg-white px-2 py-1 rounded shadow-lg">
                      {userAddress.substring(0, 6)}...
                    </span>
                  </div>
                </Link>
                {/* <Button
                  size="sm"
                  className="transition-transform hover:scale-105"
                  onClick={() => setUserAddress(null)} // Log out
                >
                  <LogOut className="h-5 w-5" />
                </Button> */}
              </div>
            ) : (
              <Button
                size="sm"
                className="transition-transform hover:scale-105"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
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
                  {!userAddress && (
                    <Button
                      size="lg"
                      className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
                      onClick={handleSignIn}
                    >
                      Get Started <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    size="lg"
                    variant="outline"
                    className="transition-transform hover:scale-105"
                    onClick={handleSellNowClick}
                  >
                    Sell Now
                  </Button>
                </div>
              </div>
              <div
                className="flex items-center justify-center animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-full max-w-md space-y-4">
                  <div className="relative">
                    <form onSubmit={handleSubmit} className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full bg-background pl-8 rounded-lg border shadow-sm transition-all focus:ring-2 focus:ring-primary/50"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() =>
                          setTimeout(() => setShowSuggestions(false), 200)
                        }
                        disabled={isSearching}
                      />
                    </form>

                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <ul className="py-1">
                          {suggestions.map((suggestion) => (
                            <li
                              key={suggestion.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onMouseDown={() =>
                                handleSuggestionClick(suggestion)
                              }
                            >
                              {suggestion.title || suggestion.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {loading ? (
                      <div className="text-center py-4 col-span-2">
                        Loading products...
                      </div>
                    ) : (
                      products.map((product) => (
                        <Link
                          href={`/product/${product.id}`}
                          key={product.id}
                          passHref
                        >
                          <div className="rounded-lg border bg-background p-4 shadow-sm transition-transform hover:scale-105 cursor-pointer">
                            {product.images?.[0] ? (
                              <Image
                                src={product.images[0]}
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
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
          </div>
        </section>

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
                {!userAddress && (
                  <Button
                    size="lg"
                    className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
                    onClick={handleSignIn}
                  >
                    Sign Up Now <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-transform hover:scale-105"
                  onClick={handleSellNowClick}
                >
                  Sell Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
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

      {/* MetaAccount Modal */}
      <Dialog
        open={showMetaAccountModal}
        onOpenChange={setShowMetaAccountModal}
      >
        <DialogContent className="sm:max-w-[425px] max-h-[70vh] rounded-lg">
          <DialogTitle>Meta Account Login</DialogTitle> {/* Add DialogTitle */}
          <MetaAccountPage
            onClose={() => setShowMetaAccountModal(false)} // Close modal
            onLogin={(address: string) => {
              setUserAddress(address); // Set user address after login
              setShowMetaAccountModal(false); // Close modal
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
