import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Instagram, Youtube, Twitter, TrendingUp, Users, Heart, MessageCircle, Share } from "lucide-react"

interface InfluencerStatsProps {
  influencer: {
    instagram_followers: number
    instagram_engagement_rate: number
    instagram_handle: string
    tiktok_followers: number
    tiktok_engagement_rate: number
    tiktok_handle: string
    youtube_subscribers: number
    youtube_engagement_rate: number
    youtube_handle: string
    twitter_followers: number
    twitter_engagement_rate: number
    twitter_handle: string
    avg_views: number
    avg_likes: number
    avg_comments: number
    brand_safety_score: number
    authenticity_score: number
  }
}

export function InfluencerStats({ influencer }: InfluencerStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      followers: influencer.instagram_followers,
      engagement: influencer.instagram_engagement_rate,
      handle: influencer.instagram_handle,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      name: "TikTok",
      icon: Share,
      followers: influencer.tiktok_followers,
      engagement: influencer.tiktok_engagement_rate,
      handle: influencer.tiktok_handle,
      color: "text-black",
      bgColor: "bg-gray-50",
    },
    {
      name: "YouTube",
      icon: Youtube,
      followers: influencer.youtube_subscribers,
      engagement: influencer.youtube_engagement_rate,
      handle: influencer.youtube_handle,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      name: "Twitter",
      icon: Twitter,
      followers: influencer.twitter_followers,
      engagement: influencer.twitter_engagement_rate,
      handle: influencer.twitter_handle,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ].filter((platform) => platform.followers > 0)

  return (
    <div className="space-y-6">
      {/* Social Media Platforms */}
      <div className="grid md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => (
          <Card key={platform.name} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${platform.bgColor} rounded-lg flex items-center justify-center`}>
                  <platform.icon className={`w-6 h-6 ${platform.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{platform.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      @{platform.handle}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div>
                      <div className="font-bold text-teal-deep text-xl">{formatNumber(platform.followers)}</div>
                      <div className="text-sm text-gray-600">
                        {platform.name === "YouTube" ? "subscribers" : "followers"}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-coral-warm text-xl">{platform.engagement}%</div>
                      <div className="text-sm text-gray-600">engagement</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-rich" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
              <Users className="w-8 h-8 text-teal-deep mx-auto mb-2" />
              <div className="font-bold text-2xl text-teal-deep">{formatNumber(influencer.avg_views)}</div>
              <div className="text-sm text-gray-600">Avg. Views</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-coral-50 to-red-100 rounded-lg">
              <Heart className="w-8 h-8 text-coral-warm mx-auto mb-2" />
              <div className="font-bold text-2xl text-coral-warm">{formatNumber(influencer.avg_likes)}</div>
              <div className="text-sm text-gray-600">Avg. Likes</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <MessageCircle className="w-8 h-8 text-purple-rich mx-auto mb-2" />
              <div className="font-bold text-2xl text-purple-rich">{formatNumber(influencer.avg_comments)}</div>
              <div className="text-sm text-gray-600">Avg. Comments</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Safety & Authenticity Scores */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Brand Safety Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-coral-warm">{influencer.brand_safety_score}/10</span>
              <Badge
                className={
                  influencer.brand_safety_score >= 8
                    ? "bg-green-100 text-green-800"
                    : influencer.brand_safety_score >= 6
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }
              >
                {influencer.brand_safety_score >= 8
                  ? "Excellent"
                  : influencer.brand_safety_score >= 6
                    ? "Good"
                    : "Fair"}
              </Badge>
            </div>
            <Progress value={influencer.brand_safety_score * 10} className="h-2" />
            <p className="text-sm text-gray-600">
              Based on content analysis, past collaborations, and audience sentiment
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Authenticity Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-rich">{influencer.authenticity_score}/10</span>
              <Badge
                className={
                  influencer.authenticity_score >= 8
                    ? "bg-green-100 text-green-800"
                    : influencer.authenticity_score >= 6
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }
              >
                {influencer.authenticity_score >= 8
                  ? "Highly Authentic"
                  : influencer.authenticity_score >= 6
                    ? "Authentic"
                    : "Moderate"}
              </Badge>
            </div>
            <Progress value={influencer.authenticity_score * 10} className="h-2" />
            <p className="text-sm text-gray-600">
              Measures genuine engagement, follower quality, and content originality
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
