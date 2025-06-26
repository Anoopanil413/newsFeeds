import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Captain Rajesh Patel",
      role: "Master Mariner",
      company: "Indian Maritime Fleet",
      avatar: "JN",
      avatarBg: "bg-blue-600",
      rating: 5,
      content:
        "Finally, maritime news that doesn't eat up our satellite data. The AI curation is spot-on for what my crew needs to know.",
    },
    {
      name: "Chief Engineer Maria Santos",
      role: "Chief Engineer",
      company: "Philippines Shipping Corp",
      avatar: "PH",
      avatarBg: "bg-blue-600",
      rating: 5,
      content:
        "The safety posters and regional updates have been invaluable. My engineering team stays informed without the bandwidth burden.",
    },
    {
      name: "Fleet Manager Chen Wei",
      role: "Fleet Operations",
      company: "Pacific Maritime Lines",
      avatar: "CN",
      avatarBg: "bg-blue-600",
      rating: 5,
      content:
        "Managing 15 vessels means I need efficient communication. This service delivers exactly what each crew needs to know.",
    },
    {
      name: "Captain Oleksandr Kovalenko",
      role: "Deck Officer",
      company: "Ukrainian Maritime Services",
      avatar: "UA",
      avatarBg: "bg-blue-600",
      rating: 5,
      content:
        "Staying connected with global maritime news while at sea was always a challenge. Not anymore. Excellent service.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Button variant="outline" className="mb-6 text-blue-600 border-blue-200 bg-blue-50">
            ⭐ Customer Stories
          </Button>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Trusted by Maritime Professionals</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of seafarers and fleet managers who rely on our curated maritime intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">{testimonial.content}</p>

                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className={`${testimonial.avatarBg} text-white font-semibold`}>
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-blue-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
