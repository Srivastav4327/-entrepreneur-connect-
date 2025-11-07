import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, TrendingUp, Filter, Target } from "lucide-react"

interface AIInsightsPanelProps {
  insights: {
    totalAnalyzed: number
    matchingCriteria: {
      primaryFocus: string
      audienceAge: string
      campaignType: string
    }
    suggestedFilters: {
      categories: string[]
      minEngagement: number
      verifiedOnly: boolean
    }
    campaignTips: string[]
  }
}

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-rich">
            <TrendingUp className="w-5 h-5" />
            <span>AI Analysis Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-rich">{insights.totalAnalyzed}</div>
              <div className="text-sm text-gray-600">Profiles Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-coral-warm">AI</div>
              <div className="text-sm text-gray-600">Powered Matching</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Match Confidence</span>
              <span className="text-sm text-purple-rich">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Matching Criteria */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-teal-deep" />
            <span>Detected Criteria</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium text-gray-700">Primary Focus</div>
              <Badge className="bg-teal-deep/10 text-teal-deep mt-1">{insights.matchingCriteria.primaryFocus}</Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Target Age Group</div>
              <Badge className="bg-coral-warm/10 text-coral-warm mt-1">{insights.matchingCriteria.audienceAge}</Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Campaign Type</div>
              <Badge className="bg-purple-rich/10 text-purple-rich mt-1">
                {insights.matchingCriteria.campaignType}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-coral-warm" />
            <span>Smart Filter Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Recommended Categories</div>
              <div className="flex flex-wrap gap-2">
                {insights.suggestedFilters.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Min. Engagement Rate</div>
              <div className="text-lg font-semibold text-coral-warm">{insights.suggestedFilters.minEngagement}%</div>
            </div>
            {insights.suggestedFilters.verifiedOnly && (
              <div>
                <Badge className="bg-green-100 text-green-800">Verified accounts recommended</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Tips */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>AI Campaign Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.campaignTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
