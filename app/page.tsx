"use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { auth, provider, signInWithPopup } from "../app/firebase";
// import { FaSignOutAlt } from "react-icons/fa"; // Import a sign-out icon
// import { collection, onSnapshot,query, where, getDocs, limit  } from "firebase/firestore";
// import { db } from "./firebase";
// import { onAuthStateChanged, signOut, type User } from "firebase/auth";
// import Image from "next/image";
// import {
//   Search,
//   ShoppingBag,
//   Zap,
//   Shield,
//   BarChart3,
//   ChevronRight,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Map,
//   Crown,
//   Cpu,
//   Shirt,
//   Home,
//   Sparkles,
//   BookOpen,
//   Car,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import TestimonialCarousel from "./components/testimonial-carousel";
// import { ThemeToggle } from "./components/theme-toggle";

// // Define product interface
// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   condition: string;
//   image?: string;
// }

// export default function LandingPage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);


//   useEffect(() => {
//     // Handle smooth scrolling for anchor links
//     const handleAnchorClick = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       const anchorElement = target.closest('a[href^="#"]');
//       if (!anchorElement) return;

//       e.preventDefault();
//       const id = anchorElement.getAttribute("href")?.slice(1);
//       if (!id) return;

//       const element = document.getElementById(id);
//       if (element) {
//         window.scrollTo({
//           top: element.offsetTop - 80, // Adjust for header height
//           behavior: "smooth",
//         });
//       }
//     };

//     document.addEventListener("click", handleAnchorClick);

//     return () => {
//       document.removeEventListener("click", handleAnchorClick);
//     };
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

// // Fetch suggestions as user types
// useEffect(() => {
//   if (searchTerm.trim() === '') {
//     setSuggestions([]);
//     return;
//   }

//   const fetchSuggestions = async () => {
//     setIsSearching(true);
//     try {
//       const productsRef = collection(db, 'products');
//       const q = query(
//         productsRef,
//         where('name', '>=', searchTerm),
//         where('name', '<=', searchTerm + '\uf8ff'),
//         limit(5) // Limit to 5 suggestions for performance
//       );

//       const querySnapshot = await getDocs(q);
//       const results = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));

//       setSuggestions(results);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       setSuggestions([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const timerId = setTimeout(() => {
//     fetchSuggestions();
//   }, 300); // Shorter debounce for suggestions

//   return () => clearTimeout(timerId);
// }, [searchTerm]);

// const handleSearch = async () => {
//   if (searchTerm.trim() === '') {
//     setSearchResults([]);
//     return;
//   }

//   setIsSearching(true);
//   try {
//     const productsRef = collection(db, 'products');
//     const q = query(
//       productsRef,
//       where('name', '>=', searchTerm),
//       where('name', '<=', searchTerm + '\uf8ff')
//     );

//     const querySnapshot = await getDocs(q);
//     const results = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     setSearchResults(results);
//   } catch (error) {
//     console.error('Error searching products:', error);
//     setSearchResults([]);
//   } finally {
//     setIsSearching(false);
//     setShowSuggestions(false); // Hide suggestions after search
//   }
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   handleSearch();
// };

// const handleSuggestionClick = (suggestion) => {
//   setSearchTerm(suggestion.name);
//   setShowSuggestions(false);
//   // Optionally trigger search immediately when suggestion is clicked
//   handleSearch();
// };



//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const currentUser = result.user;
//       const idToken = await currentUser.getIdToken();
//       console.log("Firebase ID Token:", idToken);
//       console.log("User signed in:", currentUser);
//     } catch (error) {
//       console.error("Error signing in with Google:", (error as Error).message);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       console.log("User signed out");
//     } catch (error) {
//       console.error("Error signing out:", (error as Error).message);
//     }
//   };

//   useEffect(() => {
//     // Reference to your Firestore collection
//     const productsRef = collection(db, "products"); // Replace 'products' with your collection name

//     // Set up real-time listener
//     const unsubscribe = onSnapshot(productsRef, (snapshot) => {
//       const productsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Product[];

//       setProducts(productsData);
//       setLoading(false);
//     });

//     // Clean up listener on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-2">
//             <ShoppingBag className="h-6 w-6 text-primary" />
//             <span className="text-xl font-bold">0XBUY</span>
//           </div>
//           <nav className="hidden md:flex items-center gap-6">
//             <Link
//               href="#categories"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               Categories
//             </Link>
//             <Link
//               href="#features"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               Features
//             </Link>
//             <Link
//               href="#testimonies"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               Testimonies
//             </Link>
//             <Link
//               href="#about"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               About
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <ThemeToggle />

