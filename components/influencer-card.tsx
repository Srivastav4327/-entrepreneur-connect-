import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Verified, Instagram, Youtube, Twitter } from "lucide-react"
import Link from "next/link"
import { CompareButton } from "@/components/compare-button"

interface InfluencerCardProps {
  influencer: {
    id: number
    name: string
    username: string
    bio: string
    profile_image_url: string
    location: string
    instagram_followers: number
    instagram_engagement_rate: number
    instagram_handle: string
    youtube_subscribers: number
    twitter_followers: number
    brand_safety_score: number
    authenticity_score: number
    post_rate: number
    is_verified: boolean
    categories: {
      name: string
    }
    influencer_tags: Array<{
      tag: string
    }>
  }
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        {/* Profile Header */}
        <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={influencer.profile_image_url || "/placeholder.svg"}
                alt={influencer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              {influencer.is_verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-coral-warm rounded-full flex items-center justify-center">
                  <Verified className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-lg text-gray-900 truncate">{influencer.name}</h3>
              <p className="text-sm text-gray-600">@{influencer.username}</p>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{influencer.location}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{influencer.bio}</p>

          {/* Category and Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {influencer.categories?.name && (
              <Badge className="bg-purple-rich/10 text-purple-rich border-purple-rich/20 text-xs">
                {influencer.categories.name}
              </Badge>
            )}
            {influencer.influencer_tags?.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.tag.replace("-", " ")}
              </Badge>
            )) || []}
          </div>
        </div>

        {/* Metrics */}
        <div className="p-6 space-y-4">
          {/* Social Media Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Instagram className="w-4 h-4 text-pink-500" />
                <span className="text-xs text-gray-500">Instagram</span>
              </div>
              <div className="font-semibold text-teal-deep">{formatNumber(influencer.instagram_followers)}</div>
              <div className="text-xs text-gray-500">{influencer.instagram_engagement_rate}% eng.</div>
            </div>
            {influencer.youtube_subscribers > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-gray-500">YouTube</span>
                </div>
                <div className="font-semibold text-teal-deep">{formatNumber(influencer.youtube_subscribers)}</div>
              </div>
            )}
            {influencer.twitter_followers > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Twitter className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-500">Twitter</span>
                </div>
                <div className="font-semibold text-teal-deep">{formatNumber(influencer.twitter_followers)}</div>
              </div>
            )}
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-700">Brand Safety</div>
              <div className="text-lg font-bold text-coral-warm">{influencer.brand_safety_score}/10</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-700">Authenticity</div>
              <div className="text-lg font-bold text-purple-rich">{influencer.authenticity_score}/10</div>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center p-3 bg-teal-deep/5 rounded-lg">
            <div className="text-sm text-gray-600">Starting from</div>
            <div className="text-xl font-bold text-teal-deep">${influencer.post_rate?.toLocaleString() || "N/A"}</div>
            <div className="text-xs text-gray-500">per post</div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button asChild className="flex-1 bg-coral-warm hover:bg-coral-light text-white">
              <Link href={`/influencers/${influencer.id}`}>View Profile</Link>
            </Button>
            <CompareButton influencer={influencer} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
