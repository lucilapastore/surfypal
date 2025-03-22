"use client";

import type React from "react";

import { ListingCard } from "@/components/listings/listing-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useSurfyPalStore } from "@/lib/store";
import type { Listing, ListingData } from "@/types";
import { MiniKit } from "@worldcoin/minikit-js";
import { Loader2, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AMENITIES = [
  "Wifi",
  "Kitchen",
  "Air conditioning",
  "Heating",
  "TV",
  "Free parking",
  "Pool",
  "Coffee maker",
  "Workspace",
  "Fireplace",
  "Garden",
  "Unique experience",
];

// Add a function to trigger haptic feedback for successful creation
const sendSuccessHapticFeedback = () => {
  if (MiniKit.isInstalled()) {
    MiniKit.commands.sendHapticFeedback({
      hapticsType: "notification",
      style: "success",
    });
  }
};

export default function CreateListingPage() {
  const router = useRouter();
  const { currentUser, createListing, isLoading } = useSurfyPalStore();
  const [formData, setFormData] = useState<ListingData>({
    title: "",
    description: "",
    price: 100,
    images: [""],
    location: {
      city: "",
      country: "",
      address: "",
    },
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Kitchen"],
    minTrustScore: 50,
  });

  const [previewListing, setPreviewListing] = useState<Listing | null>(null);

  // Redirect if not logged in
  if (typeof window !== "undefined" && !currentUser) {
    router.push("/signin");
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof ListingData] as Record<string, any>),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNumberChange = (name: string, value: number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity),
      });
    }
  };

  const generatePreview = () => {
    if (!currentUser) return;

    // Create a preview listing
    const preview: Listing = {
      id: "preview",
      ...formData,
      host: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        trustScore: currentUser.trustScore,
      },
      rating: 0,
      reviewCount: 0,
      featured: false,
    };

    setPreviewListing(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newListing = await createListing(formData);
      console.log("Created new listing:", newListing);

      // Send haptic feedback for successful listing creation
      sendSuccessHapticFeedback();

      router.push(`/listings/${newListing.id}`);
    } catch (error) {
      console.error("Failed to create listing:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Create a New Listing
        </h1>
        <p className="text-muted-foreground">
          Share your space with travelers and earn from your property while
          building your Trust Score.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Basic Information</h2>

              <div className="grid gap-2">
                <Label htmlFor="title">Listing Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Cozy Apartment in Downtown"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your place, the neighborhood, and what makes it special..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Price per Night (USD)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={10}
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="text-sm text-muted-foreground">
                    ${formData.price}/night
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Location</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="location.city">City</Label>
                  <Input
                    id="location.city"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location.country">Country</Label>
                  <Input
                    id="location.country"
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location.address">Address</Label>
                <Input
                  id="location.address"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                  placeholder="Street address (only shown to confirmed guests)"
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Property Details</h2>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Capacity (Guests)</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">1</span>
                    <span className="text-sm text-muted-foreground">10+</span>
                  </div>
                  <Slider
                    value={[formData.capacity]}
                    min={1}
                    max={16}
                    step={1}
                    onValueChange={(value) =>
                      handleNumberChange("capacity", value[0])
                    }
                  />
                  <div className="text-center text-sm font-medium">
                    {formData.capacity}{" "}
                    {formData.capacity === 1 ? "guest" : "guests"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">1</span>
                    <span className="text-sm text-muted-foreground">5+</span>
                  </div>
                  <Slider
                    value={[formData.bedrooms]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) =>
                      handleNumberChange("bedrooms", value[0])
                    }
                  />
                  <div className="text-center text-sm font-medium">
                    {formData.bedrooms}{" "}
                    {formData.bedrooms === 1 ? "bedroom" : "bedrooms"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">1</span>
                    <span className="text-sm text-muted-foreground">5+</span>
                  </div>
                  <Slider
                    value={[formData.bathrooms]}
                    min={1}
                    max={10}
                    step={0.5}
                    onValueChange={(value) =>
                      handleNumberChange("bathrooms", value[0])
                    }
                  />
                  <div className="text-center text-sm font-medium">
                    {formData.bathrooms}{" "}
                    {formData.bathrooms === 1 ? "bathroom" : "bathrooms"}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Images</h2>
              <p className="text-sm text-muted-foreground">
                Add images of your property. You can provide URLs to existing
                images.
              </p>

              <div className="space-y-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    />
                    {index === 0 && (
                      <div className="text-xs text-muted-foreground flex items-center">
                        Main image
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageField}
                  className="mt-2"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Another Image
                </Button>
              </div>

              {formData.images[0] && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                  {formData.images.filter(Boolean).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-md border"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Property image ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg?height=200&width=200";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={(checked) =>
                        handleAmenityToggle(amenity, checked as boolean)
                      }
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Trust Score Requirements
              </h2>
              <div className="space-y-2">
                <Label>Minimum Trust Score for Booking</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">0</span>
                  <span className="text-sm text-muted-foreground">100</span>
                </div>
                <Slider
                  value={[formData.minTrustScore]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) =>
                    handleNumberChange("minTrustScore", value[0])
                  }
                />
                <div className="text-center text-sm font-medium">
                  {formData.minTrustScore} points minimum
                </div>
                <p className="text-xs text-muted-foreground">
                  Setting a higher minimum Trust Score can reduce booking risks
                  but may limit your potential guests.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={generatePreview}>
                Preview Listing
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Listing"
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="md:sticky md:top-20 self-start">
          <h2 className="mb-4 text-xl font-semibold">Listing Preview</h2>
          {previewListing ? (
            <ListingCard listing={previewListing} />
          ) : (
            <Card>
              <CardContent className="flex h-[400px] items-center justify-center p-6 text-center">
                <div>
                  <p className="mb-2 text-lg font-medium">
                    No preview available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form and click "Preview Listing" to see how
                    your listing will appear to guests.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
