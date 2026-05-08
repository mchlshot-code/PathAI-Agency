import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;

  if (!data.businessName || !data.email) {
    return res.status(400).json({ error: 'Missing core required fields' });
  }

  const htmlContent = `
    <h1>New Client Brief Submitted: ${data.businessName}</h1>
    <hr />
    
    <h2>Section A - Business Information</h2>
    <p><strong>Business Name:</strong> ${data.businessName}</p>
    <p><strong>Tagline:</strong> ${data.tagline || 'N/A'}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
    <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
    <p><strong>Social Handles:</strong> ${data.socialHandles || 'N/A'}</p>
    <p><strong>Industry:</strong> ${data.industry}</p>
    <p><strong>Target Audience:</strong> ${data.audience}</p>
    
    <h2>Section B - Website Requirements</h2>
    <p><strong>Pages Needed:</strong> ${data.pagesNeeded}</p>
    <p><strong>Primary Goal:</strong> ${data.primaryGoal}</p>
    <p><strong>Domain:</strong> ${data.domain}</p>
    <p><strong>Registrar:</strong> ${data.registrar || 'N/A'}</p>
    <p><strong>Competitors/Inspiration:</strong> ${data.competitors}</p>
    <p><strong>Requested Modules:</strong> ${data.modules && data.modules.length > 0 ? data.modules.join(', ') : 'None selected'}</p>
    
    <h2>Section C - Branding</h2>
    <p><strong>Brand Colors:</strong> ${data.brandColors}</p>
    <p><strong>Fonts:</strong> ${data.fonts || 'N/A'}</p>
    <p><strong>Brand Tone:</strong> ${data.brandTone}</p>
    <p><strong>Design Examples:</strong> ${data.designExamples}</p>
    
    <h2>Section D - Content</h2>
    <p><strong>Homepage Headline:</strong> ${data.homepageHeadline}</p>
    <p><strong>About Text:</strong> ${data.aboutText}</p>
    <p><strong>Services List:</strong> ${data.servicesList}</p>
    <p><strong>Team Bios:</strong> ${data.teamBios || 'N/A'}</p>
    <p><strong>Photos Ready:</strong> ${data.photosReady ? 'Yes' : 'No'}</p>
  `;

  try {
    const response = await resend.emails.send({
      from: 'PathAI Agency <growth@pathai.name.ng>',
      to: ['adewalemchel@gmail.com'], 
      subject: `New Client Brief: ${data.businessName}`,
      html: htmlContent,
      reply_to: data.email
    });

    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
