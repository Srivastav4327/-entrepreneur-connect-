"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Sparkles, Loader2 } from "lucide-react"

interface SmartSearchBarProps {
  onSearch: (query: string, smartFilters?: any) => void
  placeholder?: string
}

export function SmartSearchBar({
  onSearch,
  placeholder = "Try: 'Fashion influencers in NYC with high engagement'",
}: SmartSearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [interpretation, setInterpretation] = useState("")

  const handleSmartSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/smart-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      setSuggestions(data.suggestions || [])
      setInterpretation(data.interpretation || "")
      onSearch(query, data.smartFilters)
    } catch (error) {
      console.error("Smart search failed:", error)
      onSearch(query)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSmartSearch()
    }
  }

  useEffect(() => {
    if (query.length > 3) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query])

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="pl-10 pr-32 h-12 text-lg border-2 border-gray-200 focus:border-teal-deep"
        />
        <Button
          onClick={handleSmartSearch}
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-coral-warm hover:bg-coral-light text-white px-4 py-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-1" />
              AI Search
            </>
          )}
        </Button>
      </div>

      {interpretation && (
        <div className="mt-3">
          <Badge className="bg-purple-rich/10 text-purple-rich">
            <Sparkles className="w-3 h-3 mr-1" />
            {interpretation}
          </Badge>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 mb-3">AI Suggestions:</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion)
                    setShowSuggestions(false)
                  }}
                  className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
