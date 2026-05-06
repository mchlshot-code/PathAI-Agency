import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, vision } = req.body;

  if (!name || !email || !vision) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'PathAI Agency <onboarding@resend.dev>',
      to: ['adewalemchel@gmail.com'], // User's email from send_emails.py
      subject: `New Lead: ${name} is ready to Scale`,
      html: `
        <h1>New Lead Protocol Initiated</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Vision:</strong></p>
        <p>${vision}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
