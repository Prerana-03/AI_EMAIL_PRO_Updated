# AI Email Pro

A modern email automation platform built with React, TypeScript, and Supabase. This application provides an intuitive interface for composing emails, tracking analytics, and managing email campaigns.

## Features

- **Email Composition**: Modern interface for composing and sending emails
- **Analytics Dashboard**: Real-time tracking of email metrics including:
  - Total emails sent
  - Open rates
  - Active recipients
  - Average response time
- **Real-time Updates**: Instant analytics updates when emails are sent or opened
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd ai-email-pro
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the application

## Database Setup

The application requires a Supabase database with the following table:

```sql
CREATE TABLE email_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
    open_count INTEGER NOT NULL DEFAULT 0,
    last_opened_at TIMESTAMPTZ
);
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
