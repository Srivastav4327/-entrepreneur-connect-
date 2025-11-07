"use client"

import { useState, useEffect, useCallback } from "react"
import { InfluencerCard } from "@/components/influencer-card"
import { SearchFilters } from "@/components/search-filters"
import { SmartSearchBar } from "@/components/smart-search-bar"
import { AIRecommendationWizard } from "@/components/ai-recommendation-wizard"
import { AIInsightsPanel } from "@/components/ai-insights-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Grid, List, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react"
import { CompareButton } from "@/components/compare-button"
import type { User } from "@supabase/supabase-js"

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
  aiMatchScore?: number
  matchReasons?: string[]
  recommendationRank?: number
}

interface Category {
  id: number
  name: string
}

interface DashboardClientProps {
  user: User
}

export function DashboardClient({ user }: DashboardClientProps) {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("search")
  const [aiRecommendations, setAIRecommendations] = useState<any>(null)
  const [aiInsights, setAIInsights] = useState<any>(null)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data.categories || [])
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Fetch influencers
  const fetchInfluencers = useCallback(
    async (page = 1) => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          ...filters,
          page: page.toString(),
          limit: pagination.limit.toString(),
        })

        const response = await fetch(`/api/influencers?${params}`)
        const data = await response.json()

        setInfluencers(data.influencers || [])
        setPagination(data.pagination || { page: 1, limit: 12, total: 0, totalPages: 0 })
      } catch (error) {
        console.error("Failed to fetch influencers:", error)
        setInfluencers([])
      } finally {
        setLoading(false)
      }
    },
    [filters, pagination.limit],
  )

  // Fetch influencers when filters change
  useEffect(() => {
    if (activeTab === "search") {
      fetchInfluencers(1)
    }
  }, [filters, activeTab])

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const handleSmartSearch = (query: string, smartFilters?: any) => {
    if (smartFilters) {
      setFilters({ ...filters, ...smartFilters, search: query })
    } else {
      setFilters({ ...filters, search: query })
    }
  }

  const handleAIRecommendations = (data: any) => {
    setAIRecommendations(data.recommendations || [])
    setAIInsights(data.insights)
    setActiveTab("ai-results")
  }

  const handlePageChange = (newPage: number) => {
    fetchInfluencers(newPage)
  }

  const currentInfluencers = activeTab === "ai-results" ? aiRecommendations : influencers
  const showPagination = activeTab === "search" && pagination.totalPages > 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900">
                Welcome back, {user.user_metadata?.name || user.email}!
              </h1>
              <p className="text-gray-600 mt-1">Find the perfect creators for your brand with AI-powered insights</p>
            </div>

            <div className="flex items-center space-x-4">
              <CompareButton variant="view" />

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-teal-deep text-white" : ""}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-teal-deep text-white" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Smart Search Bar */}
          <div className="mt-6">
            <SmartSearchBar onSearch={handleSmartSearch} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="search">Search & Filter</TabsTrigger>
            <TabsTrigger value="ai-wizard">
              <Sparkles className="w-4 h-4 mr-1" />
              AI Wizard
            </TabsTrigger>
            <TabsTrigger value="ai-results" disabled={!aiRecommendations}>
              AI Results
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <TabsContent value="search" className="mt-0">
                <SearchFilters onFiltersChange={handleFiltersChange} categories={categories} />
              </TabsContent>

              <TabsContent value="ai-wizard" className="mt-0">
                <AIRecommendationWizard onRecommendations={handleAIRecommendations} />
              </TabsContent>

              <TabsContent value="ai-results" className="mt-0">
                {aiInsights && <AIInsightsPanel insights={aiInsights} />}
              </TabsContent>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <TabsContent value="search" className="mt-0">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="font-semibold text-lg text-gray-900">
                      {loading ? "Searching..." : `${pagination.total} Influencers Found`}
                    </h2>
                    {pagination.total > 0 && (
                      <Badge className="bg-coral-warm/10 text-coral-warm">
                        Page {pagination.page} of {pagination.totalPages}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-deep" />
                    <span className="ml-2 text-gray-600">Finding perfect matches...</span>
                  </div>
                )}

                {/* No Results */}
                {!loading && currentInfluencers.length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <Grid className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900">No influencers found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria or use our AI wizard</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Results Grid */}
                {!loading && currentInfluencers.length > 0 && (
                  <>
                    <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                      {currentInfluencers.map((influencer: Influencer) => (
                        <div key={influencer.id} className="relative">
                          <InfluencerCard influencer={influencer} />
                          {influencer.aiMatchScore && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-purple-rich text-white">
                                <Star className="w-3 h-3 mr-1" />
                                {influencer.aiMatchScore}% match
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {showPagination && (
                      <div className="flex items-center justify-center space-x-4 mt-8">
                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={pagination.page <= 1}
                          className="border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-white"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>

                        <div className="flex items-center space-x-2">
                          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const pageNum = i + 1
                            return (
                              <Button
                                key={pageNum}
                                variant={pagination.page === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className={
                                  pagination.page === pageNum
                                    ? "bg-teal-deep text-white"
                                    : "border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-white"
                                }
                              >
                                {pageNum}
                              </Button>
                            )
                          })}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={pagination.page >= pagination.totalPages}
                          className="border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-white"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="ai-wizard" className="mt-0">
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-purple-rich/10 rounded-full flex items-center justify-center mx-auto">
                        <Sparkles className="w-8 h-8 text-purple-rich" />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900">AI Recommendation Wizard</h3>
                      <p className="text-gray-600">
                        Complete the wizard on the left to get personalized influencer recommendations powered by AI
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-results" className="mt-0">
                {aiRecommendations && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <h2 className="font-semibold text-lg text-gray-900">
                          AI Recommendations ({aiRecommendations.length} matches)
                        </h2>
                        <Badge className="bg-purple-rich/10 text-purple-rich">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI Powered
                        </Badge>
                      </div>
                    </div>

                    <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                      {aiRecommendations.map((influencer: Influencer) => (
                        <div key={influencer.id} className="relative">
                          <InfluencerCard influencer={influencer} />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-purple-rich text-white">
                              <Star className="w-3 h-3 mr-1" />
                              {influencer.aiMatchScore}% match
                            </Badge>
                          </div>
                          {influencer.matchReasons && influencer.matchReasons.length > 0 && (
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-1">
                                <div className="text-xs font-semibold text-purple-rich">Why this match:</div>
                                {influencer.matchReasons.slice(0, 2).map((reason, index) => (
                                  <div key={index} className="text-xs text-gray-600">
                                    • {reason}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
