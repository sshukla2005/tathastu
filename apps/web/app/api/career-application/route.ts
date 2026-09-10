import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const incoming = await request.formData();

    const name = incoming.get("name")?.toString().trim() || "";
    const email = incoming.get("email")?.toString().trim() || "";
    const position = incoming.get("position")?.toString().trim() || "";
    const experience = incoming.get("experience")?.toString().trim() || "";
    const qualification = incoming.get("qualification")?.toString().trim() || "";
    const message = incoming.get("message")?.toString().trim() || "";
    const cv = incoming.get("cv");

    // Validation
    if (!name || !email || !position) {
      return NextResponse.json({ error: "Name, email, and position are required." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    let cvFile: File | null = null;
    if (cv instanceof File && cv.size > 0) {
      if (!ALLOWED_CV_TYPES.includes(cv.type)) {
        return NextResponse.json({ error: "CV must be a PDF or Word document." }, { status: 400 });
      }
      if (cv.size > MAX_CV_SIZE) {
        return NextResponse.json({ error: "CV must be smaller than 5MB." }, { status: 400 });
      }
      cvFile = cv;
    }

    const outgoing = new FormData();
    outgoing.append(
      "data",
      JSON.stringify({ name, email, position, experience, qualification, message }),
    );
    if (cvFile) {
      outgoing.append("files.cv", cvFile, cvFile.name);
    }

    const res = await fetch(`${STRAPI_URL}/api/career-applications`, {
      method: "POST",
      body: outgoing,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to submit application.");
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Error in career-application API route:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit application." },
      { status: 500 },
    );
  }
}
