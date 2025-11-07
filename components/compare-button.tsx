"use client"

import { Button } from "@/components/ui/button"
import { useCompareStore } from "@/lib/compare-store"
import { Scale, Plus, Check } from "lucide-react"
import Link from "next/link"

interface CompareButtonProps {
  influencer?: any
  variant?: "add" | "view"
}

export function CompareButton({ influencer, variant = "add" }: CompareButtonProps) {
  const { selectedInfluencers, addInfluencer, isSelected } = useCompareStore()

  if (variant === "view") {
    return (
      <Link href="/compare">
        <Button
          variant="outline"
          className="border-purple-rich text-purple-rich hover:bg-purple-rich hover:text-white bg-transparent"
          disabled={selectedInfluencers.length === 0}
        >
          <Scale className="w-4 h-4 mr-2" />
          Compare ({selectedInfluencers.length})
        </Button>
      </Link>
    )
  }

  if (!influencer) return null

  const selected = isSelected(influencer.id)
  const canAdd = selectedInfluencers.length < 4

  return (
    <Button
      variant={selected ? "default" : "outline"}
      size="sm"
      onClick={() => !selected && canAdd && addInfluencer(influencer)}
      disabled={selected || !canAdd}
      className={
        selected
          ? "bg-purple-rich text-white"
          : "border-purple-rich text-purple-rich hover:bg-purple-rich hover:text-white"
      }
    >
      {selected ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          Added
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-1" />
          Compare
        </>
      )}
    </Button>
  )
}
