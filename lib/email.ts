import { Resend } from 'resend';

export async function sendBookingNotificationEmail(appointment: {
  client_name: string;
  firm_name?: string;
  email: string;
  phone?: string;
  service_type: string;
  services_interested?: string[];
  appointment_date: string;
  start_time: string;
  timezone: string;
  message?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'credtaxsolution@gmail.com';

  if (!apiKey) {
    console.log('[Resend Mock] RESEND_API_KEY not configured. Email notification payload:', {
      to: [adminEmail, appointment.email],
      subject: `New Appointment: ${appointment.service_type} with ${appointment.client_name}`,
      details: appointment,
    });
    return { success: true, mocked: true };
  }

  try {
    const resend = new Resend(apiKey);

    // 1. Send confirmation to Admin
    await resend.emails.send({
      from: 'CredTax Appointments <onboarding@resend.dev>',
      to: adminEmail,
      subject: `[New Appointment] ${appointment.client_name} - ${appointment.service_type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D8E2E4; border-radius: 8px;">
          <h2 style="color: #2F616F; margin-top: 0;">New Consultation Booked</h2>
          <p>A new client has scheduled an appointment via CredTax Solution:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Client:</strong></td><td style="padding: 8px 0;">${appointment.client_name}</td></tr>
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Firm:</strong></td><td style="padding: 8px 0;">${appointment.firm_name || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${appointment.email}">${appointment.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${appointment.phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Service:</strong></td><td style="padding: 8px 0;">${appointment.service_type}</td></tr>
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Date & Time:</strong></td><td style="padding: 8px 0;">${appointment.appointment_date} at ${appointment.start_time} (${appointment.timezone})</td></tr>
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Interests:</strong></td><td style="padding: 8px 0;">${appointment.services_interested?.join(', ') || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #5E7075;"><strong>Message:</strong></td><td style="padding: 8px 0;">${appointment.message || 'None provided'}</td></tr>
          </table>
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #D8E2E4; font-size: 12px; color: #8896AA;">
            View and manage this booking inside your <a href="https://credtaxsolution.com/admin/appointments" style="color: #2F616F;">CredTax Admin Panel</a>.
          </div>
        </div>
      `,
    });

    // 2. Send confirmation to Client
    await resend.emails.send({
      from: 'CredTax Appointments <onboarding@resend.dev>',
      to: appointment.email,
      subject: `Your CredTax Discovery Session Confirmation - ${appointment.appointment_date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D8E2E4; border-radius: 8px;">
          <h2 style="color: #2F616F; margin-top: 0;">Appointment Confirmed</h2>
          <p>Hello ${appointment.client_name},</p>
          <p>Thank you for scheduling a discovery session with CredTax Solution. We look forward to learning about your firm's workflow and capacity requirements.</p>
          <div style="background-color: #F2F7F8; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Date:</strong> ${appointment.appointment_date}</p>
            <p style="margin: 0 0 8px 0;"><strong>Time:</strong> ${appointment.start_time} (${appointment.timezone})</p>
            <p style="margin: 0;"><strong>Service Focus:</strong> ${appointment.service_type}</p>
          </div>
          <p style="color: #5E7075; font-size: 14px;">If you need to reschedule or have any questions ahead of time, please reply directly to this email or reach us at <a href="mailto:prnithin6@gmail.com" style="color: #2F616F;">prnithin6@gmail.com</a>.</p>
          <p style="margin-top: 30px; font-size: 14px;">Best regards,<br><strong>CredTax Solution LLP Team</strong></p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending Resend email:', error);
    return { success: false, error };
  }
}
