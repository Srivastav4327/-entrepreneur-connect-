import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Package, Video, ImageIcon, FileText, Mail, MessageSquare, Star } from "lucide-react"

interface CollaborationPanelProps {
  influencer: {
    name: string
    post_rate: number
    story_rate: number
    video_rate: number
    brand_safety_score: number
    authenticity_score: number
  }
}

export function CollaborationPanel({ influencer }: CollaborationPanelProps) {
  const collaborationTypes = [
    {
      type: "Instagram Post",
      price: influencer.post_rate,
      icon: ImageIcon,
      description: "Single feed post with your product/service",
      deliverables: ["1 Instagram post", "Professional photography", "Caption & hashtags", "24h story highlight"],
    },
    {
      type: "Instagram Story",
      price: influencer.story_rate,
      icon: FileText,
      description: "Story series featuring your brand",
      deliverables: ["3-5 story slides", "Swipe-up link (if available)", "Brand mention", "24h visibility"],
    },
    {
      type: "Video Content",
      price: influencer.video_rate,
      icon: Video,
      description: "Custom video content for your campaign",
      deliverables: ["30-60s video", "Professional editing", "Brand integration", "Cross-platform usage rights"],
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Collaboration Packages */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-teal-deep" />
            <span>Collaboration Packages</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {collaborationTypes.map((collab, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-deep/10 rounded-lg flex items-center justify-center">
                    <collab.icon className="w-5 h-5 text-teal-deep" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{collab.type}</h3>
                    <p className="text-gray-600 text-sm">{collab.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {collab.deliverables.map((deliverable, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-coral-warm">{formatPrice(collab.price)}</div>
                  <div className="text-sm text-gray-500">starting from</div>
                </div>
              </div>
              {index < collaborationTypes.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-purple-rich" />
            <span>Why Choose {influencer.name}?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-coral-50 to-red-100 rounded-lg">
              <div className="text-2xl font-bold text-coral-warm">{influencer.brand_safety_score}/10</div>
              <div className="text-sm text-gray-600">Brand Safety</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-rich">{influencer.authenticity_score}/10</div>
              <div className="text-sm text-gray-600">Authenticity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Actions */}
      <div className="space-y-3">
        <Button className="w-full bg-coral-warm hover:bg-coral-light text-white py-6 text-lg font-semibold">
          <Mail className="w-5 h-5 mr-2" />
          Send Collaboration Proposal
        </Button>
        <Button
          variant="outline"
          className="w-full border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-white py-6 text-lg bg-transparent"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Start Conversation
        </Button>
        <Button
          variant="outline"
          className="w-full border-purple-rich text-purple-rich hover:bg-purple-rich hover:text-white py-6 text-lg bg-transparent"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Additional Info */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
        <CardContent className="p-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">What's Included:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-deep rounded-full"></div>
                <span>Professional content creation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-deep rounded-full"></div>
                <span>Brand guidelines compliance</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-deep rounded-full"></div>
                <span>Performance analytics report</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-deep rounded-full"></div>
                <span>Usage rights for marketing</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
