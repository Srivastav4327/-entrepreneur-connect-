import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { brandDescription, targetAudience, campaignGoals, budget } = body

  const supabase = await createClient()

    // Get a sample of influencers for AI analysis
    const { data: influencers, error } = await supabase
      .from("influencers")
      .select(
        `
        *,
        categories (
          name
        ),
        influencer_tags (
          tag
        )
      `,
      )
      .eq("is_active", true)
      .limit(50)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch influencers" }, { status: 500 })
    }

    // Simulate AI recommendation logic
    const recommendations = generateAIRecommendations(influencers || [], {
      brandDescription,
      targetAudience,
      campaignGoals,
      budget,
    })

    return NextResponse.json({
      recommendations,
      insights: {
        totalAnalyzed: influencers?.length || 0,
        matchingCriteria: extractMatchingCriteria(brandDescription, targetAudience, campaignGoals),
        suggestedFilters: generateSuggestedFilters(recommendations),
        campaignTips: generateCampaignTips(campaignGoals, budget),
      },
    })
  } catch (error) {
    console.error("AI recommendation error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

function generateAIRecommendations(influencers: any[], criteria: any) {
  return influencers
    .map((influencer) => {
      const matchScore = calculateMatchScore(influencer, criteria)
      const reasons = generateMatchReasons(influencer, criteria, matchScore)

      return {
        ...influencer,
        aiMatchScore: matchScore,
        matchReasons: reasons,
        recommendationRank: Math.floor(Math.random() * 100) + 1,
      }
    })
    .filter((influencer) => influencer.aiMatchScore >= 70)
    .sort((a, b) => b.aiMatchScore - a.aiMatchScore)
    .slice(0, 12)
}

function calculateMatchScore(influencer: any, criteria: any): number {
  let score = 60 // Base score

  // Brand safety and authenticity boost
  score += influencer.brand_safety_score * 2
  score += influencer.authenticity_score * 1.5

  // Engagement rate factor
  if (influencer.instagram_engagement_rate > 4) score += 10
  if (influencer.instagram_engagement_rate > 6) score += 5

  // Follower count alignment with budget
  const budgetRange = getBudgetRange(criteria.budget)
  if (isFollowerCountInBudgetRange(influencer.instagram_followers, budgetRange)) {
    score += 15
  }

  // Category alignment
  if (
    criteria.brandDescription &&
    criteria.brandDescription.toLowerCase().includes(influencer.categories?.name?.toLowerCase())
  ) {
    score += 20
  }

  // Add some randomness for variety
  score += Math.random() * 10

  return Math.min(Math.round(score), 100)
}

function generateMatchReasons(influencer: any, criteria: any, matchScore: number): string[] {
  const reasons = []

  if (influencer.brand_safety_score >= 9) {
    reasons.push("Excellent brand safety record")
  }

  if (influencer.authenticity_score >= 8.5) {
    reasons.push("High authenticity score indicates genuine engagement")
  }

  if (influencer.instagram_engagement_rate > 5) {
    reasons.push("Above-average engagement rate")
  }

  if (influencer.is_verified) {
    reasons.push("Verified account adds credibility")
  }

  if (criteria.targetAudience && criteria.targetAudience.includes("young")) {
    if (influencer.age <= 30) {
      reasons.push("Age aligns with young target audience")
    }
  }

  if (matchScore >= 90) {
    reasons.push("Perfect match for your campaign goals")
  } else if (matchScore >= 80) {
    reasons.push("Strong alignment with brand values")
  }

  return reasons.slice(0, 3)
}

function extractMatchingCriteria(brandDescription: string, targetAudience: string, campaignGoals: string) {
  return {
    primaryFocus: extractPrimaryFocus(brandDescription),
    audienceAge: extractAudienceAge(targetAudience),
    campaignType: extractCampaignType(campaignGoals),
  }
}

function generateSuggestedFilters(recommendations: any[]) {
  const categories = [...new Set(recommendations.map((r) => r.categories?.name).filter(Boolean))]
  const avgEngagement =
    recommendations.reduce((sum, r) => sum + r.instagram_engagement_rate, 0) / recommendations.length

  return {
    categories: categories.slice(0, 3),
    minEngagement: Math.max(3, Math.floor(avgEngagement - 1)),
    verifiedOnly: recommendations.filter((r) => r.is_verified).length > recommendations.length * 0.6,
  }
}

function generateCampaignTips(campaignGoals: string, budget: string) {
  const tips = []

  if (campaignGoals.toLowerCase().includes("awareness")) {
    tips.push("Focus on reach and impressions for brand awareness campaigns")
    tips.push("Consider micro-influencers for authentic storytelling")
  }

  if (campaignGoals.toLowerCase().includes("sales")) {
    tips.push("Look for influencers with high conversion rates")
    tips.push("Include clear call-to-actions in campaign briefs")
  }

  if (budget.toLowerCase().includes("limited")) {
    tips.push("Micro-influencers often provide better ROI than mega-influencers")
    tips.push("Consider long-term partnerships for better rates")
  }

  return tips.slice(0, 3)
}

function getBudgetRange(budget: string) {
  if (budget.toLowerCase().includes("limited") || budget.toLowerCase().includes("small")) {
    return "micro"
  }
  if (budget.toLowerCase().includes("medium") || budget.toLowerCase().includes("moderate")) {
    return "mid"
  }
  return "high"
}

function isFollowerCountInBudgetRange(followers: number, budgetRange: string): boolean {
  switch (budgetRange) {
    case "micro":
      return followers <= 100000
    case "mid":
      return followers > 100000 && followers <= 1000000
    case "high":
      return followers > 1000000
    default:
      return true
  }
}

function extractPrimaryFocus(brandDescription: string): string {
  const keywords = brandDescription.toLowerCase()
  if (keywords.includes("fashion") || keywords.includes("style")) return "Fashion"
  if (keywords.includes("beauty") || keywords.includes("cosmetic")) return "Beauty"
  if (keywords.includes("fitness") || keywords.includes("health")) return "Fitness"
  if (keywords.includes("food") || keywords.includes("restaurant")) return "Food"
  if (keywords.includes("tech") || keywords.includes("software")) return "Technology"
  return "Lifestyle"
}

function extractAudienceAge(targetAudience: string): string {
  const audience = targetAudience.toLowerCase()
  if (audience.includes("teen") || audience.includes("young")) return "18-25"
  if (audience.includes("millennial")) return "26-35"
  if (audience.includes("adult") || audience.includes("professional")) return "36-45"
  return "All ages"
}

function extractCampaignType(campaignGoals: string): string {
  const goals = campaignGoals.toLowerCase()
  if (goals.includes("awareness") || goals.includes("brand")) return "Brand Awareness"
  if (goals.includes("sales") || goals.includes("conversion")) return "Sales & Conversion"
  if (goals.includes("engagement") || goals.includes("community")) return "Engagement"
  return "General Marketing"
}
