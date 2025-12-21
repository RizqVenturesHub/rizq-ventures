import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { jobApplicationEndpoints } from '../services/endpoints';
import toast from 'react-hot-toast';

const JobApplicationsPage: React.FC = () => {
  const { id } = useParams(); // jobId
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await jobApplicationEndpoints.getApplications(id as string);
        const items = data?.items || data || [];
        setApplications(items);
      } catch (e: any) {
        toast.error(e?.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetch();
  }, [id]);

  const updateStatus = async (appId: string, status: string) => {
    try {
      await jobApplicationEndpoints.updateApplicationStatus(appId, { status });
      toast.success('Application status updated');
      setApplications(apps => apps.map(a => (a.id === appId ? { ...a, status } : a)));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Applications for Job {id}</h2>
          {loading ? (
            <div>Loading...</div>
          ) : applications.length === 0 ? (
            <div>No applications yet</div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="border p-4 rounded flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{app.applicantName || app.applicant?.name || app.userName}</p>
                    <p className="text-sm text-gray-600">{app.coverLetter || app.message || ''}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select value={app.status} onChange={(e) => updateStatus(app.id, e.target.value)} className="border p-1 rounded">
                      <option value="PENDING">PENDING</option>
                      <option value="REVIEWED">REVIEWED</option>
                      <option value="ACCEPTED">ACCEPTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                    <span className="text-sm text-gray-500">Applied: {new Date(app.appliedAt || app.createdAt || Date.now()).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobApplicationsPage;
