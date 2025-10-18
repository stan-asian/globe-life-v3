import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;
    const city = formData.get("city") as string;
    const country = formData.get("country") as string;
    const comments = formData.get("comments") as string;
    const authorized = formData.get("authorized") as string;
    const felony = formData.get("felony") as string;
    const resume = formData.get("resume") as File | null;

    // Configure your transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email content
    const htmlBody = `
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
      <h2 style="margin: 0; font-size: 22px;">💼 Career Form Submission</h2>
    </div>

    <!-- Body -->
    <div style="padding: 25px 30px;">
      <h3 style="color: black; margin-top: 0; margin-bottom: 20px;">
        Applicant Details
      </h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; width: 35%; color: black; font-style: italic;"><strong>Name:</strong></td>
          <td style="padding: 8px 0;">${name} ${lastName}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px 0; color: black; font-style: italic;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: black; font-style: italic;"><strong>City:</strong></td>
          <td style="padding: 8px 0;">${city}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px 0; color: black; font-style: italic;"><strong>Country:</strong></td>
          <td style="padding: 8px 0;">${country}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: black; font-style: italic;"><strong>Authorized to work:</strong></td>
          <td style="padding: 8px 0;">${authorized}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px 0; color: black; font-style: italic;"><strong>Felony record:</strong></td>
          <td style="padding: 8px 0;">${felony}</td>
        </tr>
      </table>

      <div style="margin-top: 25px;">
        <p style="color: black; font-style: italic; margin-bottom: 8px;"><strong>Additional Comments:</strong></p>
        <div style="
          background-color: #f8f9fa;
          border-left: 4px solid #2EA24F;
          padding: 12px 15px;
          border-radius: 4px;
          color: #333;
          line-height: 1.6;
        ">
          ${comments || "None"}
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
      <p style="margin: 0;">This message was sent from your website career form.</p>
    </div>
  </div>
</div>

    `;

    const mailOptions: any = {
      from: `"Globe Life | Career Form" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER, // 👈 Replace this with your target Gmail
      subject: `New Career Submission from ${name} ${lastName}`,
      html: htmlBody,
    };

    // Attach résumé if available
    if (resume) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      mailOptions.attachments = [
        {
          filename: resume.name,
          content: buffer,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
