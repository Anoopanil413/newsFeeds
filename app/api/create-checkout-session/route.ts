// import { type NextRequest, NextResponse } from "next/server"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-05-28.basil",
// })

// export async function POST(request: NextRequest) {
//   try {
//     const { priceId } = await request.json()

//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#pricing`,
//       metadata: {
//         priceId,
//       },
//     })

//     return NextResponse.json({ id: session.id })
//   } catch (error) {
//     console.error("Error creating checkout session:", error)
//     return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
//   }
// }

export async function POST() {
  return new Response(JSON.stringify({ message: "Dummy API response" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
