import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { adminDb } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session

        // Save subscription data to Firebase
        await adminDb.collection("subscriptions").doc(session.id).set({
          customerId: session.customer,
          subscriptionId: session.subscription,
          priceId: session.metadata?.priceId,
          status: "active",
          createdAt: new Date(),
        })
        break

      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription

        // Update subscription status in Firebase
        const subscriptionQuery = await adminDb
          .collection("subscriptions")
          .where("subscriptionId", "==", subscription.id)
          .get()

        if (!subscriptionQuery.empty) {
          const doc = subscriptionQuery.docs[0]
          await doc.ref.update({
            status: subscription.status,
            updatedAt: new Date(),
          })
        }
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription

        // Update subscription status to cancelled in Firebase
        const cancelledQuery = await adminDb
          .collection("subscriptions")
          .where("subscriptionId", "==", deletedSubscription.id)
          .get()

        if (!cancelledQuery.empty) {
          const doc = cancelledQuery.docs[0]
          await doc.ref.update({
            status: "cancelled",
            cancelledAt: new Date(),
          })
        }
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
  }
}
