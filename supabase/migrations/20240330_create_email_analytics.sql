-- Create email_analytics table
CREATE TABLE IF NOT EXISTS email_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
    open_count INTEGER NOT NULL DEFAULT 0,
    last_opened_at TIMESTAMPTZ
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_email_analytics_sent_at ON email_analytics(sent_at);
CREATE INDEX IF NOT EXISTS idx_email_analytics_recipient ON email_analytics(recipient);

-- Set up Row Level Security (RLS)
ALTER TABLE email_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this based on your needs)
CREATE POLICY "Allow all operations" ON email_analytics
    FOR ALL
    USING (true)
    WITH CHECK (true); 