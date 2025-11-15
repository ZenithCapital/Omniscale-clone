"use server"

import { submitToGoHighLevel } from "@/lib/gohighlevel"

export async function handleFormSubmission(formData: FormData) {
  const data = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    countryCode: formData.get("countryCode") as string,
  }

  try {
    // Submit to GoHighLevel
    const result = await submitToGoHighLevel(data)

    // You could also save to your own database here if needed

    return { success: true, data: result }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false, error: "Failed to submit form" }
  }
}
