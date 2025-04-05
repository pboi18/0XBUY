// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Search,
//   Filter,
//   Grid3X3,
//   List,
//   Star,
//   MapPin,
//   MessageCircle,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Slider } from "@/components/ui/slider";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { ThemeToggle } from "../components/theme-toggle";

// // Sample product data
// const products = [
//   {
//     id: 1,
//     title: "Vintage Film Camera",
//     price: 149.99,
//     condition: "Used - Excellent",
//     location: "Brooklyn, NY",
//     seller: "CameraCollector",
//     rating: 4.8,
//     image: "/placeholder.svg?height=200&width=200",
//     description:
//       "Classic film camera from the 1970s in excellent working condition.",
//   },
//   {
//     id: 2,
//     title: "Mechanical Keyboard - Cherry MX Blue",
//     price: 89.99,
//     condition: "Used - Good",
//     location: "Manhattan, NY",
//     seller: "KeyboardKing",
//     rating: 4.6,
//     image: "/placeholder.svg?height=200&width=200",
//     description:
//       "Mechanical keyboard with Cherry MX Blue switches. Tactile and clicky.",
//   },
//   {
//     id: 3,
//     title: "Wireless Noise-Cancelling Headphones",
//     price: 129.99,
//     condition: "New",
//     location: "Queens, NY",
//     seller: "AudioPhile",
//     rating: 4.9,
//     image: "/placeholder.svg?height=200&width=200",
//     description:
//       "Brand new wireless headphones with active noise cancellation.",
//   },
//   {
//     id: 4,
//     title: "Vintage Leather Jacket",
//     price: 199.99,
//     condition: "Used - Good",
//     location: "Bronx, NY",
//     seller: "VintageFashion",
//     rating: 4.7,
//     image: "/placeholder.svg?height=200&width=200",
//     description:
//       "Genuine leather jacket from the 80s. Some wear but in good condition.",
//   },
//   {
//     id: 5,
//     title: "Mountain Bike - 21 Speed",
//     price: 299.99,
//     condition: "Used - Excellent",
//     location: "Staten Island, NY",
//     seller: "BikeEnthusiast",
//     rating: 4.5,
//     image: "/placeholder.svg?height=200&width=200",
//     description:
//       "21-speed mountain bike, recently serviced and in excellent condition.",
//   },
//   {
//     id: 6,
//     title: "Antique Wooden Desk",
//     price: 249.99,
//     condition: "Used - Good",
//     location: "Brooklyn, NY",
//     seller: "FurnitureFinds",
//     rating: 4.8,
//     image: "/placeholder.svg?height=200&width=200",
//     description:
//       "Beautiful antique wooden desk with three drawers. Some patina but solid construction.",
//   },
// ];

// export default function SearchPage() {
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [priceRange, setPriceRange] = useState([0, 500]);
//   const [activeFilters, setActiveFilters] = useState<string[]>([]);
//   const [sortOption, setSortOption] = useState("relevance");

//   const addFilter = (filter: string) => {
//     if (!activeFilters.includes(filter)) {
//       setActiveFilters([...activeFilters, filter]);
//     }
//   };

//   const removeFilter = (filter: string) => {
//     setActiveFilters(activeFilters.filter((f) => f !== filter));
//   };

//   return (
//     <div className="container py-8 animate-fade-in">
//       {/* Search Header */}
//       <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
//         <div className="relative flex-1 w-full">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search for products..."
//             defaultValue="camera"
//             className="pl-10 transition-all focus:ring-2 focus:ring-primary/50 w-full"
//           />
//         </div>
//         <div className="flex items-center gap-2 w-full md:w-auto">
//           <ThemeToggle />
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
//               >
//                 <Filter className="h-4 w-4" />
//                 Filters
//               </Button>
//             </SheetTrigger>
//             <SheetContent className="w-full sm:max-w-md overflow-y-auto">
//               <SheetHeader className="mb-4">
//                 <SheetTitle>Filter Results</SheetTitle>
//                 <SheetDescription>
//                   Narrow down your search results
//                 </SheetDescription>
//               </SheetHeader>

//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium">Price Range</h3>
//                   <div className="px-2">
//                     <Slider
//                       defaultValue={[0, 500]}
//                       max={1000}
//                       step={10}
//                       value={priceRange}
//                       onValueChange={setPriceRange}
//                       className="my-6"
//                     />
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm">${priceRange[0]}</span>
//                       <span className="text-sm">${priceRange[1]}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <Separator />

