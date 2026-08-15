import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function generateTicketNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `YE-PROJ-${timestamp}${random}`;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      fullName,
      companyName,
      email,
      phone,
      projectType,
      budget,
      timeline,
      description,
      existingWebsite,
      additionalInfo,
    } = data;

    if (!fullName || !email || !projectType || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ticketNumber = generateTicketNumber();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const detailsText = `Ticket: ${ticketNumber}

Full Name: ${fullName}
Company: ${companyName || "N/A"}
Email: ${email}
Phone: ${phone || "N/A"}
Project Type: ${projectType}
Estimated Budget: ${budget || "N/A"}
Desired Timeline: ${timeline || "N/A"}
Existing Website: ${existingWebsite || "N/A"}

Project Description:
${description}

Additional Information:
${additionalInfo || "N/A"}`;

    await transporter.sendMail({
      from: `"Yakimel Empire Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New project request — ${projectType} — ${ticketNumber}`,
      text: detailsText,
    });

    await transporter.sendMail({
      from: `"Yakimel Empire LLC" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your project request — Ticket ${ticketNumber}`,
      text: `Hi ${fullName},

Thank you for reaching out to Yakimel Empire LLC.

We have successfully received your project request, and a reference ticket has been created.

Ticket Number: ${ticketNumber}
Project Type: ${projectType}

Our team will review your request and contact you regarding a consultation within 24-48 business hours. Response times may vary during weekends, holidays, or periods of high volume.

If you need to provide additional information, documents, or references, simply reply to this email and they will be added to your existing request.

We appreciate your interest and look forward to discussing your project.

Best regards,
Yakimel Empire LLC
info@yakimelempire.com

This is an automated confirmation message. Your request has been received and is awaiting review.`,
    });

    return NextResponse.json({ success: true, ticketNumber });
  } catch (error) {
    console.error("Consultation form error:", error);
    return NextResponse.json({ error: "Failed to send request" }, { status: 500 });
  }
}