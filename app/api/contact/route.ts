"use server"
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, comments, phoneNumber, zipCode } = await req.json();

    if (!firstName || !lastName || !email || !comments) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure transporter using your Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your Gmail
        pass: process.env.GMAIL_PASS, // App password (not your real Gmail password)
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Globe Life | Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Message from ${firstName} ${lastName}`,
      html: `
  <div style="
    font-family: 'Segoe UI', Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
  ">
    <div style="
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    ">

      <!-- Header -->
      <div style="
        background-color: #00558C;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      ">
        <h2 style="margin: 0; font-size: 22px;">📩 New Contact Form Submission</h2>
      </div>

      <!-- Body -->
      <div style="padding: 25px 30px;">
        <h3 style="color: black; margin-top: 0; margin-bottom: 20px;">
          Contact Details
        </h3>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; width: 30%; color: black; font-style: italic;"><strong>Name:</strong></td>
            <td style="padding: 8px 0;">${firstName} ${lastName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px 0; color: black; font-style: italic;"><strong>Email:</strong></td>
            <td style="padding: 8px 0;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: black; font-style: italic;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0;">${phoneNumber}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px 0; color: black; font-style: italic;"><strong>ZIP Code:</strong></td>
            <td style="padding: 8px 0;">${zipCode}</td>
          </tr>
        </table>

        <div style="margin-top: 25px;">
          <p style="color: black; font-style: italic; margin-bottom: 8px;"><strong>Message:</strong></p>
          <div style="
            background-color: #f8f9fa;
            border-left: 4px solid #2EA24F;
            padding: 12px 15px;
            border-radius: 4px;
            color: #333;
            line-height: 1.6;
          ">
            ${comments}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background-color: #2EA24F;
        color: #ffffff;
        text-align: center;
        padding: 12px;
        font-size: 13px;
      ">
        <p style="margin: 0;">Sent from your website contact form.</p>
      </div>
    </div>
  </div>
`,

    });

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
