import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfluencerStats } from "@/components/influencer-stats"
import { CollaborationPanel } from "@/components/collaboration-panel"
import { MapPin, Verified, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"

interface InfluencerDetailPageProps {
  params: {
    id: string
  }
}

async function getInfluencer(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/influencers/${id}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.influencer
  } catch (error) {
    console.error("Failed to fetch influencer:", error)
    return null
  }
}

export default async function InfluencerDetailPage({ params }: InfluencerDetailPageProps) {
  const influencer = await getInfluencer(params.id)

  if (!influencer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-teal-deep hover:text-teal-deep hover:bg-teal-deep/5">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Link>
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-teal-coral h-32"></div>
              <CardContent className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="relative -mt-16">
                    <img
                      src={influencer.profile_image_url || "/placeholder.svg"}
                      alt={influencer.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {influencer.is_verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-coral-warm rounded-full flex items-center justify-center border-2 border-white">
                        <Verified className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="font-display font-bold text-3xl text-gray-900">{influencer.name}</h1>
                      <p className="text-lg text-gray-600">@{influencer.username}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{influencer.location}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{influencer.country}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{influencer.bio}</p>

                    {/* Category and Tags */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-rich/10 text-purple-rich border-purple-rich/20">
                        {influencer.categories.name}
                      </Badge>
                      {influencer.influencer_tags.slice(0, 4).map((tag: any, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag.tag.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center">
                        <div className="font-display font-bold text-2xl text-teal-deep">
                          {influencer.instagram_followers >= 1000000
                            ? `${(influencer.instagram_followers / 1000000).toFixed(1)}M`
                            : `${(influencer.instagram_followers / 1000).toFixed(0)}K`}
                        </div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-display font-bold text-2xl text-coral-warm">
                          {influencer.instagram_engagement_rate}%
                        </div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="font-display font-bold text-2xl text-purple-rich">{influencer.age}</div>
                        <div className="text-sm text-gray-600">Years Old</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <InfluencerStats influencer={influencer} />

            {/* Content Samples */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="font-display font-bold text-2xl mb-6">Recent Content</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"></div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    className="border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-white bg-transparent"
                  >
                    View All Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CollaborationPanel influencer={influencer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
