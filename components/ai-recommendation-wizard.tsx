"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, Target } from "lucide-react"

interface AIRecommendationWizardProps {
  onRecommendations: (data: any) => void
}

export function AIRecommendationWizard({ onRecommendations }: AIRecommendationWizardProps) {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    brandDescription: "",
    targetAudience: "",
    campaignGoals: "",
    budget: "",
  })

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      onRecommendations(data)
    } catch (error) {
      console.error("Failed to get AI recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  if (step === 1) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-rich" />
            <span>AI-Powered Recommendations</span>
          </CardTitle>
          <p className="text-gray-600">Tell us about your brand and we'll find perfect influencer matches</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand Description</Label>
            <Textarea
              id="brand"
              placeholder="Describe your brand, products, and values..."
              value={formData.brandDescription}
              onChange={(e) => updateFormData("brandDescription", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              placeholder="e.g., Young professionals, fitness enthusiasts, parents..."
              value={formData.targetAudience}
              onChange={(e) => updateFormData("targetAudience", e.target.value)}
            />
          </div>

          <Button
            onClick={() => setStep(2)}
            disabled={!formData.brandDescription || !formData.targetAudience}
            className="w-full bg-coral-warm hover:bg-coral-light text-white"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-teal-deep" />
          <span>Campaign Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="goals">Campaign Goals</Label>
          <Select value={formData.campaignGoals} onValueChange={(value) => updateFormData("campaignGoals", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your primary goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
              <SelectItem value="sales-conversion">Sales & Conversion</SelectItem>
              <SelectItem value="engagement">Engagement & Community</SelectItem>
              <SelectItem value="product-launch">Product Launch</SelectItem>
              <SelectItem value="content-creation">Content Creation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range</Label>
          <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="limited">Limited ($1K - $5K)</SelectItem>
              <SelectItem value="moderate">Moderate ($5K - $20K)</SelectItem>
              <SelectItem value="substantial">Substantial ($20K - $50K)</SelectItem>
              <SelectItem value="enterprise">Enterprise ($50K+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !formData.campaignGoals || !formData.budget}
            className="flex-1 bg-coral-warm hover:bg-coral-light text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
