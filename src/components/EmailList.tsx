import React from 'react';
import { format } from 'date-fns';
import { Mail, Star, Trash2 } from 'lucide-react';

const mockEmails = [
  {
    id: 1,
    sender: 'john@example.com',
    subject: 'Project Update Meeting',
    preview: 'Hi team, I wanted to schedule a meeting to discuss...',
    date: new Date(2024, 2, 15),
    priority: 'high',
  },
  {
    id: 2,
    sender: 'sarah@example.com',
    subject: 'New Feature Request',
    preview: 'I think we should consider adding the following features...',
    date: new Date(2024, 2, 14),
    priority: 'medium',
  },
];

const EmailList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Inbox</h2>
      <div className="space-y-4">
        {mockEmails.map((email) => (
          <div
            key={email.id}
            className="flex items-center space-x-4 p-4 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {email.sender}
                </p>
                <p className="text-sm text-gray-500">
                  {format(email.date, 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900 truncate">{email.subject}</p>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-yellow-400">
                    <Star className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">{email.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;