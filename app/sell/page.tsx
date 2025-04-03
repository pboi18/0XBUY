// "use client";

// import type React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   ChevronLeft,
//   Upload,
//   X,
//   Info,
//   MapPin,
//   Truck,
//   DollarSign,
//   Tag,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Separator } from "@/components/ui/separator";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { ThemeToggle } from "../components/theme-toggle";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// export default function SellPage() {
//   const router = useRouter();
//   const [images, setImages] = useState<string[]>([]);
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [condition, setCondition] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [currentTag, setCurrentTag] = useState("");
//   const [shippingOption, setShippingOption] = useState("both");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState("details");

//   // Mock function to add a placeholder image
//   const handleAddImage = () => {
//     if (images.length < 5) {
//       setImages([
//         ...images,
//         `/placeholder.svg?height=400&width=400&text=Image+${images.length + 1}`,
//       ]);
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleAddTag = () => {
//     if (currentTag && !tags.includes(currentTag) && tags.length < 5) {
//       setTags([...tags, currentTag]);
//       setCurrentTag("");
//     }
//   };

//   const handleRemoveTag = (tag: string) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && currentTag) {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       // Redirect to seller dashboard after successful submission
//       router.push("/seller/dashboard");
//     }, 1500);
//   };

//   const isFormValid =
//     title && price && category && condition && description && images.length > 0;

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               href="/"
//               className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
//             >
//               <ChevronLeft className="h-4 w-4" />
//               <span>Back to Home</span>
//             </Link>
//           </div>
//           <div className="flex items-center gap-4">
//             <ThemeToggle />
//           </div>
//         </div>
//       </header>

//       <main className="container py-8 animate-fade-in">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold">List Your Item</h1>
//             <p className="text-muted-foreground mt-2">
//               Fill out the details below to create your listing on 0XBUY
//             </p>
//           </div>

//           <Tabs
//             value={activeTab}
//             onValueChange={setActiveTab}
//             className="w-full"
//           >
//             <TabsList className="grid w-full grid-cols-3 mb-8">
//               <TabsTrigger value="details" className="transition-all">
//                 Product Details
//               </TabsTrigger>
//               <TabsTrigger value="images" className="transition-all">
//                 Images & Media
//               </TabsTrigger>
//               <TabsTrigger
//                 value="preview"
//                 className="transition-all"
//                 disabled={!isFormValid}
//               >
//                 Preview & Submit
//               </TabsTrigger>
//             </TabsList>

//             <form onSubmit={handleSubmit}>
//               {/* Product Details Tab */}
//               <TabsContent value="details" className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2 md:col-span-2">
//                     <Label htmlFor="title">
//                       Product Title <span className="text-destructive">*</span>
//                     </Label>
//                     <Input
//                       id="title"
//                       placeholder="Enter a descriptive title"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       className="transition-all focus:ring-2 focus:ring-primary/50"
//                       required
//                     />
//                     <p className="text-xs text-muted-foreground">
//                       A clear, detailed title helps buyers find your item (max
//                       80 characters)
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="price">
//                       Price <span className="text-destructive">*</span>
//                     </Label>
//                     <div className="relative">
//                       <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="price"
//                         type="number"
//                         placeholder="0.00"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
//                         min="0.01"
//                         step="0.01"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="category">
//                       Category <span className="text-destructive">*</span>
//                     </Label>
//                     <Select
//                       value={category}
//                       onValueChange={setCategory}
//                       required
//                     >
//                       <SelectTrigger
//                         id="category"
//                         className="transition-all hover:border-primary"
//                       >
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="electronics">Electronics</SelectItem>
//                         <SelectItem value="fashion">Fashion</SelectItem>
//                         <SelectItem value="home">Home & Garden</SelectItem>
//                         <SelectItem value="beauty">Beauty</SelectItem>
//                         <SelectItem value="books">Books</SelectItem>
//                         <SelectItem value="automotive">Automotive</SelectItem>
//                         <SelectItem value="collectibles">
//                           Collectibles
//                         </SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="condition">
//                       Condition <span className="text-destructive">*</span>
//                     </Label>
//                     <Select
//                       value={condition}
//                       onValueChange={setCondition}
//                       required
//                     >
//                       <SelectTrigger
//                         id="condition"
//                         className="transition-all hover:border-primary"
//                       >
//                         <SelectValue placeholder="Select condition" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="new">New</SelectItem>
//                         <SelectItem value="like-new">
//                           Used - Like New
//                         </SelectItem>
//                         <SelectItem value="excellent">
//                           Used - Excellent
//                         </SelectItem>
//                         <SelectItem value="good">Used - Good</SelectItem>
//                         <SelectItem value="fair">Used - Fair</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2 md:col-span-2">
//                     <Label htmlFor="description">
//                       Description <span className="text-destructive">*</span>
//                     </Label>
//                     <Textarea
//                       id="description"
//                       placeholder="Describe your item in detail..."
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       className="min-h-[150px] transition-all focus:ring-2 focus:ring-primary/50"
//                       required
//                     />
//                     <p className="text-xs text-muted-foreground">
//                       Include details about features, specifications,
//                       dimensions, condition, and any flaws or defects
//                     </p>
//                   </div>

//                   <div className="space-y-2 md:col-span-2">
//                     <div className="flex items-center justify-between">
//                       <Label htmlFor="tags">Tags (Optional)</Label>
//                       <span className="text-xs text-muted-foreground">
//                         {tags.length}/5
//                       </span>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="relative flex-1">
//                         <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           id="tags"
//                           placeholder="Add search keywords"
//                           value={currentTag}
//                           onChange={(e) => setCurrentTag(e.target.value)}
//                           onKeyDown={handleKeyDown}
//                           className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
//                           disabled={tags.length >= 5}
//                         />
//                       </div>
//                       <Button
//                         type="button"
//                         onClick={handleAddTag}
//                         disabled={!currentTag || tags.length >= 5}
//                         className="transition-transform hover:scale-105"
//                       >
//                         Add
//                       </Button>
//                     </div>
//                     {tags.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {tags.map((tag) => (
//                           <Badge
//                             key={tag}
//                             variant="secondary"
//                             className="flex items-center gap-1 px-3 py-1"
//                           >
//                             {tag}
//                             <X
//                               className="h-3 w-3 ml-1 cursor-pointer"
//                               onClick={() => handleRemoveTag(tag)}
//                             />
//                           </Badge>
//                         ))}
//                       </div>
//                     )}
//                     <p className="text-xs text-muted-foreground">
//                       Add relevant keywords to help buyers find your item
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="location">Location</Label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="location"
//                         placeholder="City, State"
//                         className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Shipping Options</Label>
//                     <RadioGroup
//                       defaultValue={shippingOption}
//                       onValueChange={setShippingOption}
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="shipping" id="shipping" />
//                         <Label htmlFor="shipping">Shipping Only</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="local" id="local" />
//                         <Label htmlFor="local">Local Pickup Only</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="both" id="both" />
//                         <Label htmlFor="both">Both Options</Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   <div className="md:col-span-2 pt-4">
//                     <Button
//                       type="button"
//                       onClick={() => setActiveTab("images")}
//                       className="w-full transition-transform hover:scale-105"
//                       disabled={
//                         !title ||
//                         !price ||
//                         !category ||
//                         !condition ||
//                         !description
//                       }
//                     >
//                       Continue to Images
//                     </Button>
//                   </div>
//                 </div>
//               </TabsContent>

//               {/* Images Tab */}
//               <TabsContent value="images" className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold">Product Images</h2>
//                     <span className="text-sm text-muted-foreground">
//                       {images.length}/5 images
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div
//                         onClick={handleAddImage}
//                         className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
//                           images.length >= 5
//                             ? "opacity-50 cursor-not-allowed"
//                             : ""
//                         }`}
//                       >
//                         <div className="flex flex-col items-center gap-2">
//                           <Upload className="h-8 w-8 text-muted-foreground" />
//                           <p className="font-medium">Upload Images</p>
//                           <p className="text-sm text-muted-foreground">
//                             Drag & drop or click to browse
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             (Max 5 images, 5MB each)
//                           </p>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-sm font-medium">
//                           Tips for great product photos:
//                         </p>
//                         <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
//                           <li>Use good lighting to show your item clearly</li>
//                           <li>Take photos from multiple angles</li>
//                           <li>Include close-ups of any details or flaws</li>
//                           <li>Use a neutral background</li>
//                           <li>Show the item&apos;s size/scale if relevant</li>
//                         </ul>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       {images.length > 0 ? (
//                         <div className="grid grid-cols-2 gap-4">
//                           {images.map((image, index) => (
//                             <div key={index} className="relative group">
//                               <div className="relative aspect-square rounded-md overflow-hidden border">
//                                 <Image
//                                   src={image || "/placeholder.svg"}
//                                   alt={`Product image ${index + 1}`}
//                                   fill
//                                   className="object-cover"
//                                 />
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => handleRemoveImage(index)}
//                                 className="absolute top-2 right-2 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                               >
//                                 <X className="h-4 w-4" />
//                               </button>
//                               {index === 0 && (
//                                 <Badge className="absolute bottom-2 left-2">
//                                   Main Image
//                                 </Badge>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="flex items-center justify-center h-full">
//                           <p className="text-muted-foreground text-center">
//                             No images added yet.
//                             <br />
//                             Add at least one image to continue.
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex justify-between pt-4">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => setActiveTab("details")}
//                       className="transition-colors"
//                     >
//                       Back to Details
//                     </Button>
//                     <Button
//                       type="button"
//                       onClick={() => setActiveTab("preview")}
//                       className="transition-transform hover:scale-105"
//                       disabled={images.length === 0}
//                     >
//                       Continue to Preview
//                     </Button>
//                   </div>
//                 </div>
//               </TabsContent>

