// lib/api/sendEmail.ts
export async function sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, html }),
      });
  
      if (!res.ok) {
        throw new Error(`Email send failed: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error('Send email error:', error);
      throw error;
    }
  }
  