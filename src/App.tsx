import React, { useState } from 'react';
import { Mail, Send, Inbox, BarChart2, Brain, Loader2 } from 'lucide-react';
import EmailComposer from './components/EmailComposer';
import EmailList from './components/EmailList';
import Analytics from './components/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('compose');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">AI Email Pro</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('compose')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'compose'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Mail className="h-5 w-5 mr-2" />
            Compose
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'inbox'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Inbox className="h-5 w-5 mr-2" />
            Inbox
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            Analytics
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'compose' && <EmailComposer />}
          {activeTab === 'inbox' && <EmailList />}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      </div>
    </div>
  );
}

export default App;