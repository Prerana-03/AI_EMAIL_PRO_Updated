import { supabase } from '../lib/supabase';
import { generateWithGemini } from './geminiService';

export interface EmailAnalytics {
  id: string;
  recipient: string;
  subject: string;
  content: string;
  sent_at: string;
  status: 'sent' | 'failed';
  open_count: number;
  last_opened_at?: string;
}

const sampleEmails = [
  {
    recipient: 'john.doe@example.com',
    subject: 'Project Update Meeting',
    content: 'Hi team, I wanted to schedule a meeting to discuss the latest project updates.',
  },
  {
    recipient: 'sarah.smith@example.com',
    subject: 'New Feature Request',
    content: 'I think we should consider adding the following features to our product...',
  },
  {
    recipient: 'mike.jones@example.com',
    subject: 'Weekly Report',
    content: 'Here is the weekly progress report for our ongoing projects.',
  },
  {
    recipient: 'lisa.wilson@example.com',
    subject: 'Client Presentation',
    content: 'Please review the attached presentation for tomorrow\'s client meeting.',
  }
];

export const emailService = {
  async testConnection() {
    try {
      // Pick a random sample email
      const sampleEmail = sampleEmails[Math.floor(Math.random() * sampleEmails.length)];
      
      // Generate random open count and dates
      const openCount = Math.floor(Math.random() * 5);
      const sentDate = new Date();
      const lastOpenedAt = openCount > 0 ? new Date(sentDate.getTime() + Math.random() * 24 * 60 * 60 * 1000) : null;

      const { data, error } = await supabase
        .from('email_analytics')
        .insert([
          {
            ...sampleEmail,
            sent_at: sentDate.toISOString(),
            status: 'sent',
            open_count: openCount,
            last_opened_at: lastOpenedAt?.toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      console.log('Test email inserted successfully:', data);
      return data;
    } catch (error) {
      console.error('Error testing connection:', error);
      throw error;
    }
  },

  async sendEmail(recipient: string, subject: string, content: string): Promise<EmailAnalytics> {
    try {
      // Here you would integrate with your email sending service (e.g., SendGrid, AWS SES)
      // For now, we'll just simulate sending the email
      
      // Save analytics to Supabase
      const { data, error } = await supabase
        .from('email_analytics')
        .insert([
          {
            recipient,
            subject,
            content,
            sent_at: new Date().toISOString(),
            status: 'sent',
            open_count: 0
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  async getAnalytics(): Promise<EmailAnalytics[]> {
    const { data, error } = await supabase
      .from('email_analytics')
      .select('*')
      .order('sent_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateOpenCount(emailId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('email_analytics')
        .update({
          last_opened_at: new Date().toISOString(),
        })
        .eq('id', emailId)
        .select('open_count')
        .single();

      if (error) throw error;

      const updatedOpenCount = (data?.open_count || 0) + 1;

      const { error: updateError } = await supabase
        .from('email_analytics')
        .update({
          open_count: updatedOpenCount,
          last_opened_at: new Date().toISOString(),
        })
        .eq('id', emailId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error updating open count:', error);
      throw error;
    }
  },

  // Re-export the Gemini function
  generateWithGemini
};