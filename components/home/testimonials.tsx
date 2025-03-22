import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrustScoreBadge } from "@/components/trust-score/trust-score-badge"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: "1",
    content:
      "SurfyPal transformed how I travel. The Trust Score system gave me confidence to stay with locals, and I've made amazing friends worldwide. As my score increased, I enjoyed lower collateral requirements too!",
    author: {
      name: "Sarah Johnson",
      role: "Digital Nomad",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 87,
    },
  },
  {
    id: "2",
    content:
      "As a host, I love that I can set Trust Score requirements for bookings. It ensures I welcome respectful guests, and the blockchain-based system makes everything transparent and fair.",
    author: {
      name: "Miguel Rodriguez",
      role: "Host in Barcelona",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 92,
    },
  },
  {
    id: "3",
    content:
      "The World ID verification made me feel secure from day one. Starting with a Yellow Tier score was perfect, and after a few positive reviews, my Trust Score improved quickly, opening up more travel opportunities.",
    author: {
      name: "Aisha Patel",
      role: "Adventure Traveler",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 78,
    },
  },
]

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="flex h-full flex-col">
          <CardContent className="flex-1 pt-6">
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground">{testimonial.content}</p>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{testimonial.author.name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{testimonial.author.role}</span>
                  <TrustScoreBadge score={testimonial.author.trustScore} size="sm" />
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

