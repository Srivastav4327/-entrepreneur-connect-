"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Influencer {
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

interface CompareStore {
  selectedInfluencers: Influencer[]
  addInfluencer: (influencer: Influencer) => void
  removeInfluencer: (id: number) => void
  clearAll: () => void
  isSelected: (id: number) => boolean
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      selectedInfluencers: [],
      addInfluencer: (influencer) => {
        const current = get().selectedInfluencers
        if (current.length >= 4) return // Max 4 influencers
        if (current.find((i) => i.id === influencer.id)) return // Already selected
        set({ selectedInfluencers: [...current, influencer] })
      },
      removeInfluencer: (id) => {
        set({
          selectedInfluencers: get().selectedInfluencers.filter((i) => i.id !== id),
        })
      },
      clearAll: () => set({ selectedInfluencers: [] }),
      isSelected: (id) => get().selectedInfluencers.some((i) => i.id === id),
    }),
    {
      name: "aix-compare-storage",
    },
  ),
)
