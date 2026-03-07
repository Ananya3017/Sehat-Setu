const { Resend } = require('resend');

const sendEmail = async (options) => {
  // Initialize the Resend client with your API key
  const resend = new Resend(process.env.SMTP_PASSWORD);

  const { data, error } = await resend.emails.send({
    from: `${process.env.FROM_NAME || 'Health Vault'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
    to: [options.email],
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error('Email failed to send');
  }

  console.log('Message sent successfully via Resend:', data);
};

module.exports = sendEmail;