//                 <Accordion
//                   type="multiple"
//                   defaultValue={["condition", "location"]}
//                 >
//                   <AccordionItem value="condition">
//                     <AccordionTrigger className="text-sm font-medium">
//                       Condition
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       <div className="space-y-2">
//                         {[
//                           "New",
//                           "Used - Like New",
//                           "Used - Excellent",
//                           "Used - Good",
//                           "Used - Fair",
//                         ].map((condition) => (
//                           <div
//                             key={condition}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`condition-${condition}`}
//                               onCheckedChange={(checked) => {
//                                 if (checked)
//                                   addFilter(`Condition: ${condition}`);
//                                 else removeFilter(`Condition: ${condition}`);
//                               }}
//                             />
//                             <Label htmlFor={`condition-${condition}`}>
//                               {condition}
//                             </Label>
//                           </div>
//                         ))}
//                       </div>
//                     </AccordionContent>
//                   </AccordionItem>

//                   <AccordionItem value="location">
//                     <AccordionTrigger className="text-sm font-medium">
//                       Location
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       <div className="space-y-2">
//                         {[
//                           "Manhattan, NY",
//                           "Brooklyn, NY",
//                           "Queens, NY",
//                           "Bronx, NY",
//                           "Staten Island, NY",
//                         ].map((location) => (
//                           <div
//                             key={location}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`location-${location}`}
//                               onCheckedChange={(checked) => {
//                                 if (checked) addFilter(`Location: ${location}`);
//                                 else removeFilter(`Location: ${location}`);
//                               }}
//                             />
//                             <Label htmlFor={`location-${location}`}>
//                               {location}
//                             </Label>
//                           </div>
//                         ))}
//                       </div>
//                     </AccordionContent>
//                   </AccordionItem>

//                   <AccordionItem value="category">
//                     <AccordionTrigger className="text-sm font-medium">
//                       Category
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       <div className="space-y-2">
//                         {[
//                           "Electronics",
//                           "Fashion",
//                           "Home",
//                           "Sports",
//                           "Collectibles",
//                           "Vehicles",
//                         ].map((category) => (
//                           <div
//                             key={category}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`category-${category}`}
//                               onCheckedChange={(checked) => {
//                                 if (checked) addFilter(`Category: ${category}`);
//                                 else removeFilter(`Category: ${category}`);
//                               }}
//                             />
//                             <Label htmlFor={`category-${category}`}>
//                               {category}
//                             </Label>
//                           </div>
//                         ))}
//                       </div>
//                     </AccordionContent>
//                   </AccordionItem>

//                   <AccordionItem value="seller-rating">
//                     <AccordionTrigger className="text-sm font-medium">
//                       Seller Rating
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       <div className="space-y-2">
//                         {[4, 3, 2, 1].map((rating) => (
//                           <div
//                             key={rating}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`rating-${rating}`}
//                               onCheckedChange={(checked) => {
//                                 if (checked)
//                                   addFilter(`Rating: ${rating}+ stars`);
//                                 else removeFilter(`Rating: ${rating}+ stars`);
//                               }}
//                             />
//                             <Label
//                               htmlFor={`rating-${rating}`}
//                               className="flex items-center"
//                             >
//                               {rating}+{" "}
//                               <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
//                             </Label>
//                           </div>
//                         ))}
//                       </div>
//                     </AccordionContent>
//                   </AccordionItem>
//                 </Accordion>

//                 <div className="flex justify-between pt-4">
//                   <Button
//                     variant="outline"
//                     onClick={() => setActiveFilters([])}
//                     className="transition-colors"
//                   >
//                     Clear All
//                   </Button>
//                   <Button className="transition-transform hover:scale-105">
//                     Apply Filters
//                   </Button>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>

//           <Select value={sortOption} onValueChange={setSortOption}>
//             <SelectTrigger className="w-[180px] transition-all hover:border-primary">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="relevance">Relevance</SelectItem>
//               <SelectItem value="price-low">Price: Low to High</SelectItem>
//               <SelectItem value="price-high">Price: High to Low</SelectItem>
//               <SelectItem value="rating">Highest Rated</SelectItem>
//               <SelectItem value="newest">Newest First</SelectItem>
//             </SelectContent>
//           </Select>

