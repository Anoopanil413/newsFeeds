import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, CloudRain, MessageSquare, BarChart3 } from "lucide-react"

export default function FutureSection() {
  const roadmapFeatures = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Offline-first mobile app for iOS and Android with sync capabilities",
      timeline: "Q2 2024",
      timelineColor: "bg-blue-100 text-blue-600",
    },
    {
      icon: CloudRain,
      title: "Weather Integration",
      description: "Real-time weather alerts and route-specific maritime forecasts",
      timeline: "Q3 2024",
      timelineColor: "bg-green-100 text-green-600",
    },
    {
      icon: MessageSquare,
      title: "Crew Communication",
      description: "Secure messaging and bulletin board for vessel crews",
      timeline: "Q4 2024",
      timelineColor: "bg-purple-100 text-purple-600",
    },
    {
      icon: BarChart3,
      title: "Port Analytics",
      description: "AI-powered port congestion and arrival time predictions",
      timeline: "Q1 2025",
      timelineColor: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Button variant="outline" className="mb-6 text-blue-600 border-blue-200 bg-blue-50">
            🚀 Coming Soon
          </Button>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">The Future of Maritime Intelligence</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&#39;re continuously expanding our platform to serve the maritime community better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {roadmapFeatures.map((feature, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-gray-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${feature.timelineColor}`}>
                  {feature.timeline}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Want to influence our roadmap?</p>
          <Button variant="link" className="text-blue-600 hover:text-blue-700 text-lg">
            Join our advisory board
          </Button>
        </div>
      </div>
    </section>
  )
}
