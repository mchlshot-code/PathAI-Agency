export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    resendApiKey: Boolean(process.env.RESEND_API_KEY),
    resendFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
    resendFrom: Boolean(process.env.RESEND_FROM),
    resendToEmail: Boolean(process.env.RESEND_TO_EMAIL),
    contactEmail: Boolean(process.env.CONTACT_EMAIL),
  });
}
