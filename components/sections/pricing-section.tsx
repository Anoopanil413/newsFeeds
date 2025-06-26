"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { loadStripe } from '@stripe/stripe-js'
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/lib/firebase' // Adjust path to firebaseClient
import { useAuth } from "@/components/auth-provider" // Import useAuth hook

export default function PricingSection() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth(); // Get user and auth loading state from AuthProvider
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  // Important: Replace these with your actual Stripe Price IDs from your Stripe Dashboard
  const plans = [
    {
      name: "6-Month Plan",
      price: "$60",
      description: "Perfect for short contracts",
      features: [
        "Daily curated maritime news",
        "International safety posters",
        "Low-bandwidth optimization",
        "Regional personalization",
        "Mobile-friendly format",
      ],
      priceId: "price_1PQRS1F45yG8hSg1LwXpT2u0", // <--- REPLACE with your actual Stripe Price ID
      popular: false,
      buttonText: "Start 6-Month Plan",
    },
    {
      name: "Annual Plan",
      price: "$100",
      description: "Save $20 per year",
      features: [
        "Everything in 6-Month Plan",
        "Priority customer support",
        "Early access to new features",
        "Custom content requests",
        "Fleet manager dashboard",
      ],
      priceId: "price_1XYZ1F45yG8hSg1LwXpT2u0", // <--- REPLACE with your actual Stripe Price ID
      popular: true,
      buttonText: "Start Annual Plan",
    },
  ]

  // Initialize Stripe outside component render to avoid recreation
  // Use environment variable for the Stripe Public/Publishable Key
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const handlePlanSelect = async (priceId: string) => {
    if (!user) {
      setFeedbackMessage("Please sign in or complete email verification to subscribe.");
      return;
    }

    setPaymentLoading(true);
    setFeedbackMessage("Redirecting to secure checkout...");

    try {
      const createCheckoutSession = httpsCallable(functions, 'createStripeCheckoutSession');
      const { data } = await createCheckoutSession({
        priceId: priceId,
        returnUrl: `${window.location.origin}/subscription-status`, // Redirect after checkout
      });

      // Assert the type of data to ensure sessionId exists
      const sessionData = data as { sessionId: string };

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionData.sessionId,
        });

        if (error) {
          console.error("Stripe Checkout Error:", error);
          setFeedbackMessage(`Payment error: ${error.message}`);
        }
      } else {
        setFeedbackMessage("Stripe.js not loaded. Please try again.");
      }
    } catch (error: unknown) {
      console.error("Error initiating payment:", error);
      if (error instanceof Error) {
        setFeedbackMessage(`Failed to initiate payment: ${error.message}`);
      } else {
        setFeedbackMessage("Failed to initiate payment due to an unknown error.");
      }
    } finally {
      setPaymentLoading(false);
    }
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      // If user is not loaded and not authenticated, redirect to home page
      router.push('/');
    }
  }, [user, authLoading, router]);


  if (authLoading) {
    return (
      <section id="pricing" className="py-20 bg-gray-50 flex items-center justify-center min-h-screen">
        <p>Loading user and checking authentication status...</p>
      </section>
    );
  }

  // If not authenticated, display a message and allow navigation back
  if (!user) {
    return (
      <section id="pricing" className="py-20 bg-gray-50 text-center flex items-center justify-center min-h-screen">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In to Choose a Plan</h2>
          <p className="text-xl text-gray-600 mb-6">
            If you just entered your email, please check your inbox for a sign-in link.
          </p>
          <Button onClick={() => router.push('/')}>Go back to Home</Button>
          {feedbackMessage && <p className="mt-4 text-red-500">{feedbackMessage}</p>}
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Button variant="outline" className="mb-6 text-blue-600 border-blue-200 bg-blue-50">
            ⭐ Simple, Transparent Pricing
          </Button>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible pricing for vessels of all sizes.
          </p>
          {feedbackMessage && <p className={`mt-4 text-center ${feedbackMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{feedbackMessage}</p>}
          <p className="text-lg text-gray-700 mt-4">Currently signed in as: <strong>{user.email}</strong></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular ? "border-blue-300 bg-blue-50/50 shadow-lg" : "border-gray-200 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-blue-600">{plan.price}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-semibold"
                  onClick={() => handlePlanSelect(plan.priceId)}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? "Processing..." : plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">14-day free trial • Cancel anytime • No setup fees</p>
          <Button variant="outline" className="text-gray-600 border-gray-300">
            Enterprise Solutions Available
          </Button>
        </div>
      </div>
    </section>
  )
}
