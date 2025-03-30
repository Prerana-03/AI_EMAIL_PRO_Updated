import React, { useEffect, useState } from "react";
import { BarChart2, TrendingUp, Users, Clock, Plus } from "lucide-react";
import { emailService, EmailAnalytics } from "../services/emailService";
import { format } from "date-fns";

const Analytics = () => {
  const [analytics, setAnalytics] = useState<EmailAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await emailService.getAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics data");
      console.error("Error loading analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTestData = async () => {
    try {
      setLoading(true);
      await emailService.testConnection();
      await loadAnalytics(); // Reload the data
    } catch (err) {
      setError("Failed to add test data");
      console.error("Error adding test data:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalEmails = analytics.length;
  const totalOpens = analytics.reduce(
    (sum, email) => sum + email.open_count,
    0
  );
  const openRate = totalEmails > 0 ? (totalOpens / totalEmails) * 100 : 0;
  const uniqueRecipients = new Set(analytics.map((email) => email.recipient))
    .size;
  const avgResponseTime =
    analytics.length > 0
      ? analytics.reduce((sum, email) => {
          if (email.last_opened_at) {
            const sentDate = new Date(email.sent_at);
            const openedDate = new Date(email.last_opened_at);
            return sum + (openedDate.getTime() - sentDate.getTime());
          }
          return sum;
        }, 0) /
        analytics.length /
        (1000 * 60 * 60) // Convert to hours
      : 0;

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Email Analytics
        </h2>
        <button
          onClick={addTestData}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Test Data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart2 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Emails Sent
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {totalEmails}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Open Rate
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {openRate.toFixed(1)}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Recipients
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {uniqueRecipients}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Response Time
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {avgResponseTime.toFixed(1)}h
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Emails
        </h3>
        <div className="space-y-4">
          {analytics.slice(0, 5).map((email) => (
            <div key={email.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {email.subject}
                  </p>
                  <p className="text-sm text-gray-500">{email.recipient}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {format(new Date(email.sent_at), "MMM d, yyyy")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Opens: {email.open_count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
