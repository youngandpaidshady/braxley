import { NextRequest, NextResponse } from "next/server";

// Email service configuration
// You can use Resend, SendGrid, Nodemailer, or any email service
// For this example, we'll use a simple fetch to Resend API

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_EMAIL || "Braxleynevimllc@outlook.com";
// Use Resend's test domain for easy setup (no domain verification needed)
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, budgetRange, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email content
    const emailSubject = `New Project Inquiry from ${name}`;
    const emailBody = `
New Project Inquiry

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}

Project Details:
- Project Type: ${projectType || "Not specified"}
- Budget Range: ${budgetRange || "Not specified"}

Message:
${message}

---
This email was sent from the Braxley Nevim contact form.
    `.trim();

    // Option 1: Using Resend (recommended for production)
    if (RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          reply_to: email,
          subject: emailSubject,
          text: emailBody,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                New Project Inquiry
              </h2>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #666; margin-bottom: 10px;">Contact Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #666; margin-bottom: 10px;">Project Details</h3>
                <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
                <p><strong>Budget Range:</strong> ${budgetRange || "Not specified"}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #666; margin-bottom: 10px;">Message</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="color: #999; font-size: 12px;">
                This email was sent from the Braxley Nevim contact form.
              </p>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.json();
        throw new Error(error.message || "Failed to send email");
      }

      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Option 2: Fallback - Using Nodemailer (if you prefer)
    // This requires installing nodemailer: npm install nodemailer
    // Uncomment and configure if you want to use Nodemailer instead

    // Option 3: Fallback - Log to console (for development)
    console.log("Email would be sent:", {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: emailSubject,
      body: emailBody,
    });

    // For development, return success even without email service
    return NextResponse.json(
      { 
        message: "Form submitted successfully (development mode - email not sent)",
        note: "Set RESEND_API_KEY environment variable to enable email sending"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
