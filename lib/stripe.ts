import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const handleStripePayment = async (priceId: string) => {
  const stripe = await stripePromise

  if (!stripe) {
    throw new Error("Stripe failed to initialize")
  }

  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
      }),
    })

    const session = await response.json()

    if (session.error) {
      throw new Error(session.error)
    }

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      throw new Error(result.error.message)
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}
