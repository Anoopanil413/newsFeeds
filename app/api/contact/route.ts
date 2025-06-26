import { type NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
// Ensure your service account JSON includes "project_id" and is loaded correctly in firebase-admin initialization.

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Save contact form submission to Firebase
    const contactRef = await adminDb.collection("contacts").add({
      name,
      email,
      company: company || "",
      message,
      createdAt: new Date(),
      status: "new",
    })

    // Here you could also send an email notification
    // using a service like SendGrid, Resend, etc.

    return NextResponse.json({
      success: true,
      id: contactRef.id,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}