//             {user ? (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm">{user.email}</span>
//                 <Button
//                   size="sm"
//                   className="transition-transform hover:scale-105"
//                   onClick={handleSignOut}
//                 >
//                   <FaSignOutAlt />
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 size="sm"
//                 className="transition-transform hover:scale-105"
//                 onClick={handleGoogleSignIn}
//               >
//                 Sign In
//               </Button>
//             )}
//           </div>
//         </div>
//       </header>

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
//               <div className="flex flex-col justify-center space-y-4 animate-fade-in">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                     The Next Generation Marketplace
//                   </h1>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                     Buy and sell with confidence on 0XBUY. The secure, fast, and
//                     user-friendly marketplace for everyone.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   {/* Only show "Get Started" if user is NOT authenticated */}
//                   {!user && (
//                     <Button
//                       size="lg"
//                       className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
//                     >
//                       Get Started <ChevronRight className="h-4 w-4" />
//                     </Button>
//                   )}

//                   {/* Sell Now button with orange hover effect */}
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="transition-all hover:scale-105 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
//                     asChild
//                   >
//                     <Link
//                       href={user ? "/dashboard/sell" : "/signin?redirect=/sell"}
//                     >
//                       Sell Now
//                     </Link>
//                   </Button>
//                 </div>
//               </div>

//               <div
//                 className="flex items-center justify-center animate-fade-in"
//                 style={{ animationDelay: "0.2s" }}
//               >
//                 <div className="w-full max-w-md space-y-4">
//                   {/* <div className="relative">
//                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       type="search"
//                       placeholder="Search for products..."
//                       className="w-full bg-background pl-8 rounded-lg border shadow-sm transition-all focus:ring-2 focus:ring-primary/50"
//                     />
//                   </div> */}
//                   <div className="relative">
//                     <form onSubmit={handleSubmit} className="relative mb-4">
//                       <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         type="search"
//                         placeholder="Search for products..."
//                         className="w-full bg-background pl-8 rounded-lg border shadow-sm transition-all focus:ring-2 focus:ring-primary/50"
//                         value={searchTerm}
//                         onChange={(e) => {
//                           setSearchTerm(e.target.value);
//                           setShowSuggestions(true);
//                         }}
//                         onFocus={() => setShowSuggestions(true)}
//                         onBlur={() =>
//                           setTimeout(() => setShowSuggestions(false), 200)
//                         }
//                         disabled={isSearching}
//                       />
//                     </form>

