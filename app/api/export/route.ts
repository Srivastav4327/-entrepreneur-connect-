import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/server"

export async function POST(request: NextRequest) {
  try {
    const { influencerIds, format } = await request.json()

    if (!influencerIds || !Array.isArray(influencerIds) || influencerIds.length === 0) {
      return NextResponse.json({ error: "Invalid influencer IDs" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: influencers, error } = await supabase
      .from("influencers")
      .select(`
        *,
        categories (name),
        influencer_tags (tag)
      `)
      .in("id", influencerIds)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch influencers" }, { status: 500 })
    }

    if (format === "csv") {
      const csvData = generateCSV(influencers)
      return new NextResponse(csvData, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="influencers-export.csv"',
        },
      })
    }

    return NextResponse.json({ influencers })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}

function generateCSV(influencers: any[]) {
  const headers = [
    "Name",
    "Username",
    "Location",
    "Category",
    "Instagram Followers",
    "Instagram Engagement Rate",
    "YouTube Subscribers",
    "Twitter Followers",
    "Brand Safety Score",
    "Authenticity Score",
    "Post Rate ($/post)",
    "Verified",
    "Tags",
    "Bio",
  ]

  const rows = influencers.map((influencer) => [
    influencer.name,
    influencer.username,
    influencer.location,
    influencer.categories?.name || "",
    influencer.instagram_followers,
    `${influencer.instagram_engagement_rate}%`,
    influencer.youtube_subscribers || 0,
    influencer.twitter_followers || 0,
    influencer.brand_safety_score,
    influencer.authenticity_score,
    `$${influencer.post_rate}`,
    influencer.is_verified ? "Yes" : "No",
    influencer.influencer_tags?.map((t: any) => t.tag).join("; ") || "",
    `"${influencer.bio.replace(/"/g, '""')}"`,
  ])

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

  return csvContent
}
