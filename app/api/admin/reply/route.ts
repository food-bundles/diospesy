import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { recipients, subject, html, text } = await req.json();

    if (!recipients?.length || !subject || (!html && !text)) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Dioscore & Specy Wedding" <${process.env.SMTP_USER}>`,
      to: recipients.join(", "),
      subject,
      text: text ?? "",
      html: html ?? "",
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
