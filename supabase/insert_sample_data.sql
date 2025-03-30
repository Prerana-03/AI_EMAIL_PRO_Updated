-- Insert sample email analytics data
INSERT INTO email_analytics (recipient, subject, content, sent_at, status, open_count, last_opened_at)
VALUES
  ('john.doe@example.com', 'Project Update Meeting', 'Hi team, Here are the latest project updates...', NOW() - INTERVAL '2 days', 'sent', 3, NOW() - INTERVAL '1 day'),
  ('sarah.smith@example.com', 'New Feature Request', 'I would like to request the following features...', NOW() - INTERVAL '3 days', 'sent', 2, NOW() - INTERVAL '2 days'),
  ('mike.jones@example.com', 'Weekly Report', 'Please find attached the weekly progress report.', NOW() - INTERVAL '1 day', 'sent', 5, NOW() - INTERVAL '12 hours'),
  ('lisa.wilson@example.com', 'Client Meeting Notes', 'Here are the notes from our client meeting today.', NOW(), 'sent', 0, NULL),
  ('david.brown@example.com', 'Product Launch Timeline', 'Here is our updated product launch schedule...', NOW() - INTERVAL '4 days', 'sent', 4, NOW() - INTERVAL '3 days');

-- You can run SELECT * FROM email_analytics; to verify the data was inserted 