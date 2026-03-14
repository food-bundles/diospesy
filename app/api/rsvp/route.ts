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

    // ── 2. Send email notification ───────────────────────────────────────────
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

    const emailBody = `
DIOSCORE & SPECY WEDDING
14 June 2026 · Alexandria, Egypt

Dear ${first_name},

Thank you for your RSVP. Your response has been recorded.

─────────────────────────────────────

YOUR DETAILS

Name: ${first_name} ${last_name}
Email: ${email}
Phone: ${phone}
Attending: ${attending.toUpperCase()}
${guestLine ? `\n${guestLine}` : ""}

EVENTS
${eventsList}

ARRIVAL & ACCOMMODATION

From: ${dep_city || "—"}
Arrival: ${arr_date ? arr_date + " (" + arr_time + ")" : "—"}
Accommodation: ${accom || "—"}

TRAVEL REQUIREMENTS

Nationality: ${nationality || "—"}
Visa Assistance: ${visa || "—"}
Passport Expiry: ${passport_exp || "—"}
Dietary Needs: ${dietaryList}

${message ? `YOUR MESSAGE\n${message}\n` : ""}
─────────────────────────────────────

We look forward to celebrating with you!

Best regards,
Dioscore & Specy

Confirmation ID: ${rsvp.id}
Submitted: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
    `.trim();

    await transporter.sendMail({
      from: `"Dioscore & Specy Wedding" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      cc: email,
      subject: `RSVP — ${first_name} ${last_name} · ${attending.toUpperCase()} · Dioscore & Specy Wedding`,
      text: emailBody,
    });

    return NextResponse.json({ success: true, id: rsvp.id }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[RSVP API]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
