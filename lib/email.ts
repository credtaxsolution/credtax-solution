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
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'CredTax <onboarding@resend.dev>';

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

    // 1. Send detailed notification to Admin
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `[New Appointment] ${appointment.client_name} - ${appointment.service_type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #D8E2E4; border-radius: 8px; background: #ffffff;">
          <h2 style="color: #2F616F; margin-top: 0; font-size: 20px;">New Consultation Booked</h2>
          <p style="color: #183941; font-size: 15px; margin-bottom: 20px;">
            A new client has scheduled an appointment via the CredTax booking calendar:
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075; width: 140px;"><strong>Client Name:</strong></td><td style="padding: 10px 0; color: #183941;"><strong>${appointment.client_name}</strong></td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Firm Name:</strong></td><td style="padding: 10px 0; color: #183941;">${appointment.firm_name || 'N/A'}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Email:</strong></td><td style="padding: 10px 0;"><a href="mailto:${appointment.email}" style="color: #2F616F; font-weight: 600;">${appointment.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Phone:</strong></td><td style="padding: 10px 0; color: #183941;">${appointment.phone || 'N/A'}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Service Focus:</strong></td><td style="padding: 10px 0; color: #183941;">${appointment.service_type}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Appointment Date:</strong></td><td style="padding: 10px 0; color: #0D9488; font-weight: 700;">${appointment.appointment_date}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Start Time:</strong></td><td style="padding: 10px 0; color: #0D9488; font-weight: 700;">${appointment.start_time} (${appointment.timezone})</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Services Needed:</strong></td><td style="padding: 10px 0; color: #183941;">${appointment.services_interested?.join(', ') || 'None selected'}</td></tr>
            <tr><td style="padding: 10px 0; color: #5E7075; vertical-align: top;"><strong>Client Message:</strong></td><td style="padding: 10px 0; color: #183941;">${appointment.message || 'No additional note provided'}</td></tr>
          </table>
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #D8E2E4; font-size: 13px; color: #8896AA;">
            View and manage this booking directly inside your <a href="https://credtaxsolution.com/admin/appointments" style="color: #2F616F; font-weight: 600;">CredTax Admin Panel</a>.
          </div>
        </div>
      `,
    });

    // 2. Send confirmation to Client
    await resend.emails.send({
      from: fromEmail,
      to: appointment.email,
      subject: `Your CredTax Discovery Session Confirmation - ${appointment.appointment_date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #D8E2E4; border-radius: 8px; background: #ffffff;">
          <h2 style="color: #2F616F; margin-top: 0;">Appointment Confirmed</h2>
          <p style="font-size: 15px; color: #183941;">Hello ${appointment.client_name},</p>
          <p style="font-size: 15px; color: #183941;">
            Thank you for scheduling a discovery session with CredTax Solution. We look forward to discussing your firm's capacity requirements and exploring how our team can support your workflow.
          </p>
          <div style="background-color: #F2F7F8; padding: 18px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2F616F;">
            <p style="margin: 0 0 8px 0; color: #183941; font-size: 14px;"><strong>Date:</strong> ${appointment.appointment_date}</p>
            <p style="margin: 0 0 8px 0; color: #183941; font-size: 14px;"><strong>Time:</strong> ${appointment.start_time} (${appointment.timezone})</p>
            <p style="margin: 0; color: #183941; font-size: 14px;"><strong>Service Focus:</strong> ${appointment.service_type}</p>
          </div>
          <p style="color: #5E7075; font-size: 14px;">
            An online meeting link will be sent prior to the session. If you need to reschedule or have questions in advance, please reply to this email or contact us at <a href="mailto:prnithin6@gmail.com" style="color: #2F616F; font-weight: 600;">prnithin6@gmail.com</a>.
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #183941;">
            Best regards,<br>
            <strong>CredTax Solution LLP Team</strong><br>
            <span style="color: #5E7075; font-size: 13px;">Offshore Tax &amp; Accounting Extension for CPA Firms</span>
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending Resend booking email:', error);
    return { success: false, error };
  }
}

export async function sendContactFormNotificationEmail(submission: {
  name: string;
  firm: string;
  email: string;
  country: string;
  role: string;
  website?: string | null;
  need: string;
  workload?: string | null;
  support_structure?: string | null;
  message?: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'credtaxsolution@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'CredTax <onboarding@resend.dev>';

  if (!apiKey) {
    console.log('[Resend Mock] RESEND_API_KEY not configured. Contact Form submission payload:', {
      to: adminEmail,
      subject: `New Inquiry from ${submission.name} (${submission.firm})`,
      details: submission,
    });
    return { success: true, mocked: true };
  }

  try {
    const resend = new Resend(apiKey);

    // 1. Send detailed notification to Admin
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `[New Website Inquiry] ${submission.name} - ${submission.firm}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #D8E2E4; border-radius: 8px; background: #ffffff;">
          <h2 style="color: #2F616F; margin-top: 0; font-size: 20px;">New Form Submission Received</h2>
          <p style="color: #183941; font-size: 15px; margin-bottom: 20px;">
            A prospective client submitted the firm inquiry form on CredTax:
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075; width: 140px;"><strong>Name:</strong></td><td style="padding: 10px 0; color: #183941;"><strong>${submission.name}</strong></td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Firm:</strong></td><td style="padding: 10px 0; color: #183941;"><strong>${submission.firm}</strong></td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Email:</strong></td><td style="padding: 10px 0;"><a href="mailto:${submission.email}" style="color: #2F616F; font-weight: 600;">${submission.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Country / Region:</strong></td><td style="padding: 10px 0; color: #183941;">${submission.country}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Role / Title:</strong></td><td style="padding: 10px 0; color: #183941;">${submission.role}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Website:</strong></td><td style="padding: 10px 0; color: #183941;">${submission.website || 'N/A'}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Primary Need:</strong></td><td style="padding: 10px 0; color: #0D9488; font-weight: 700;">${submission.need}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Workload Volume:</strong></td><td style="padding: 10px 0; color: #183941;">${submission.workload || 'N/A'}</td></tr>
            <tr style="border-bottom: 1px solid #F0F4F5;"><td style="padding: 10px 0; color: #5E7075;"><strong>Current Team:</strong></td><td style="padding: 10px 0; color: #183941;">${submission.support_structure || 'N/A'}</td></tr>
            <tr><td style="padding: 10px 0; color: #5E7075; vertical-align: top;"><strong>Message / Notes:</strong></td><td style="padding: 10px 0; color: #183941; white-space: pre-wrap;">${submission.message || 'No additional details'}</td></tr>
          </table>
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #D8E2E4; font-size: 13px; color: #8896AA;">
            View and respond to this inquiry in your <a href="https://credtaxsolution.com/admin/submissions" style="color: #2F616F; font-weight: 600;">CredTax Admin Panel</a>.
          </div>
        </div>
      `,
    });

    // 2. Send acknowledgment to the Submitter
    await resend.emails.send({
      from: fromEmail,
      to: submission.email,
      subject: `We've received your inquiry - CredTax Solution`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #D8E2E4; border-radius: 8px; background: #ffffff;">
          <h2 style="color: #2F616F; margin-top: 0;">Thank You for Reaching Out</h2>
          <p style="font-size: 15px; color: #183941;">Hello ${submission.name},</p>
          <p style="font-size: 15px; color: #183941;">
            We have received your firm's inquiry regarding <strong>${submission.need}</strong> support for <strong>${submission.firm}</strong>.
          </p>
          <p style="font-size: 14px; color: #5E7075; line-height: 1.6;">
            A senior member of our team will review your workflow requirements and follow up within 1 business day with relevant support models and capacity options.
          </p>
          <div style="background-color: #F2F7F8; padding: 15px; border-radius: 6px; margin: 20px 0; font-size: 14px;">
            <p style="margin: 0; color: #183941;">
              If your inquiry is urgent or you prefer to select a time directly, you can also <a href="https://credtaxsolution.com/book-appointment" style="color: #2F616F; font-weight: 600;">book a consultation online</a>.
            </p>
          </div>
          <p style="margin-top: 25px; font-size: 14px; color: #183941;">
            Best regards,<br>
            <strong>CredTax Solution LLP Team</strong>
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending Resend contact email:', error);
    return { success: false, error };
  }
}
