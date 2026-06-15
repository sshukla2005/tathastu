import { NextResponse } from "next/server";
import { fetchStrapi } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, source } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Post to Strapi
    const res = await fetchStrapi<any>("/leads", {
      method: "POST",
      body: JSON.stringify({
        data: {
          name,
          email,
          phone: phone || "",
          company: company || "",
          message,
          source: source || "Contact",
        },
      }),
    });

    return NextResponse.json({ success: true, data: res });
  } catch (err: any) {
    console.error("Error in contact API route:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit request." },
      { status: 500 }
    );
  }
}
