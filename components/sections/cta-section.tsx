import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, HelpCircle, User, Phone, Clock } from "lucide-react"

export default function CtaSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Button variant="outline" className="mb-6 text-blue-600 border-blue-200 bg-blue-50">
            🚀 Get Started Today
          </Button>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Start Your Free Trial</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join maritime professionals worldwide who trust us for their daily news. No commitment required.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Form - Start Free Trial */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                Start Free Trial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="email" placeholder="Your email address" className="h-12" />

              <Input type="text" placeholder="Your vessel/company name" className="h-12" />

              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your primary region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="middle-east">Middle East</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Primary crew nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="filipino">Filipino</SelectItem>
                  <SelectItem value="ukrainian">Ukrainian</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-semibold">
                Start 14-Day Free Trial
              </Button>

              <p className="text-sm text-gray-500 text-center">
                No credit card required • Cancel anytime • Full access during trial
              </p>
            </CardContent>
          </Card>

          {/* Right Form - Have Questions */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
                Have Questions?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="text" placeholder="Your name" className="h-12" />

              <Input type="email" placeholder="Email address" className="h-12" />

              <Textarea
                placeholder="Tell us about your vessel, crew size, and specific needs..."
                className="min-h-[120px] resize-none"
              />

              <Button variant="outline" className="w-full h-12 text-blue-600 border-blue-200 hover:bg-blue-50">
                Send Message
              </Button>

              {/* Contact Information */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="font-medium">Name:</span>
                    <span className="ml-2">Jaishree</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2 text-blue-600">operations@shipveda.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="font-medium">Phone:</span>
                    <span className="ml-2">+91 9619319739</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="font-medium">Response time:</span>
                    <span className="ml-2 text-green-600">Under 4 hours</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
