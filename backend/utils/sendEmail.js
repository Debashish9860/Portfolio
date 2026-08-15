import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Setup attachment if present
  let attachments = [];
  if (options.attachment && options.attachment.content) {
    attachments.push({
      filename: options.attachment.filename || 'attachment.bin',
      path: options.attachment.content // nodemailer supports data URIs (e.g. data:image/png;base64,...)
    });
  }

  // 3. Define the mail options
  const mailOptions = {
    from: `"${options.name}" <${process.env.EMAIL_USER}>`, // authenticated sender
    to: 'debashishrout9860@gmail.com', // destination address
    replyTo: options.email, // clicking reply will go to the sender's actual email
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
  };

  // 4. Send mail
  await transporter.sendMail(mailOptions);
};
