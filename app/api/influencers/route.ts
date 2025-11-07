import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const minFollowers = searchParams.get("minFollowers") || "0"
  const maxFollowers = searchParams.get("maxFollowers") || "10000000"
  const minEngagement = searchParams.get("minEngagement") || "0"
  const maxEngagement = searchParams.get("maxEngagement") || "100"
  const location = searchParams.get("location") || ""
  const verified = searchParams.get("verified") || ""
  const sortBy = searchParams.get("sortBy") || "instagram_followers"
  const sortOrder = searchParams.get("sortOrder") || "desc"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const offset = (page - 1) * limit

  try {
  const supabase = await createClient()

    let query = supabase
      .from("influencers")
      .select(
        `
        *,
        categories (
          id,
          name
        ),
        influencer_tags (
          tag
        )
      `,
      )
      .eq("is_active", true)

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%,username.ilike.%${search}%`)
    }

    if (category) {
      query = query.eq("categories.name", category)
    }

    if (location) {
      query = query.ilike("location", `%${location}%`)
    }

    if (verified === "true") {
      query = query.eq("is_verified", true)
    }

    // Apply follower range filter
    query = query
      .gte("instagram_followers", Number.parseInt(minFollowers))
      .lte("instagram_followers", Number.parseInt(maxFollowers))

    // Apply engagement rate filter
    query = query
      .gte("instagram_engagement_rate", Number.parseFloat(minEngagement))
      .lte("instagram_engagement_rate", Number.parseFloat(maxEngagement))

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: influencers, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch influencers" }, { status: 500 })
    }

    // Get total count for pagination
    const { count } = await supabase
      .from("influencers")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)

    return NextResponse.json({
      influencers: influencers || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
