"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
  categories: Array<{ id: number; name: string }>
}

export function SearchFilters({ onFiltersChange, categories }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all", // Updated default value
    minFollowers: 0,
    maxFollowers: 10000000,
    minEngagement: 0,
    maxEngagement: 100,
    location: "",
    verified: false,
    sortBy: "instagram_followers",
    sortOrder: "desc",
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    onFiltersChange(filters)
  }, [filters, onFiltersChange])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all", // Updated default value
      minFollowers: 0,
      maxFollowers: 10000000,
      minEngagement: 0,
      maxEngagement: 100,
      location: "",
      verified: false,
      sortBy: "instagram_followers",
      sortOrder: "desc",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toString()
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "search" && value) return true
    if (key === "category" && value !== "all") return true // Updated condition
    if (key === "location" && value) return true
    if (key === "verified" && value) return true
    if (key === "minFollowers" && value > 0) return true
    if (key === "maxFollowers" && value < 10000000) return true
    if (key === "minEngagement" && value > 0) return true
    if (key === "maxEngagement" && value < 100) return true
    return false
  }).length

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-teal-deep" />
            <span>Search & Filters</span>
            {activeFiltersCount > 0 && <Badge className="bg-coral-warm/10 text-coral-warm">{activeFiltersCount}</Badge>}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Influencers</Label>
          <Input
            id="search"
            placeholder="Search by name, username, or bio..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem> {/* Updated value */}
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, State, Country..."
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        {/* Verified Only */}
        <div className="flex items-center justify-between">
          <Label htmlFor="verified">Verified Only</Label>
          <Switch
            id="verified"
            checked={filters.verified}
            onCheckedChange={(checked) => handleFilterChange("verified", checked)}
          />
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full justify-center text-teal-deep hover:text-teal-deep hover:bg-teal-deep/5"
        >
          <Filter className="w-4 h-4 mr-2" />
          {showAdvanced ? "Hide" : "Show"} Advanced Filters
        </Button>

        {showAdvanced && (
          <div className="space-y-6 pt-4 border-t">
            {/* Followers Range */}
            <div className="space-y-3">
              <Label>Instagram Followers</Label>
              <div className="px-2">
                <Slider
                  value={[filters.minFollowers, filters.maxFollowers]}
                  onValueChange={([min, max]) => {
                    handleFilterChange("minFollowers", min)
                    handleFilterChange("maxFollowers", max)
                  }}
                  max={10000000}
                  min={0}
                  step={10000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatNumber(filters.minFollowers)}</span>
                <span>{formatNumber(filters.maxFollowers)}</span>
              </div>
            </div>

            {/* Engagement Rate Range */}
            <div className="space-y-3">
              <Label>Engagement Rate (%)</Label>
              <div className="px-2">
                <Slider
                  value={[filters.minEngagement, filters.maxEngagement]}
                  onValueChange={([min, max]) => {
                    handleFilterChange("minEngagement", min)
                    handleFilterChange("maxEngagement", max)
                  }}
                  max={100}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{filters.minEngagement}%</span>
                <span>{filters.maxEngagement}%</span>
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram_followers">Followers</SelectItem>
                  <SelectItem value="instagram_engagement_rate">Engagement Rate</SelectItem>
                  <SelectItem value="brand_safety_score">Brand Safety</SelectItem>
                  <SelectItem value="authenticity_score">Authenticity</SelectItem>
                  <SelectItem value="post_rate">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange("sortOrder", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Highest to Lowest</SelectItem>
                  <SelectItem value="asc">Lowest to Highest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