//               {/* Preview Tab */}
//               <TabsContent value="preview" className="space-y-6">
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold">
//                       Preview Your Listing
//                     </h2>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button variant="outline" size="sm" className="gap-1">
//                             <Info className="h-4 w-4" />
//                             Preview Mode
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>This is how your listing will appear to buyers</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>

//                   <Card className="overflow-hidden">
//                     <div className="relative aspect-video md:aspect-auto md:h-[400px] bg-muted">
//                       {images.length > 0 ? (
//                         <Image
//                           src={images[0] || "/placeholder.svg"}
//                           alt={title || "Product image"}
//                           fill
//                           className="object-contain"
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center h-full">
//                           <p className="text-muted-foreground">
//                             No image available
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                     <CardContent className="p-6">
//                       <div className="space-y-4">
//                         <div>
//                           <h3 className="text-2xl font-bold">
//                             {title || "Product Title"}
//                           </h3>
//                           <p className="text-2xl font-bold text-primary mt-2">
//                             ${Number.parseFloat(price || "0").toFixed(2)}
//                           </p>
//                         </div>

//                         <div className="flex flex-wrap gap-2">
//                           {condition && (
//                             <Badge variant="outline">
//                               {condition.replace("-", " ")}
//                             </Badge>
//                           )}
//                           {category && (
//                             <Badge variant="outline">
//                               {category.charAt(0).toUpperCase() +
//                                 category.slice(1)}
//                             </Badge>
//                           )}
//                           {shippingOption === "shipping" && (
//                             <Badge
//                               variant="outline"
//                               className="flex items-center gap-1"
//                             >
//                               <Truck className="h-3 w-3" />
//                               Shipping
//                             </Badge>
//                           )}
//                           {shippingOption === "local" && (
//                             <Badge
//                               variant="outline"
//                               className="flex items-center gap-1"
//                             >
//                               <MapPin className="h-3 w-3" />
//                               Local Pickup
//                             </Badge>
//                           )}
//                           {shippingOption === "both" && (
//                             <Badge
//                               variant="outline"
//                               className="flex items-center gap-1"
//                             >
//                               <Truck className="h-3 w-3" />
//                               Shipping & Pickup
//                             </Badge>
//                           )}
//                         </div>

