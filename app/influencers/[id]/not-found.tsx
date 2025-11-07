import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserX, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 border-0 shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-coral-warm/10 rounded-full flex items-center justify-center mx-auto">
            <UserX className="w-8 h-8 text-coral-warm" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display font-bold text-2xl text-gray-900">Influencer Not Found</h1>
            <p className="text-gray-600">
              The influencer you're looking for doesn't exist or may have been removed from our platform.
            </p>
          </div>
          <Button asChild className="bg-teal-deep hover:bg-teal-light text-white">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
