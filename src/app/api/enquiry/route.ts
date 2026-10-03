const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL?.trim() || "adewalemchel@gmail.com";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL?.trim() ||
  "PaTH Digital Studio <hello@pathai.name.ng>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Email service is unavailable." },
      { status: 503 }
    );
  }

  let body: {
    projectType?: string;
    name?: string;
    email?: string;
    company?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const projectType = String(body.projectType || "").trim().slice(0, 80);
  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().slice(0, 180);
  const company = String(body.company || "").trim().slice(0, 180);
  const message = String(body.message || "").trim().slice(0, 5000);

  if (!projectType || !name || !isEmail(email) || !message) {
    return Response.json(
      { error: "Please complete the required fields." },
      { status: 400 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeProjectType = escapeHtml(projectType);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      reply_to: email,
      subject: `PaTH project enquiry — ${projectType} — ${name}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#111;">
          <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#777;margin:0 0 24px;">
            PaTH Digital Studio
          </p>
          <h1 style="font-size:28px;line-height:1.1;margin:0 0 28px;">
            New project enquiry
          </h1>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:10px 0;color:#777;width:130px;">Project</td><td style="padding:10px 0;"><strong>${safeProjectType}</strong></td></tr>
            <tr><td style="padding:10px 0;color:#777;">Name</td><td style="padding:10px 0;">${safeName}</td></tr>
            <tr><td style="padding:10px 0;color:#777;">Email</td><td style="padding:10px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:10px 0;color:#777;">Company</td><td style="padding:10px 0;">${safeCompany}</td></tr>
          </table>
          <div style="margin-top:28px;padding-top:24px;border-top:1px solid #ddd;">
            <p style="font-size:12px;color:#777;margin:0 0 10px;">Project brief</p>
            <p style="font-size:15px;line-height:1.65;margin:0;">${safeMessage}</p>
          </div>
        </div>
      `,
      text: [
        "PaTH Digital Studio — New project enquiry",
        "",
        `Project: ${projectType}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        "",
        "Project brief:",
        message
      ].join("\n")
    })
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("Resend enquiry failed", result);
    return Response.json(
      { error: "We could not send your enquiry. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ success: true });
}