//                         <Separator />

//                         <div>
//                           <h4 className="font-medium mb-2">Description</h4>
//                           <p className="text-muted-foreground whitespace-pre-line">
//                             {description || "No description provided."}
//                           </p>
//                         </div>

//                         {tags.length > 0 && (
//                           <div>
//                             <h4 className="font-medium mb-2">Tags</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {tags.map((tag) => (
//                                 <Badge key={tag} variant="secondary">
//                                   {tag}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <div className="space-y-4 pt-4">
//                     <div className="flex items-center space-x-2">
//                       <Switch id="terms" required />
//                       <Label htmlFor="terms" className="text-sm">
//                         I agree to the 0XBUY{" "}
//                         <Link href="#" className="text-primary hover:underline">
//                           Terms of Service
//                         </Link>{" "}
//                         and{" "}
//                         <Link href="#" className="text-primary hover:underline">
//                           Seller Guidelines
//                         </Link>
//                       </Label>
//                     </div>

//                     <div className="flex justify-between">
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => setActiveTab("images")}
//                         className="transition-colors"
//                       >
//                         Back to Images
//                       </Button>
//                       <Button
//                         type="submit"
//                         className="transition-transform hover:scale-105"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Publishing...
//                           </>
//                         ) : (
//                           "Publish Listing"
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </form>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Upload,
  X,
  Info,
  MapPin,
  Truck,
  DollarSign,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "../components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../authContext";
