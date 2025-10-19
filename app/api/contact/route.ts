import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // ✅ Get all data from frontend
    const {
      firstName,
      lastName,
      email,
      comments,
      phoneNumber,
      zipCode,
      captchaToken, // ✅ Add captchaToken
    } = await req.json();

    // ✅ Validate required fields
    if (!firstName || !lastName || !email || !comments) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Validate CAPTCHA before doing anything else
    if (!captchaToken) {
      return NextResponse.json(
        { error: "Missing CAPTCHA token" },
        { status: 400 }
      );
    }

    // Verify CAPTCHA with Google API
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const { data: captchaRes } = await axios.post(
      verifyUrl,
      new URLSearchParams({
        secret: secretKey || "",
        response: captchaToken,
      })
    );

    if (!captchaRes.success) {
      console.error("❌ CAPTCHA verification failed:", captchaRes);
      return NextResponse.json(
        { error: "CAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // ✅ CAPTCHA passed — continue with email sending
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // Use App Password
      },
    });

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
            <td style="padding: 8px 0;">${phoneNumber || "N/A"}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px 0; color: black; font-style: italic;"><strong>ZIP Code:</strong></td>
            <td style="padding: 8px 0;">${zipCode || "N/A"}</td>
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
  } catch (error: unknown) {
    // ✅ Handle errors safely (no `any`)
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    console.error("❌ Error sending email:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
