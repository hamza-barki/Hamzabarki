import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Basic in-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submission attempts. Please wait a few minutes or reach out via WhatsApp.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, projectType, message, honeypot, formLoadedAt } = body;

    // 3. Spam protection: Honeypot check
    // If the hidden honeypot field was filled, silently ignore to trap automated bots
    if (honeypot && String(honeypot).trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered from IP: ${ip}`);
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // 4. Spam protection: Quick submit check (under 1.2s suggests a headless bot)
    if (formLoadedAt && typeof formLoadedAt === "number") {
      const durationMs = Date.now() - formLoadedAt;
      if (durationMs < 1200) {
        console.warn(`[Spam Blocked] Instant submission (${durationMs}ms) from IP: ${ip}`);
        return NextResponse.json(
          { success: true, message: "Inquiry received." },
          { status: 200 }
        );
      }
    }

    // 5. Input validation & sanitization
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedProjectType = typeof projectType === "string" ? projectType.trim() : "General Inquiry";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Name is too long (maximum 100 characters)." },
        { status: 400 }
      );
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (trimmedEmail.length > 150) {
      return NextResponse.json(
        { success: false, error: "Email address is too long." },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please write a message with at least 10 characters." },
        { status: 400 }
      );
    }
    if (trimmedMessage.length > 3000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (maximum 3,000 characters)." },
        { status: 400 }
      );
    }

    // 6. Check Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "re_your_api_key_here") {
      console.error("[Email Provider Error] RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        {
          success: false,
          error: "Email delivery service is currently not configured on this server. Please contact Hamza directly via WhatsApp or Email.",
        },
        { status: 503 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "hamzabarki330@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    // 7. Sanitize inputs for email body
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeProjectType = escapeHtml(trimmedProjectType);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br/>");

    // 8. Dispatch email via Resend
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: trimmedEmail,
      subject: `New Inquiry [${trimmedProjectType}]: ${trimmedName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
          <div style="border-bottom: 2px solid #1D5FD6; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #0F172A; font-size: 20px;">New Portfolio Inquiry</h2>
            <p style="margin: 4px 0 0; color: #64748B; font-size: 14px;">Submitted through Hamza Barki Portfolio</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748B; width: 130px; font-weight: 600;">Sender Name:</td>
              <td style="padding: 8px 0; color: #0F172A; font-weight: 700;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Sender Email:</td>
              <td style="padding: 8px 0; color: #1D5FD6;">
                <a href="mailto:${safeEmail}" style="color: #1D5FD6; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Project Type:</td>
              <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${safeProjectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 600;">IP Address:</td>
              <td style="padding: 8px 0; color: #94A3B8; font-family: monospace; font-size: 12px;">${escapeHtml(ip)}</td>
            </tr>
          </table>

          <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Message Content:</p>
            <div style="font-size: 14px; line-height: 1.6; color: #1E293B; white-space: pre-wrap;">${safeMessage}</div>
          </div>

          <div style="padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8; text-align: center;">
            <p style="margin: 0;">You can reply directly to this email to contact ${safeName}.</p>
          </div>
        </div>
      `,
      text: `New Portfolio Inquiry\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nProject Type: ${trimmedProjectType}\nIP: ${ip}\n\nMessage:\n${trimmedMessage}`,
    });

    if (error) {
      console.error("[Resend API Error]:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to send message via email provider.",
        },
        { status: 500 }
      );
    }

    if (!data || !data.id) {
      console.error("[Resend Unknown Response]:", data);
      return NextResponse.json(
        { success: false, error: "Email provider did not return confirmation." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data.id,
    });
  } catch (err: unknown) {
    console.error("[Contact API Exception]:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
