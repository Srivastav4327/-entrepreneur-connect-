import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ suggestions: [], filters: {} })
    }

  const supabase = await createClient()

    // Parse natural language query and convert to filters
    const smartFilters = parseNaturalLanguageQuery(query)
    const suggestions = generateSearchSuggestions(query)

    // Get matching influencers based on smart filters
    let dbQuery = supabase
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

    // Apply smart filters
    if (smartFilters.category) {
      dbQuery = dbQuery.eq("categories.name", smartFilters.category)
    }

    if (smartFilters.minFollowers) {
      dbQuery = dbQuery.gte("instagram_followers", smartFilters.minFollowers)
    }

    if (smartFilters.maxFollowers) {
      dbQuery = dbQuery.lte("instagram_followers", smartFilters.maxFollowers)
    }

    if (smartFilters.minEngagement) {
      dbQuery = dbQuery.gte("instagram_engagement_rate", smartFilters.minEngagement)
    }

    if (smartFilters.location) {
      dbQuery = dbQuery.ilike("location", `%${smartFilters.location}%`)
    }

    if (smartFilters.verified) {
      dbQuery = dbQuery.eq("is_verified", true)
    }

    dbQuery = dbQuery.limit(20)

    const { data: influencers, error } = await dbQuery

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to search influencers" }, { status: 500 })
    }

    return NextResponse.json({
      suggestions,
      smartFilters,
      results: influencers || [],
      interpretation: generateQueryInterpretation(query, smartFilters),
    })
  } catch (error) {
    console.error("Smart search error:", error)
    return NextResponse.json({ error: "Failed to process smart search" }, { status: 500 })
  }
}

function parseNaturalLanguageQuery(query: string) {
  const lowerQuery = query.toLowerCase()
  const filters: any = {}

  // Category detection
  const categories = [
    "fashion",
    "beauty",
    "fitness",
    "food",
    "travel",
    "technology",
    "gaming",
    "lifestyle",
    "business",
    "art",
    "music",
    "parenting",
    "home",
    "pets",
    "education",
  ]

  for (const category of categories) {
    if (lowerQuery.includes(category)) {
      filters.category = category.charAt(0).toUpperCase() + category.slice(1)
      break
    }
  }

  // Follower count detection
  if (lowerQuery.includes("micro") || lowerQuery.includes("small")) {
    filters.maxFollowers = 100000
  } else if (lowerQuery.includes("macro") || lowerQuery.includes("large")) {
    filters.minFollowers = 100000
  } else if (lowerQuery.includes("mega") || lowerQuery.includes("celebrity")) {
    filters.minFollowers = 1000000
  }

  // Engagement detection
  if (lowerQuery.includes("high engagement") || lowerQuery.includes("engaged")) {
    filters.minEngagement = 5
  }

  // Location detection
  const locations = ["new york", "los angeles", "london", "paris", "tokyo", "sydney", "toronto", "miami"]
  for (const location of locations) {
    if (lowerQuery.includes(location)) {
      filters.location = location
      break
    }
  }

  // Verification detection
  if (lowerQuery.includes("verified") || lowerQuery.includes("blue check")) {
    filters.verified = true
  }

  return filters
}

function generateSearchSuggestions(query: string) {
  const suggestions = [
    "Fashion influencers in New York with high engagement",
    "Verified beauty creators with 100K+ followers",
    "Micro fitness influencers for authentic partnerships",
    "Food bloggers in Los Angeles for restaurant campaigns",
    "Tech reviewers with engaged audiences",
    "Travel influencers for destination marketing",
    "Lifestyle creators for brand awareness campaigns",
    "Gaming streamers with young demographics",
  ]

  // Filter suggestions based on query relevance
  return suggestions
    .filter((suggestion) => {
      const queryWords = query.toLowerCase().split(" ")
      const suggestionWords = suggestion.toLowerCase().split(" ")
      return queryWords.some((word) => suggestionWords.includes(word))
    })
    .slice(0, 4)
}

function generateQueryInterpretation(query: string, filters: any) {
  let interpretation = "I found influencers"

  if (filters.category) {
    interpretation += ` in ${filters.category}`
  }

  if (filters.minFollowers && filters.maxFollowers) {
    interpretation += ` with ${filters.minFollowers / 1000}K-${filters.maxFollowers / 1000}K followers`
  } else if (filters.minFollowers) {
    interpretation += ` with ${filters.minFollowers >= 1000000 ? filters.minFollowers / 1000000 + "M" : filters.minFollowers / 1000 + "K"}+ followers`
  } else if (filters.maxFollowers) {
    interpretation += ` with under ${filters.maxFollowers >= 1000000 ? filters.maxFollowers / 1000000 + "M" : filters.maxFollowers / 1000 + "K"} followers`
  }

  if (filters.location) {
    interpretation += ` in ${filters.location}`
  }

  if (filters.minEngagement) {
    interpretation += ` with ${filters.minEngagement}%+ engagement`
  }

  if (filters.verified) {
    interpretation += ` who are verified`
  }

  return interpretation + " based on your search."
}