//           <div className="flex border rounded-md overflow-hidden">
//             <Button
//               variant={viewMode === "grid" ? "default" : "ghost"}
//               size="icon"
//               onClick={() => setViewMode("grid")}
//               className="rounded-none transition-colors"
//             >
//               <Grid3X3 className="h-4 w-4" />
//               <span className="sr-only">Grid view</span>
//             </Button>
//             <Button
//               variant={viewMode === "list" ? "default" : "ghost"}
//               size="icon"
//               onClick={() => setViewMode("list")}
//               className="rounded-none transition-colors"
//             >
//               <List className="h-4 w-4" />
//               <span className="sr-only">List view</span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Active Filters */}
//       {activeFilters.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-4">
//           {activeFilters.map((filter) => (
//             <Badge
//               key={filter}
//               variant="secondary"
//               className="flex items-center gap-1 px-3 py-1"
//             >
//               {filter}
//               <X
//                 className="h-3 w-3 ml-1 cursor-pointer"
//                 onClick={() => removeFilter(filter)}
//               />
//             </Badge>
//           ))}
//           <Button
//             variant="link"
//             size="sm"
//             onClick={() => setActiveFilters([])}
//             className="text-muted-foreground transition-colors hover:text-primary"
//           >
//             Clear All
//           </Button>
//         </div>
//       )}

//       {/* Search Results */}
//       <div className="mb-4">
//         <p className="text-muted-foreground">
//           Showing {products.length} results for &quot;camera&quot;
//         </p>
//       </div>

