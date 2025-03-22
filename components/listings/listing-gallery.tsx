"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Grid, Maximize } from "lucide-react"

interface ListingGalleryProps {
  images: string[]
}

export function ListingGallery({ images }: ListingGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "slideshow">("grid")

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          <div className="relative col-span-2 row-span-2 aspect-square md:aspect-auto">
            <Image
              src={images[0] || "/placeholder.svg"}
              alt="Listing main image"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Listing image ${index + 2}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 gap-1"
            onClick={() => setViewMode("slideshow")}
          >
            <Grid className="h-4 w-4" />
            Show all photos
          </Button>
        </div>
      ) : (
        <div className="relative h-[500px] w-full">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Listing image ${currentIndex + 1}`}
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full" onClick={handlePrevious}>
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full" onClick={handleNext}>
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 gap-1"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
            Grid view
          </Button>
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="absolute right-4 top-4 gap-1">
            <Maximize className="h-4 w-4" />
            Fullscreen
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <div className="relative h-[600px] w-full">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Listing image ${currentIndex + 1}`}
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full" onClick={handlePrevious}>
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full" onClick={handleNext}>
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, index) => (
              <Button
                key={index}
                variant={index === currentIndex ? "default" : "outline"}
                size="sm"
                className="h-2 w-2 rounded-full p-0"
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Image {index + 1}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

