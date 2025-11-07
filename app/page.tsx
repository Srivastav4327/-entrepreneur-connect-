import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, TrendingUp, Zap, Star, ArrowRight, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/server"
import { UserNav } from "@/components/user-nav"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-teal-coral rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-teal-deep">AIX</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-teal-deep transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-teal-deep transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-teal-deep transition-colors">
                About
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button asChild className="bg-coral-warm hover:bg-coral-light text-white">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserNav user={user} />
                </div>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-white bg-transparent"
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-coral-warm hover:bg-coral-light text-white">
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-rich/10 text-purple-rich border-purple-rich/20">AI-Powered Discovery</Badge>
                <h1 className="font-display font-bold text-5xl lg:text-6xl leading-tight">
                  Find Perfect
                  <span className="text-coral-warm"> Influencers</span>
                  <br />
                  in Seconds
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover, analyze, and connect with influencers who perfectly match your brand using advanced AI
                  technology. Transform your influencer marketing with data-driven insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Button asChild size="lg" className="bg-coral-warm hover:bg-coral-light text-white px-8 py-4 text-lg">
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="bg-coral-warm hover:bg-coral-light text-white px-8 py-4 text-lg">
                    <Link href="/auth/sign-up">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-white px-8 py-4 text-lg bg-transparent"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-teal-deep">10M+</div>
                  <div className="text-sm text-gray-600">Influencers</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-teal-deep">500+</div>
                  <div className="text-sm text-gray-600">Brands</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-teal-deep">98%</div>
                  <div className="text-sm text-gray-600">Match Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-semibold text-lg">Top Matches</h3>
                        <Badge className="bg-coral-warm/10 text-coral-warm">AI Recommended</Badge>
                      </div>

                      {[
                        {
                          name: "Sophia Chen",
                          category: "Fashion",
                          followers: "850K",
                          engagement: "4.2%",
                          match: "98%",
                        },
                        {
                          name: "Jake Thompson",
                          category: "Fitness",
                          followers: "920K",
                          engagement: "4.5%",
                          match: "96%",
                        },
                        {
                          name: "Isabella Rodriguez",
                          category: "Beauty",
                          followers: "1.2M",
                          engagement: "5.1%",
                          match: "94%",
                        },
                      ].map((influencer, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                          <div className="w-12 h-12 bg-gradient-purple-coral rounded-full flex items-center justify-center text-white font-semibold">
                            {influencer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{influencer.name}</div>
                            <div className="text-sm text-gray-600">
                              {influencer.category} • {influencer.followers} followers
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-coral-warm">{influencer.match}</div>
                            <div className="text-sm text-gray-600">{influencer.engagement} eng.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-teal-coral rounded-full opacity-10 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-purple-coral rounded-full opacity-10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-teal-deep/10 text-teal-deep border-teal-deep/20">Powerful Features</Badge>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900">
              Everything You Need to
              <span className="text-purple-rich"> Scale</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive tools to discover, analyze, and manage influencer
              partnerships at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "AI-Powered Search",
                description: "Find influencers using natural language queries and advanced AI matching algorithms.",
                color: "coral-warm",
              },
              {
                icon: TrendingUp,
                title: "Performance Analytics",
                description: "Deep insights into engagement rates, audience demographics, and campaign performance.",
                color: "purple-rich",
              },
              {
                icon: Users,
                title: "Audience Analysis",
                description: "Understand influencer audiences with detailed demographic and psychographic data.",
                color: "teal-deep",
              },
              {
                icon: Star,
                title: "Brand Safety Scoring",
                description: "AI-powered brand safety analysis to protect your reputation and ensure alignment.",
                color: "coral-warm",
              },
              {
                icon: CheckCircle,
                title: "Campaign Management",
                description: "Streamline your influencer campaigns from discovery to performance tracking.",
                color: "purple-rich",
              },
              {
                icon: Zap,
                title: "Real-time Insights",
                description: "Get instant notifications and updates on influencer performance and trends.",
                color: "teal-deep",
              },
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8 space-y-4">
                  <div
                    className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-teal-coral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white">
              Ready to Transform Your
              <br />
              Influencer Marketing?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join hundreds of brands already using AIX to discover perfect influencer matches and drive exceptional
              campaign results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-teal-deep hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-teal-deep hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/auth/sign-up">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-deep px-8 py-4 text-lg bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-teal-coral rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl">AIX</span>
              </div>
              <p className="text-gray-400">
                AI-powered influencer discovery platform helping brands connect with perfect creators.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Integrations</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Status</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AIX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