//                     {/* Suggestions dropdown */}
//                     {showSuggestions && suggestions.length > 0 && (
//                       <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
//                         <ul className="py-1">
//                           {suggestions.map((suggestion) => (
//                             <li
//                               key={suggestion.id}
//                               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                               onClick={() => handleSuggestionClick(suggestion)}
//                             >
//                               {suggestion.name}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {/* Search results */}
//                     {searchResults.length > 0 && (
//                       <div className="mt-8">
//                         <h3 className="text-lg font-semibold mb-2">
//                           Search Results
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           {searchResults.map((product) => (
//                             <div
//                               key={product.id}
//                               className="border p-4 rounded-lg"
//                             >
//                               <h4 className="font-medium">{product.name}</h4>
//                               {product.price && (
//                                 <p className="text-gray-600">
//                                   ${product.price.toFixed(2)}
//                                 </p>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     {loading ? (
//                       <div className="text-center py-4">
//                         Loading products...
//                       </div>
//                     ) : (
//                       <>
//                         {products.map((product) => (
//                           <div
//                             key={product.id}
//                             className="rounded-lg border bg-background p-4 shadow-sm transition-transform hover:scale-105"
//                           >
//                             {product.image ? (
//                               <Image
//                                 src={product.image || "/placeholder.svg"}
//                                 width={100}
//                                 height={100}
//                                 alt={product.title}
//                                 className="mx-auto h-24 w-24 rounded object-cover"
//                               />
//                             ) : (
//                               <div className="mx-auto h-24 w-24 rounded bg-gray-200 flex items-center justify-center">
//                                 <span className="text-xs text-gray-500">
//                                   No image
//                                 </span>
//                               </div>
//                             )}
//                             <h3 className="mt-2 text-sm font-medium truncate">
//                               {product.title}
//                             </h3>
//                             <p className="text-xs text-muted-foreground">
//                               ${product.price.toFixed(2)}
//                             </p>
//                             <p className="text-xs text-muted-foreground">
//                               {product.condition}
//                             </p>
//                           </div>
//                         ))}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Categories Section */}
//         <section id="categories" className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Browse Categories
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl">
//                   Discover thousands of items across our most popular categories
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-3">
//               {[
//                 {
//                   name: "Electronics",
//                   icon: <Cpu className="h-10 w-10 text-primary" />,
//                 },
//                 {
//                   name: "Fashion",
//                   icon: <Shirt className="h-10 w-10 text-primary" />,
//                 },
//                 {
//                   name: "Home",
//                   icon: <Home className="h-10 w-10 text-primary" />,
//                 },
//                 {
//                   name: "Beauty",
//                   icon: <Sparkles className="h-10 w-10 text-primary" />,
//                 },
//                 {
//                   name: "Books",
//                   icon: <BookOpen className="h-10 w-10 text-primary" />,
//                 },
//                 {
//                   name: "Automotive",
//                   icon: <Car className="h-10 w-10 text-primary" />,
//                 },
//               ].map((category, index) => (
//                 <div
//                   key={category.name}
//                   className="flex flex-col items-center space-y-2 transition-transform hover:scale-105"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted transition-all hover:bg-primary/10">
//                     {category.icon}
//                   </div>
//                   <h3 className="text-center font-medium">{category.name}</h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section
//           id="features"
//           className="w-full py-12 md:py-24 lg:py-32 bg-muted"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Key Features
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl">
//                   What makes 0XBUY the best marketplace platform
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
//               {[
//                 {
//                   icon: <Zap className="h-8 w-8 text-primary" />,
//                   title: "Lightning Fast",
//                   description:
//                     "Our platform is optimized for speed, ensuring quick transactions and seamless browsing.",
//                 },
//                 {
//                   icon: <Shield className="h-8 w-8 text-primary" />,
//                   title: "Secure Payments",
//                   description:
//                     "Advanced security measures to protect your transactions and personal information.",
//                 },
//                 {
//                   icon: <BarChart3 className="h-8 w-8 text-primary" />,
//                   title: "Seller Analytics",
//                   description:
//                     "Comprehensive analytics to help sellers understand their performance and grow their business.",
//                 },
//                 {
//                   icon: <ShoppingBag className="h-8 w-8 text-primary" />,
//                   title: "Buy and Sell with Ease",
//                   description:
//                     "Intuitive interface that makes listing items and purchasing products simple for everyone.",
//                 },
//                 {
//                   icon: <Map className="h-8 w-8 text-primary" />,
//                   title: "Local Marketplace",
//                   description:
//                     "Find people close to you who sell exactly what you want, making transactions more convenient.",
//                 },
//                 {
//                   icon: <Crown className="h-8 w-8 text-primary" />,
//                   title: "Premium Services",
//                   description:
//                     "Upgrade to Premium and get 15x more customers with enhanced visibility and promotional tools.",
//                 },
//               ].map((feature, index) => (
//                 <div
//                   key={feature.title}
//                   className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform hover:scale-110">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-bold">{feature.title}</h3>
//                   <p className="text-center text-muted-foreground">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section
//           id="testimonies"
//           className="w-full py-12 md:py-24 lg:py-32 bg-muted"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   What Our Users Say
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl">
//                   Don&apos;t just take our word for it - hear from our satisfied
//                   users
//                 </p>
//               </div>
//             </div>
//             <div className="py-12">
//               <TestimonialCarousel />
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Ready to Get Started?
//                 </h2>
//                 <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                   Join thousands of users already buying and selling on 0XBUY
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 {!user && (
//                   <Button
//                     size="lg"
//                     className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
//                   >
//                     Sign Up Now <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 )}

//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="transition-transform hover:scale-105"
//                   asChild
//                 >
//                   <Link href="/sell">Sell Now</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="w-full border-t bg-background py-6 md:py-12">
//         <div className="container px-4 md:px-6">
//           <div
//             id="about"
//             className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5"
//           >
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center gap-2">
//                 <ShoppingBag className="h-6 w-6 text-primary" />
//                 <span className="text-xl font-bold">0XBUY</span>
//               </div>
//               <p className="text-sm text-muted-foreground">
//                 The next generation marketplace for everyone.
//               </p>
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-lg font-medium">Company</h3>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 About
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Careers
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Press
//               </Link>
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-lg font-medium">Resources</h3>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Blog
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Documentation
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Help Center
//               </Link>
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-lg font-medium">Legal</h3>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Terms
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Privacy
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Cookies
//               </Link>
//             </div>
//             <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
//               <h3 className="text-lg font-medium">
//                 Subscribe to our newsletter
//               </h3>
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Enter your email"
//                   type="email"
//                   className="max-w-[220px] transition-all focus:ring-2 focus:ring-primary/50"
//                 />
//                 <Button
//                   type="submit"
//                   size="sm"
//                   className="transition-transform hover:scale-105"
//                 >
//                   Subscribe
//                 </Button>
//               </div>
//               <div className="flex items-center gap-4">
//                 {[
//                   { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
//                   { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
//                   {
//                     icon: <Instagram className="h-5 w-5" />,
//                     label: "Instagram",
//                   },
//                   { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
//                 ].map((social) => (
//                   <Link
//                     key={social.label}
//                     href="#"
//                     className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
//                   >
//                     {social.icon}
//                     <span className="sr-only">{social.label}</span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
//             <p className="text-center text-sm text-muted-foreground">
//               © {new Date().getFullYear()} 0XBUY. All rights reserved.
//             </p>
//             <div className="flex items-center gap-4">
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Terms of Service
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Search, ShoppingBag, ChevronRight, Cpu, Shirt, Home, Sparkles, BookOpen, Car, Zap, Shield, BarChart3, Map, Crown, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { db } from "./firebase";
import Link from 'next/link';
import Image from 'next/image';
import { auth, provider, signInWithPopup } from "../app/firebase";
import TestimonialCarousel from "./components/testimonial-carousel";
import { ThemeToggle } from "./components/theme-toggle";
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  
 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleSellNowClick = () => {
    if (user) {
      router.push('/sell');
    } else {
      setShowAuthDialog(true);
    }
  };

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
      setSearchResults([]);
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

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    handleSearch(suggestion.name);
  };

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

  const handleGoogleSellSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      const idToken = await currentUser.getIdToken();
      console.log("Firebase ID Token:", idToken);
      console.log("User signed in:", currentUser);
      setShowAuthDialog(false); // Close dialog on success
      router.push('/sell');
     // Only use router if component is mounted
     
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
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
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">{`${user.email.substring(
                  0,
                  4
                )}***${user.email.substring(user.email.indexOf("@"))}`}</span>
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
                    onClick={handleSellNowClick}
                  >
                    Sell Now
                  </Button>

                  <Dialog
                    open={showAuthDialog}
                    onOpenChange={setShowAuthDialog}
                  >
                    <DialogContent className="sm:max-w-[425px] rounded-lg">
                      <DialogHeader>
                        <div className="flex justify-center mb-4">
                          <ShoppingBag className="h-12 w-12 text-primary" />
                        </div>
                        <DialogTitle className="text-center text-2xl font-bold">
                          Join Our Marketplace
                        </DialogTitle>
                        <DialogDescription className="text-center mt-2">
                          Sign in to start selling your products to thousands of
                          buyers
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="space-y-2 text-center">
                          <p className="text-sm text-muted-foreground">
                            We just need a quick sign in to protect our
                            community
                          </p>
                        </div>

                        <Button
                          onClick={handleGoogleSellSignIn}
                          className="w-full py-6 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition-all"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <FaGoogle className="h-5 w-5" />
                            <span className="text-base font-medium">
                              Continue with Google
                            </span>
                          </div>
                        </Button>

                        <p className="text-xs text-center text-muted-foreground px-4">
                          By continuing, you agree to our Terms of Service and
                          Privacy Policy
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                  Don't just take our word for it - hear from our satisfied
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
                {!user && (
                  <Button
                    size="lg"
                    className="gap-1 animate-pulse-subtle transition-transform hover:scale-105"
                  >
                    Sign Up Now <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                 <Button
                    size="lg"
                    variant="outline"
                    className="transition-transform hover:scale-105"
                    onClick={() =>
                      user ? router.push('/sell')  : setShowAuthDialog(true)
                    }
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
    </div>
  );
}


// function ThemeToggle() {
//   return (
//     <Button variant="ghost" size="sm">
//       Toggle Theme
//     </Button>
//   );
// }