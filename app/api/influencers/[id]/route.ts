import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const influencerId = params.id

  if (!influencerId || isNaN(Number(influencerId))) {
    return NextResponse.json({ error: "Invalid influencer ID" }, { status: 400 })
  }

  try {
  const supabase = await createClient()

    const { data: influencer, error } = await supabase
      .from("influencers")
      .select(
        `
        *,
        categories (
          id,
          name,
          description
        ),
        influencer_tags (
          tag
        )
      `,
      )
      .eq("id", influencerId)
      .eq("is_active", true)
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Influencer not found" }, { status: 404 })
    }

    if (!influencer) {
      return NextResponse.json({ error: "Influencer not found" }, { status: 404 })
    }

    return NextResponse.json({ influencer })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
