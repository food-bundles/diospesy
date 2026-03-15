import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      first_name,
      last_name,
      email,
      phone,
      attending,
      events,
      has_plusone,
      p1_first,
      p1_last,
      p1_rel,
      p1_phone,
      p1_diet,
      dep_city,
      arr_date,
      arr_time,
      accom,
      visa,
      nationality,
      passport_exp,
      dietary,
      message,
    } = body;

    if (!first_name || !last_name || !email || !phone || !attending) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // ── 1. Save to MongoDB via Prisma ────────────────────────────────────────
    const rsvp = await prisma.rSVP.create({
      data: {
        first_name,
        last_name,
        email,
        phone,
        attending,
        events: events ?? [],
        has_plusone: has_plusone ?? "",
        p1_first: p1_first || null,
        p1_last: p1_last || null,
        p1_rel: p1_rel || null,
        p1_phone: p1_phone || null,
        p1_diet: p1_diet || null,
        dep_city: dep_city || null,
        arr_date: arr_date || null,
        arr_time: arr_time || null,
        accom: accom || null,
        visa: visa || null,
        nationality: nationality || null,
        passport_exp: passport_exp || null,
        dietary: dietary ?? [],
        message: message || null,
      },
    });

    // ── 2. Send emails ───────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const guestLine =
      has_plusone === "yes" ? `Guest: ${p1_first} ${p1_last} (${p1_rel})` : "";
    const eventsList =
      (events ?? []).length > 0
        ? (events as string[]).map((e) => `• ${e}`).join("\n")
        : "—";
    const dietaryList =
      (dietary ?? []).length > 0 ? (dietary as string[]).join(", ") : "None";

    // Admin notification
    const adminBody = `
DIOSCORE & SPECY WEDDING — NEW RSVP
14 June 2026 · Alexandria, Egypt

Name: ${first_name} ${last_name}
Email: ${email}
Phone: ${phone}
Attending: ${attending.toUpperCase()}
${guestLine ? `${guestLine}\n` : ""}
Events: ${eventsList}
From: ${dep_city || "—"}
Arrival: ${arr_date ? arr_date + " (" + arr_time + ")" : "—"}
Accommodation: ${accom || "—"}
Nationality: ${nationality || "—"}
Visa: ${visa || "—"}
Passport Expiry: ${passport_exp || "—"}
Dietary: ${dietaryList}
${message ? `\nMessage: ${message}` : ""}

Submitted: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
    `.trim();

    await transporter.sendMail({
      from: `"Dioscore & Specy Wedding" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `RSVP — ${first_name} ${last_name} · ${attending.toUpperCase()}`,
      text: adminBody,
    });

    // Guest confirmation email
    const guestBody = attending === "yes"
      ? `
Dear ${first_name},

Thank you for confirming your attendance at our wedding!

We are so excited to celebrate with you on 14 June 2026 in Alexandria, Egypt.

Your RSVP has been received and your details are noted. Please be assured that your Official Invitation will follow in due course with all the details you need, venue addresses, schedule, dress code, and any further logistics.

In the meantime, if you have any questions, feel free to reach out to us directly:
  doresdios@gmail.com OR specymukanjishi@gmail.com

With love,
Dioscore & Specy

Submitted: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      `.trim()
      : attending === "maybe"
      ? `
Dear ${first_name},

Thank you for getting back to us! 

We have noted that you are not yet sure about attending our wedding on 14 June 2026 in Alexandria, Egypt. No worries at all — we completely understand.

Whenever you are ready to confirm, please do not hesitate to reach out:
  doresdios@gmail.com OR Specy: specymukanjishi@gmail.com

We truly hope to see you there!

With love,
Dioscore & Specy
      `.trim()
      : `
Dear ${first_name},

Thank you for letting us know.

We are sorry you won't be able to join us on 14 June 2026 in Alexandria, Egypt. You will be in our thoughts on the day, and we hope to celebrate with you another time soon.

With love,
Dioscore & Specy
      `.trim();

    await transporter.sendMail({
      from: `"Dioscore & Specy Wedding" <${process.env.SMTP_USER}>`,
      to: email,
      subject: attending === "yes"
        ? `Your RSVP is confirmed!`
        : attending === "maybe"
        ? `We received your RSVP`
        : `Thank you for letting us know `,
      text: guestBody,
    });

    return NextResponse.json({ success: true, id: rsvp.id }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[RSVP API]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
