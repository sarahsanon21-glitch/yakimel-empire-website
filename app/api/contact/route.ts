import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function generateTicketNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `YE-${timestamp}${random}`;
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ticketNumber = generateTicketNumber();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to Yakimel Empire team
    await transporter.sendMail({
      from: `"Yakimel Empire Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New contact form message — ${ticketNumber}`,
      text: `Ticket: ${ticketNumber}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // Auto-confirmation email to the customer
    await transporter.sendMail({
      from: `"Yakimel Empire LLC Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your request — Ticket ${ticketNumber}`,
      text: `Hi ${name},

Thank you for contacting Yakimel Empire LLC Support.

We have successfully received your request, and a support ticket has been created.

Ticket Number: ${ticketNumber}

Our team will review your request and respond within 24-48 business hours. Response times may vary during weekends, holidays, or periods of high support volume.

Please avoid submitting multiple tickets for the same issue, as this may delay the review process. If you need to provide additional information, documents, or screenshots, simply reply to this email and they will be added to your existing request.

We appreciate your patience and thank you for contacting Yakimel Empire LLC.

Best regards,
Yakimel Empire LLC Support Team
support@yakimelempire.com

This is an automated confirmation message. Your request has been received and is awaiting review.`,
    });

    return NextResponse.json({ success: true, ticketNumber });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}