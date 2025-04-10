import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

import { getSecret } from "astro:env/server";

export const prerender = false;

const transporter = nodemailer.createTransport({
  host: "smtp.mail.me.com",
  port: 587,
  secure: false,
  auth: {
    user: getSecret("EMAIL_USER"),
    pass: getSecret("EMAIL_PASS"),
  },
  tls: {
    rejectUnauthorized: true,
    ciphers: "SSLv3",
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = (await request.json()) as {
      name: string;
      email: string;
      message: string;
    };
    const { name, email, message } = data;

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: "Please fill in all fields",
        }),
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: import.meta.env.EMAIL_USER,
      to: import.meta.env.EMAIL_USER,
      subject: `Portfolio Contact Form - Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.5;
                color: #333;
                padding: 20px;
              }
              .header {
                border-bottom: 2px solid #991b1b;
                padding-bottom: 15px;
                margin-bottom: 20px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: 600;
                color: #991b1b;
              }
              .message-content {
                background-color: #f9fafb;
                padding: 15px;
                border-radius: 6px;
                margin-top: 10px;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h2 style="margin: 0; color: #991b1b;">New Contact Form Message</h2>
              </div>
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> ${email}
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-content">${message}</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
      }),
      { status: 500 }
    );
  }
};
