import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Create email transporter with updated SSL settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Test the connection
    await transporter.verify();
    console.log("SMTP connection verified");

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_FORM_TO_EMAIL,
      bcc: process.env.CONTACT_FORM_BCC_EMAIL,
      subject: `From Save Sinovac website: We Want to Hear From You`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Detailed contact form error:", {
      message: error.message,
      code: error.code,
      command: error.command,
    });

    return NextResponse.json(
      { error: error.message || "Failed to send message" },
      { status: 500 },
    );
  }
}