//       {viewMode === "grid" ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <Link
//               href={`/product/${product.id}`}
//               key={product.id}
//               className="group"
//             >
//               <div className="rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50 h-full flex flex-col">
//                 <div className="relative h-48 w-full bg-muted">
//                   <Image
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.title}
//                     fill
//                     className="object-cover transition-transform group-hover:scale-105"
//                   />
//                 </div>
//                 <div className="p-4 flex-1 flex flex-col">
//                   <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
//                     {product.title}
//                   </h3>
//                   <p className="text-lg font-bold mt-2">
//                     ${product.price.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     {product.condition}
//                   </p>
//                   <div className="flex items-center mt-2 text-sm text-muted-foreground">
//                     <MapPin className="h-3 w-3 mr-1" />
//                     {product.location}
//                   </div>
//                   <div className="flex items-center mt-1 text-sm">
//                     <span className="font-medium mr-1">{product.seller}</span>
//                     <div className="flex items-center">
//                       <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                       <span className="ml-1">{product.rating}</span>
//                     </div>
//                   </div>
//                   <div className="mt-auto pt-4">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="w-full gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
//                     >
//                       <MessageCircle className="h-4 w-4" />
//                       Contact Seller
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="rounded-lg border overflow-hidden transition-all hover:shadow-md hover:border-primary/50"
//             >
//               <div className="flex flex-col sm:flex-row">
//                 <div className="relative h-48 sm:h-auto sm:w-48 bg-muted">
//                   <Image
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.title}
//                     fill
//                     className="object-cover transition-transform hover:scale-105"
//                   />
//                 </div>
//                 <div className="p-4 flex-1">
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
//                     <div>
//                       <Link
//                         href={`/product/${product.id}`}
//                         className="hover:text-primary transition-colors"
//                       >
//                         <h3 className="font-medium">{product.title}</h3>
//                       </Link>
//                       <p className="text-lg font-bold mt-1">
//                         ${product.price.toFixed(2)}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {product.condition}
//                       </p>
//                     </div>
//                     <div className="flex flex-col items-start sm:items-end gap-1">
//                       <div className="flex items-center text-sm">
//                         <span className="font-medium mr-1">
//                           {product.seller}
//                         </span>
//                         <div className="flex items-center">
//                           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                           <span className="ml-1">{product.rating}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center text-sm text-muted-foreground">
//                         <MapPin className="h-3 w-3 mr-1" />
//                         {product.location}
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
//                     {product.description}
//                   </p>
//                   <div className="mt-4 flex justify-end">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
//                     >
//                       <MessageCircle className="h-4 w-4" />
//                       Contact Seller
//                     </Button>
//                     <Link href={`/product/${product.id}`}>
//                       <Button
//                         size="sm"
//                         className="ml-2 transition-transform hover:scale-105"
//                       >
//                         View Details
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-center mt-8">
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled
//             className="transition-colors"
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="w-8 h-8 p-0 bg-primary text-primary-foreground transition-colors"
//           >
//             1
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="w-8 h-8 p-0 transition-colors hover:bg-primary hover:text-primary-foreground"
//           >
//             2
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="w-8 h-8 p-0 transition-colors hover:bg-primary hover:text-primary-foreground"
//           >
//             3
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="transition-colors hover:bg-primary hover:text-primary-foreground"
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { ArrowLeft } from "lucide-react";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "../components/theme-toggle";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import { useSearchParams } from "next/navigation";
import { Product } from "../../app/product/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const router = useRouter(); // Initialize the router
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("relevance");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Base query for search
        let q = query(collection(db, "products"));

        // Add search query if exists
        if (searchQuery) {
          q = query(
            collection(db, "products"),
            where("keywords", "array-contains", searchQuery.toLowerCase())
          );
        }

        const querySnapshot = await getDocs(q);
        const productsData: Product[] = [];

        querySnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            ...doc.data(),
          } as Product);
        });

        setProducts(productsData);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 flex flex-col justify-center items-center h-screen">
        <div className="text-xl text-destructive mb-4">{error}</div>
        <Link href="/" className="text-primary hover:underline">
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => router.push("/")} // Navigate to the home page
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            defaultValue={searchQuery}
            className="pl-10 transition-all focus:ring-2 focus:ring-primary/50 w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="mb-4">
                <SheetTitle>Filter Results</SheetTitle>
                <SheetDescription>
                  Narrow down your search results
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 500]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <Accordion
                  type="multiple"
                  defaultValue={["condition", "location"]}
                >
                  <AccordionItem value="condition">
                    <AccordionTrigger className="text-sm font-medium">
                      Condition
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          "New",
                          "Used - Like New",
                          "Used - Excellent",
                          "Used - Good",
                          "Used - Fair",
                        ].map((condition) => (
                          <div
                            key={condition}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`condition-${condition}`}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  addFilter(`Condition: ${condition}`);
                                else removeFilter(`Condition: ${condition}`);
                              }}
                            />
                            <Label htmlFor={`condition-${condition}`}>
                              {condition}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="location">
                    <AccordionTrigger className="text-sm font-medium">
                      Location
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          "Manhattan, NY",
                          "Brooklyn, NY",
                          "Queens, NY",
                          "Bronx, NY",
                          "Staten Island, NY",
                        ].map((location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`location-${location}`}
                              onCheckedChange={(checked) => {
                                if (checked) addFilter(`Location: ${location}`);
                                else removeFilter(`Location: ${location}`);
                              }}
                            />
                            <Label htmlFor={`location-${location}`}>
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="category">
                    <AccordionTrigger className="text-sm font-medium">
                      Category
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          "Electronics",
                          "Fashion",
                          "Home",
                          "Sports",
                          "Collectibles",
                          "Vehicles",
                        ].map((category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`category-${category}`}
                              onCheckedChange={(checked) => {
                                if (checked) addFilter(`Category: ${category}`);
                                else removeFilter(`Category: ${category}`);
                              }}
                            />
                            <Label htmlFor={`category-${category}`}>
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="seller-rating">
                    <AccordionTrigger className="text-sm font-medium">
                      Seller Rating
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div
                            key={rating}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`rating-${rating}`}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  addFilter(`Rating: ${rating}+ stars`);
                                else removeFilter(`Rating: ${rating}+ stars`);
                              }}
                            />
                            <Label
                              htmlFor={`rating-${rating}`}
                              className="flex items-center"
                            >
                              {rating}+{" "}
                              <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveFilters([])}
                    className="transition-colors"
                  >
                    Clear All
                  </Button>
                  <Button className="transition-transform hover:scale-105">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px] transition-all hover:border-primary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-none transition-colors"
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-none transition-colors"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {filter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
          <Button
            variant="link"
            size="sm"
            onClick={() => setActiveFilters([])}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Search Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          Showing {products.length} results{" "}
          {searchQuery && `for "${searchQuery}"`}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No products found {searchQuery && `for "${searchQuery}"`}
          </p>
          <Link href="/">
            <Button variant="link" className="mt-4">
              Browse all products
            </Button>
          </Link>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50 h-full flex flex-col">
                <div className="relative h-48 w-full bg-muted">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.condition}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {product.location}
                  </div>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="font-medium mr-1">
                      {product.seller.name}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{product.seller.rating}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border overflow-hidden transition-all hover:shadow-md hover:border-primary/50"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-48 bg-muted">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <Link
                        href={`/product/${product.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        <h3 className="font-medium">{product.title}</h3>
                      </Link>
                      <p className="text-lg font-bold mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.condition}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-1">
                          {product.seller.name}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{product.seller.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contact Seller
                    </Button>
                    <Link href={`/product/${product.id}`}>
                      <Button
                        size="sm"
                        className="ml-2 transition-transform hover:scale-105"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="transition-colors"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 bg-primary text-primary-foreground transition-colors"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
