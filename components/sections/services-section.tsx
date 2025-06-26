"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input" // Import Input for email field
import { Bot, MousePointer, Globe } from "lucide-react"
import { httpsCallable } from 'firebase/functions';
import { sendSignInLinkToEmail } from "firebase/auth" // For sending magic link if not logged in
import { useAuth } from "../auth-provider"
import { auth, functions } from "@/lib/firebase"

export default function ServicesSection() {
  const { user, loading: authLoading } = useAuth(); // Get user and loading state from AuthProvider
  const [emailInput, setEmailInput] = useState(""); // State for email input
  const [requestLoading, setRequestLoading] = useState(false); // Loading state for sample request
  const [requestMessage, setRequestMessage] = useState(""); // Message for sample request feedback
  const [showEmailInput, setShowEmailInput] = useState(false); // State to toggle email input visibility

  const features = [
    {
      icon: Bot,
      iconBg: "bg-blue-600",
      title: "Smart Curation",
      description:
        "AI analyzes maritime relevance, crew nationality preferences, and vessel type to deliver personalized content.",
      features: ["Politics & Trade Policy", "Weather & Route Planning", "Safety Regulations", "Technology Updates"],
    },
    {
      icon: MousePointer,
      iconBg: "bg-orange-700",
      title: "Bandwidth Optimized",
      description:
        "Compressed to under 50KB per email with essential images and safety posters optimized for satellite connections.",
      features: ["90% size reduction", "Text-optimized format", "Critical images only", "Offline reading ready"],
    },
    {
      icon: Globe,
      iconBg: "bg-green-600",
      title: "Global Reach",
      description:
        "Content tailored for Indian, Filipino, Ukrainian, and Chinese crew with region-specific maritime news and safety updates.",
      features: ["Multi-language summaries", "Regional regulations", "Cultural considerations", "Local port updates"],
    },
  ];

  const handleSampleNewsletterRequest = async () => {
    setRequestMessage(""); // Clear previous messages
    setRequestLoading(true);

    if (user) {
      // User is authenticated, directly request newsletter
      try {
        const requestNews = httpsCallable(functions, 'requestNewsletter');
        const result = await requestNews();
        const data = result.data as { message: string };
        setRequestMessage(`Success: ${data.message}`);
        console.log('Sample newsletter request result:', data);
      } catch (error: unknown) {
        console.error('Error requesting sample newsletter:', error);
        if (error instanceof Error) {
          setRequestMessage(`Error: ${error.message}`);
        } else {
          setRequestMessage('Error: Failed to send sample newsletter.');
        }
      }
    } else {
      // User is not authenticated, check email input or show it
      if (emailInput) {
        // Send magic link for sign-in and then the newsletter
        try {
          const actionCodeSettings = {
            url: `${window.location.origin}/`, // Redirect to homepage after sign-in
            handleCodeInApp: true,
          };
          await sendSignInLinkToEmail(auth, emailInput, actionCodeSettings);
          localStorage.setItem('emailForSignIn', emailInput);
          setRequestMessage("A sign-in link has been sent to your email. Please click it to receive the sample newsletter.");
          setShowEmailInput(false); // Hide input after sending link
        } catch (error: unknown) {
          console.error("Error sending sign-in link for sample:", error);
          if (error instanceof Error) {
            setRequestMessage(`Error: ${error.message}`);
          } else {
            setRequestMessage('Error: Failed to send sign-in link.');
          }
        }
      } else {
        // No email input, show the input field
        setShowEmailInput(true);
        setRequestMessage("Please enter your email to receive a sample newsletter.");
      }
    }
    setRequestLoading(false);
  };

  return (
    <section className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">AI-Powered Maritime Intelligence</h2>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Our advanced AI scans thousands of maritime sources daily, compressing essential news into bite-sized
            updates perfect for shipboard connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-800/60 border-slate-700/50 hover:scale-105 transition-all duration-300 ease-out hover:bg-slate-800/80 hover:border-slate-600/60"
            >
              <CardContent className="p-8">
                <div className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-8`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">{feature.title}</h3>

                <p className="text-gray-400 mb-8 leading-relaxed text-base">{feature.description}</p>

                <ul className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-400 text-sm">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          {!authLoading && (
            <>
              {user ? (
                // If user is logged in, just show the button to request
                <Button
                  onClick={handleSampleNewsletterRequest}
                  disabled={requestLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-base font-semibold rounded-lg"
                >
                  {requestLoading ? "Sending Sample..." : "See Sample Newsletter"}
                </Button>
              ) : (
                // If user is not logged in, show email input or trigger button
                <>
                  {!showEmailInput ? (
                    <Button
                      onClick={handleSampleNewsletterRequest}
                      disabled={requestLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-base font-semibold rounded-lg"
                    >
                      {requestLoading ? "Processing..." : "See Sample Newsletter (Email Required)"}
                    </Button>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-sm mx-auto">
                      <Input
                        type="email"
                        placeholder="your.email@company.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        disabled={requestLoading}
                        className="flex-1 h-12 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      />
                      <Button
                        onClick={handleSampleNewsletterRequest}
                        disabled={requestLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-12"
                      >
                        {requestLoading ? "Sending..." : "Get Sample"}
                      </Button>
                    </div>
                  )}
                </>
              )}
              {requestMessage && <p className="mt-4 text-base text-gray-300">{requestMessage}</p>}
            </>
          )}
          {authLoading && <p className="mt-4 text-base text-gray-300">Loading user status...</p>}
        </div>
      </div>

    </section>
  );
}