import { getAuth } from "firebase/auth";

export default function SellPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [location, setLocation] = useState("");
  const [shippingOption, setShippingOption] = useState("both");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5 - images.length);
      setImages([...images, ...files]);

      // Create previews for the new images
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag) {
      e.preventDefault();
      handleAddTag();
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setError(null);

  //   try {
  //     if (!user) {
  //       throw new Error("You must be logged in to create a listing");
  //     }

  //     // Upload images to Firebase Storage
  //     const imageUrls = await Promise.all(
  //       images.map(async (image) => {
  //         const storageRef = ref(storage, `products/${uuidv4()}`);
  //         await uploadBytes(storageRef, image);
  //         return await getDownloadURL(storageRef);
  //       })
  //     );

  //     // Create product document in Firestore
  //     const productData = {
  //       title,
  //       price: parseFloat(price),
  //       category,
  //       condition,
  //       description,
  //       tags,
  //       location,
  //       shippingOption,
  //       images: imageUrls,
  //       seller: {
  //         id: user.uid,
  //         name: user.displayName || "Anonymous",
  //         email: user.email,
  //       },
  //       createdAt: serverTimestamp(),
  //       updatedAt: serverTimestamp(),
  //       status: "active",
  //       keywords: [
  //         title.toLowerCase(),
  //         ...tags.map(tag => tag.toLowerCase()),
  //         category.toLowerCase(),
  //         condition.toLowerCase().replace("-", " ")
  //       ]
  //     };

  //     const docRef = await addDoc(collection(db, "products"), productData);
      
  //     // Redirect to the new product page or seller dashboard
  //     router.push(`/product/${docRef.id}`);
  //   } catch (err) {
  //     console.error("Error creating listing:", err);
  //     setError(err.message || "Failed to create listing. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    try {
      if (!currentUser) {
        throw new Error("You must be logged in to create a listing");
      }
  
      console.log("User UID:", currentUser.uid);
      console.log("User email:", currentUser.email);
  
      // Upload images
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `products/${uuidv4()}`);
          await uploadBytes(storageRef, image);
          return await getDownloadURL(storageRef);
        })
      );
  
      // Create product data
      const productData = {
        title,
        price: parseFloat(price),
        category,
        condition,
        description,
        tags,
        location,
        shippingOption,
        images: imageUrls,
        seller: {
          id: currentUser.uid,
          name: currentUser.displayName || "Anonymous",
          email: currentUser.email,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "active",
        keywords: [
          title.toLowerCase(),
          ...tags.map(tag => tag.toLowerCase()),
          category.toLowerCase(),
          condition.toLowerCase().replace("-", " ")
        ]
      };
  
      const docRef = await addDoc(collection(db, "products"), productData);
      router.push(`/product/${docRef.id}`);
  
    } catch (err) {
      console.error("Error creating listing:", err);
      setError(err instanceof Error ? err.message : "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    title && price && category && condition && description && images.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">List Your Item</h1>
            <p className="text-muted-foreground mt-2">
              Fill out the details below to create your listing on 0XBUY
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
              {error}
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="details" className="transition-all">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="images" className="transition-all">
                Images & Media
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="transition-all"
                disabled={!isFormValid}
              >
                Preview & Submit
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              {/* Product Details Tab */}
              <TabsContent value="details" className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2 md:col-span-2">
                     <Label htmlFor="title">
                       Product Title <span className="text-destructive">*</span>
                     </Label>
                     <Input
                      id="title"
                      placeholder="Enter a descriptive title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      A clear, detailed title helps buyers find your item (max
                      80 characters)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
                        min="0.01"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      required
                    >
                      <SelectTrigger
                        id="category"
                        className="transition-all hover:border-primary"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="collectibles">
                          Collectibles
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">
                      Condition <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={condition}
                      onValueChange={setCondition}
                      required
                    >
                      <SelectTrigger
                        id="condition"
                        className="transition-all hover:border-primary"
                      >
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="like-new">
                          Used - Like New
                        </SelectItem>
                        <SelectItem value="excellent">
                          Used - Excellent
                        </SelectItem>
                        <SelectItem value="good">Used - Good</SelectItem>
                        <SelectItem value="fair">Used - Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">
                      Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[150px] transition-all focus:ring-2 focus:ring-primary/50"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Include details about features, specifications,
                      dimensions, condition, and any flaws or defects
                    </p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tags">Tags (Optional)</Label>
                      <span className="text-xs text-muted-foreground">
                        {tags.length}/5
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="tags"
                          placeholder="Add search keywords"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
                          disabled={tags.length >= 5}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!currentTag || tags.length >= 5}
                        className="transition-transform hover:scale-105"
                      >
                        Add
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            {tag}
                            <X
                              className="h-3 w-3 ml-1 cursor-pointer"
                              onClick={() => handleRemoveTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Add relevant keywords to help buyers find your item
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="City, State"
                        className="pl-10 transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Shipping Options</Label>
                    <RadioGroup
                      defaultValue={shippingOption}
                      onValueChange={setShippingOption}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="shipping" id="shipping" />
                        <Label htmlFor="shipping">Shipping Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="local" id="local" />
                        <Label htmlFor="local">Local Pickup Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both Options</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("images")}
                      className="w-full transition-transform hover:scale-105"
                      disabled={
                        !title ||
                        !price ||
                        !category ||
                        !condition ||
                        !description
                      }
                    >
                      Continue to Images
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Product Images</h2>
                    <span className="text-sm text-muted-foreground">
                      {images.length}/5 images
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label
                        htmlFor="image-upload"
                        className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                          images.length >= 5
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="font-medium">Upload Images</p>
                          <p className="text-sm text-muted-foreground">
                            Click to browse files
                          </p>
                          <p className="text-xs text-muted-foreground">
                            (Max 5 images, 5MB each)
                          </p>
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={images.length >= 5}
                        />
                      </label>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Tips for great product photos:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                          <li>Use good lighting to show your item clearly</li>
                          <li>Take photos from multiple angles</li>
                          <li>Include close-ups of any details or flaws</li>
                          <li>Use a neutral background</li>
                          <li>Show the item&apos;s size/scale if relevant</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <div className="relative aspect-square rounded-md overflow-hidden border">
                                <Image
                                  src={preview}
                                  alt={`Product image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  onLoad={() => URL.revokeObjectURL(preview)}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              {index === 0 && (
                                <Badge className="absolute bottom-2 left-2">
                                  Main Image
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground text-center">
                            No images added yet.
                            <br />
                            Add at least one image to continue.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("details")}
                      className="transition-colors"
                    >
                      Back to Details
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className="transition-transform hover:scale-105"
                      disabled={images.length === 0}
                    >
                      Continue to Preview
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      Preview Your Listing
                    </h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Info className="h-4 w-4" />
                            Preview Mode
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This is how your listing will appear to buyers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <Card className="overflow-hidden">
                    <div className="relative aspect-video md:aspect-auto md:h-[400px] bg-muted">
                      {imagePreviews.length > 0 ? (
                        <Image
                          src={imagePreviews[0]}
                          alt={title || "Product image"}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">
                            No image available
                          </p>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      {/* ... (keep the rest of the preview content the same) ... */}
                    </CardContent>
                  </Card>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the 0XBUY{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Seller Guidelines
                        </Link>
                      </Label>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab("images")}
                        className="transition-colors"
                      >
                        Back to Images
                      </Button>
                      <Button
                        type="submit"
                        className="transition-transform hover:scale-105"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Publishing...
                          </>
                        ) : (
                          "Publish Listing"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </div>
      </main>
    </div>
  );
}