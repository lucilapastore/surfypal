"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { ListingFilters as ListingFiltersType } from "@/types"
import { CalendarIcon, Filter, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface ListingFiltersProps {
  filters: ListingFiltersType
  setFilters: (filters: ListingFiltersType) => void
}

export function ListingFilters({ filters, setFilters }: ListingFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<ListingFiltersType>(filters)

  const handleApplyFilters = () => {
    setFilters(localFilters)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    const resetFilters: ListingFiltersType = {
      location: "",
      dates: { from: undefined, to: undefined },
      guests: 1,
      priceRange: [0, 1000],
      minTrustScore: 0,
      amenities: [],
    }
    setLocalFilters(resetFilters)
    setFilters(resetFilters)
  }

  const handleRemoveFilter = (key: keyof ListingFiltersType) => {
    if (key === "dates") {
      setFilters({ ...filters, dates: { from: undefined, to: undefined } })
    } else if (key === "priceRange") {
      setFilters({ ...filters, priceRange: [0, 1000] })
    } else if (key === "amenities") {
      setFilters({ ...filters, amenities: [] })
    } else {
      setFilters({ ...filters, [key]: key === "guests" ? 1 : 0 })
    }
  }

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "location" && value) return true
    if (key === "dates" && (value.from || value.to)) return true
    if (key === "guests" && value > 1) return true
    if (key === "priceRange" && (value[0] > 0 || value[1] < 1000)) return true
    if (key === "minTrustScore" && value > 0) return true
    if (key === "amenities" && value.length > 0) return true
    return false
  }).length

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] p-4" align="start">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Location</h3>
              <Input
                placeholder="City, Country"
                value={localFilters.location}
                onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Dates</h3>
              <div className="rounded-md border">
                <Calendar
                  mode="range"
                  selected={{
                    from: localFilters.dates.from,
                    to: localFilters.dates.to,
                  }}
                  onSelect={(range) =>
                    setLocalFilters({
                      ...localFilters,
                      dates: {
                        from: range?.from,
                        to: range?.to,
                      },
                    })
                  }
                  disabled={(date) => date < new Date()}
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Guests</h3>
              <Select
                value={localFilters.guests.toString()}
                onValueChange={(value) =>
                  setLocalFilters({
                    ...localFilters,
                    guests: Number.parseInt(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Price Range</h3>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(localFilters.priceRange[0])} - {formatCurrency(localFilters.priceRange[1])}
                </span>
              </div>
              <Slider
                value={localFilters.priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) =>
                  setLocalFilters({
                    ...localFilters,
                    priceRange: value as [number, number],
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Minimum Trust Score</h3>
                <span className="text-sm text-muted-foreground">{localFilters.minTrustScore}</span>
              </div>
              <Slider
                value={[localFilters.minTrustScore]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) =>
                  setLocalFilters({
                    ...localFilters,
                    minTrustScore: value[0],
                  })
                }
              />
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="ghost" onClick={handleResetFilters} className="h-8 px-2 text-xs">
                Reset filters
              </Button>
              <Button onClick={handleApplyFilters}>Apply Filters</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active filters */}
      <div className="flex flex-wrap gap-2">
        {filters.location && (
          <Badge variant="secondary" className="gap-1">
            {filters.location}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleRemoveFilter("location")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove location filter</span>
            </Button>
          </Badge>
        )}

        {(filters.dates.from || filters.dates.to) && (
          <Badge variant="secondary" className="gap-1">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {filters.dates.from
              ? filters.dates.from.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              : "Any"}{" "}
            -{" "}
            {filters.dates.to
              ? filters.dates.to.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              : "Any"}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleRemoveFilter("dates")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove dates filter</span>
            </Button>
          </Badge>
        )}

        {filters.guests > 1 && (
          <Badge variant="secondary" className="gap-1">
            {filters.guests} guests
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleRemoveFilter("guests")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove guests filter</span>
            </Button>
          </Badge>
        )}

        {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
          <Badge variant="secondary" className="gap-1">
            {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0"
              onClick={() => handleRemoveFilter("priceRange")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove price filter</span>
            </Button>
          </Badge>
        )}

        {filters.minTrustScore > 0 && (
          <Badge variant="secondary" className="gap-1">
            Min Trust Score: {filters.minTrustScore}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0"
              onClick={() => handleRemoveFilter("minTrustScore")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove trust score filter</span>
            </Button>
          </Badge>
        )}
      </div>
    </div>
  )
}

