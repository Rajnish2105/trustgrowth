"use server";
import formData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);

export default async function FormAction(
  state: { type: string; message: string },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // Validate required fields
  if (!name || !email || !message) {
    return {
      type: "error",
      message: "Please fill in all required fields.",
    };
  }

  const result = await sendContactMail({ name, email, phone, message });

  if (result.error) {
    return {
      type: "error",
      message: "Failed to send message. Please try again later.",
    };
  }

  return {
    type: "success",
    message: "Thank you! Your message has been sent successfully.",
  };
}

const contactEmailTemplate = (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 90%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">New Contact Form Submission</h1>
                            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Someone has reached out through your website</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                                <h2 style="margin: 0 0 20px; color: #333; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
                                
                                <div style="margin-bottom: 15px;">
                                    <strong style="color: #667eea; display: inline-block; width: 80px;">Name:</strong>
                                    <span style="color: #333; font-size: 16px;">${
                                      data.name
                                    }</span>
                                </div>
                                
                                <div style="margin-bottom: 15px;">
                                    <strong style="color: #667eea; display: inline-block; width: 80px;">Email:</strong>
                                    <span style="color: #333; font-size: 16px;">
                                        <a href="mailto:${
                                          data.email
                                        }" style="color: #667eea; text-decoration: none;">${
  data.email
}</a>
                                    </span>
                                </div>
                                
                                ${
                                  data.phone
                                    ? `
                                <div style="margin-bottom: 15px;">
                                    <strong style="color: #667eea; display: inline-block; width: 80px;">Phone:</strong>
                                    <span style="color: #333; font-size: 16px;">
                                        <a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">${data.phone}</a>
                                    </span>
                                </div>
                                `
                                    : ""
                                }
                            </div>
                            
                            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px;">
                                <h2 style="margin: 0 0 20px; color: #333; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
                                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${
                                  data.message
                                }</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background-color: #f8f8f8; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; text-align: center;">
                            <p style="margin: 0; font-size: 14px; line-height: 22px; color: #666;">
                                This message was sent from the contact form on <strong>TrustGrowth.in</strong>
                            </p>
                            <p style="margin: 10px 0 0; font-size: 12px; color: #999;">
                                &copy; 2025 TrustGrowth. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

async function sendContactMail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const mg = mailgun.client({
    username: "Rajnish Kumar",
    key: process.env.MAILGUN_API || "",
    url: "https://api.mailgun.net",
  });

  try {
    const msg = await mg.messages.create("info.trustgrowth.in", {
      from: "Excited User <mailgun@info.trustgrowth.in>",
      to: "trustgrowth2024@gmail.com",
      subject: `New Contact Form Submission from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${
        data.phone || "Not provided"
      }\nMessage: ${data.message}`,
      html: contactEmailTemplate(data),
    });

    console.log("Contact form email sent successfully:", msg);
    return { message: "Email sent successfully", error: null };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Mail error:", err);
      return { message: null, error: err.message };
    }
    // Optionally handle other error shapes
    return { message: null, error: "Unknown error occurred" };
  }
}
