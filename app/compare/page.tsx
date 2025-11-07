"use client"

import { useState } from "react"
import { useCompareStore } from "@/lib/compare-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Scale,
  Download,
  X,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Shield,
  CheckCircle,
  DollarSign,
  Star,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ComparePage() {
  const { selectedInfluencers, removeInfluencer, clearAll } = useCompareStore()
  const [exporting, setExporting] = useState(false)

  const handleExport = async (format: "csv" | "json") => {
    if (selectedInfluencers.length === 0) {
      toast.error("No influencers selected for export")
      return
    }

    setExporting(true)
    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          influencerIds: selectedInfluencers.map((i) => i.id),
          format,
        }),
      })

      if (format === "csv") {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "influencers-comparison.csv"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success("CSV exported successfully!")
      } else {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data.influencers, null, 2)], {
          type: "application/json",
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "influencers-comparison.json"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success("JSON exported successfully!")
      }
    } catch (error) {
      console.error("Export failed:", error)
      toast.error("Export failed. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  if (selectedInfluencers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-purple-rich/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-12 h-12 text-purple-rich" />
            </div>
            <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">Compare Influencers</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Select influencers from the dashboard to compare their metrics, engagement rates, and pricing side by
              side.
            </p>
            <Link href="/dashboard">
              <Button className="bg-teal-deep text-white hover:bg-teal-light">Browse Influencers</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900">Compare Influencers</h1>
              <p className="text-gray-600 mt-1">
                Side-by-side comparison of {selectedInfluencers.length} selected influencers
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => handleExport("csv")}
                disabled={exporting}
                className="border-coral-warm text-coral-warm hover:bg-coral-warm hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("json")}
                disabled={exporting}
                className="border-coral-warm text-coral-warm hover:bg-coral-warm hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button
                variant="outline"
                onClick={clearAll}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Comparison Grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedInfluencers.length}, 1fr)` }}>
          {selectedInfluencers.map((influencer) => (
            <Card key={influencer.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeInfluencer(influencer.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>

              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={influencer.profile_image_url || "/placeholder.svg"} alt={influencer.name} />
                  <AvatarFallback className="bg-teal-deep text-white text-lg">
                    {influencer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{influencer.name}</CardTitle>
                <p className="text-sm text-gray-600">@{influencer.username}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Badge variant="secondary">{influencer.categories.name}</Badge>
                  {influencer.is_verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Location */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{influencer.location}</span>
                </div>

                {/* Social Media Stats */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-900">Social Media Reach</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        <span className="text-sm">Instagram</span>
                      </div>
                      <span className="text-sm font-medium">
                        {(influencer.instagram_followers / 1000000).toFixed(1)}M
                      </span>
                    </div>

                    {influencer.youtube_subscribers > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Youtube className="w-4 h-4 text-red-500" />
                          <span className="text-sm">YouTube</span>
                        </div>
                        <span className="text-sm font-medium">
                          {(influencer.youtube_subscribers / 1000).toFixed(0)}K
                        </span>
                      </div>
                    )}

                    {influencer.twitter_followers > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Twitter className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Twitter</span>
                        </div>
                        <span className="text-sm font-medium">{(influencer.twitter_followers / 1000).toFixed(0)}K</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Engagement Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Engagement Rate</span>
                    <span className="text-sm font-bold text-coral-warm">{influencer.instagram_engagement_rate}%</span>
                  </div>
                  <Progress value={influencer.instagram_engagement_rate} className="h-2" />
                </div>

                {/* Brand Safety Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Brand Safety</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">{influencer.brand_safety_score}/100</span>
                  </div>
                  <Progress value={influencer.brand_safety_score} className="h-2" />
                </div>

                {/* Authenticity Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Authenticity</span>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">{influencer.authenticity_score}/100</span>
                  </div>
                  <Progress value={influencer.authenticity_score} className="h-2" />
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Post Rate</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">${influencer.post_rate.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-900">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {influencer.influencer_tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag.tag}
                      </Badge>
                    ))}
                    {influencer.influencer_tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{influencer.influencer_tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* View Profile Button */}
                <Link href={`/influencers/${influencer.id}`}>
                  <Button className="w-full bg-teal-deep text-white hover:bg-teal-light">View Full Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add More Button */}
        {selectedInfluencers.length < 4 && (
          <div className="text-center mt-8">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-purple-rich text-purple-rich hover:bg-purple-rich hover:text-white bg-transparent"
              >
                <Scale className="w-4 h-4 mr-2" />
                Add More Influencers ({selectedInfluencers.length}/4)
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
