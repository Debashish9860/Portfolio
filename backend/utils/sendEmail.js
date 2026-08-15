export const sendEmail = async (options) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not defined.');
  }

  // Define attachments in Resend API format if present
  let attachments = [];
  if (options.attachment && options.attachment.content) {
    // Resend requires just the raw base64 string, so we strip the prefix (e.g. "data:image/png;base64,")
    const base64Data = options.attachment.content.split(';base64,').pop();
    attachments.push({
      filename: options.attachment.filename || 'attachment.bin',
      content: base64Data
    });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend sandbox domain sender
      to: process.env.EMAIL_TO || 'debashishrout9860@gmail.com', // Dynamic target email, defaults to primary
      reply_to: options.email, // Visitor's email so you can click reply directly
      subject: `[Portfolio Contact] ${options.subject}`,
      text: `You have received a new contact message from your portfolio website.

Sender Details:
Name: ${options.name}
Email: ${options.email}
Subject: ${options.subject}

Message body:
${options.message}
`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 5px;">
          <h2 style="color: #66fcf1; background: #0b0c10; padding: 15px; margin: 0 0 20px 0; border-radius: 3px; font-family: monospace;">[PORTFOLIO_CONTACT_LOG]</h2>
          <p><strong>Name:</strong> ${options.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${options.email}">${options.email}</a></p>
          <p><strong>Subject:</strong> ${options.subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <h4 style="margin-bottom: 5px; color: #555;">Message Packet:</h4>
          <div style="background: #f9f9f9; border-left: 4px solid #66fcf1; padding: 15px; white-space: pre-wrap; font-size: 0.95em; color: #333;">${options.message}</div>
          ${options.attachment ? `<p style="margin-top: 15px; font-size: 0.85em; color: #666;">📎 Attached: <strong>${options.attachment.filename}</strong></p>` : ''}
        </div>
      `,
      attachments
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Resend API failed with status ${response.status}`);
  }

  return await response.json();
};
