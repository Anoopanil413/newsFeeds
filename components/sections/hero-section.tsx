"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Users, Wifi, TrendingDown } from "lucide-react"
import { auth } from "@/lib/firebase" // Adjust path to firebaseClient
import { sendSignInLinkToEmail } from "firebase/auth"
import { useAuth } from "@/components/auth-provider" // Import useAuth hook

export default function HeroSection() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth(); // Get user and auth loading state
    const [trialStarted, setTrialStarted] = useState(false); // New state to manage UI after link sent


  const handleSubscribeClick = async () => {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("Sending magic link to your email...");
        setTrialStarted(false); // Reset in case of re-attempt


    try {
      const actionCodeSettings = {
        // This URL is where the user will be redirected AFTER clicking the email link AND successful sign-in.
        // It must be an authorized redirect domain in your Firebase project settings.
        url: `${window.location.origin}/`,
        handleCodeInApp: true, // This tells Firebase to handle the redirect within your app
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem('emailForSignIn', email); // Store email for verification on the pricing page
      setMessage("A magic sign-in link has been sent to your email! Please check your inbox to continue.");
            setTrialStarted(true); // Indicate that the link has been sent for trial

    } catch (error: unknown) {
      console.error("Error sending sign-in link:", error);
      let errorMessage = "An unknown error occurred. Please try again.";
      if (error && typeof error === "object" && "message" in error) {
        errorMessage = `Error: ${(error as { message: string }).message}. Please try again.`;
      }
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // If user is already logged in, redirect them to pricing/dashboard
  useEffect(() => {
    if (!authLoading && user && !trialStarted) {
      router.push('/'); // Or '/dashboard' if you have one ready
    }
  }, [user, authLoading, router,trialStarted]);

  if (authLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p>Loading application...</p>
      </section>
    );
  }

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <span className="mr-2">📧</span>
              AI-Powered Maritime Intelligence
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Maritime News
                <span className="block text-blue-600">Made Simple</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                AI-curated daily maritime news delivered to your inbox. Compressed for low bandwidth, personalized for
                your crew, and optimized for life at sea.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={handleSubscribeClick}
                disabled={loading || trialStarted} // Disable if already sending link
              >
                {loading ? "Sending..." : (trialStarted ? "Link Sent!" : "Start Free Trial")}
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium">500+ Active Seafarers</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Low Bandwidth Optimized</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <TrendingDown className="h-5 w-5 text-blue-600" />
                <span className="font-medium">90% Compression Rate</span>
              </div>
            </div>
          </div>

          {/* Right Content - Video Demo & Subscription */}
          <div className="relative space-y-6">
            {/* Video Demo Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">See How It Works</h3>
                  <p className="text-blue-100 text-lg">Watch our 2-minute demo</p>
                </div>
                <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span>AI Maritime News Curation Demo</span>
                    <span>2:15</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="bg-white rounded-2xl p-6 shadow-xl ">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Enter Email and Start Subscription</h4>
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="your.email@company.com"
                  className="flex-1 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <Button
                  className="bg-blue-600 hover:bg-blue-700 px-6 h-12"
                  onClick={handleSubscribeClick}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                14-day free trial • No credit card required (You&#39;ll receive a magic link to sign in and choose your plan)
              </p>
              {message && <p className="text-sm text-center mt-3">{message}</p>}
            </div>

            {/* Bottom right corner text */}
            <div className="absolute -bottom-4 -right-4 text-right">
              <p className="text-gray-400 text-sm">Activate Windows</p>
              <p className="text-gray-400 text-xs">Go to Settings to activate Windows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}