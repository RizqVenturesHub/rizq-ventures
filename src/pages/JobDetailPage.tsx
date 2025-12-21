import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { jobEndpoints } from '../services/endpoints';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await jobEndpoints.getJob(id as string);
        setJob(data);
        setForm({
          title: data?.title || data?.jobTitle || '',
          description: data?.description || '',
          location: data?.location || '',
          salaryMin: data?.salaryMin || '',
          salaryMax: data?.salaryMax || '',
          jobType: data?.jobType || '',
          deadline: data?.deadline || '',
        });
      } catch (e: any) {
        toast.error(e?.message || 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f: any) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...form };
      await jobEndpoints.updateJob(id as string, payload);
      toast.success('Job updated');
      setEditing(false);
      // refresh
      const refreshed = await jobEndpoints.getJob(id as string);
      setJob(refreshed);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to update job');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobEndpoints.deleteJob(id as string);
      toast.success('Job deleted');
      navigate('/jobs');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to delete job');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!job) return <div className="min-h-screen flex items-center justify-center">Job not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow px-8 py-8">
          {!editing ? (
            <>
              <h1 className="text-2xl font-bold mb-2">{job.title || job.jobTitle}</h1>
              <p className="text-sm text-gray-600 mb-4">{job.company || job.postedBy}</p>
              <p className="text-gray-800 whitespace-pre-wrap mb-4">{job.description}</p>
              <div className="flex gap-3 mt-4">
                {isAuthenticated && (
                  <>
                    <button onClick={() => setEditing(true)} className="px-4 py-2 bg-primary text-white rounded">Edit</button>
                    <button onClick={handleDelete} className="px-4 py-2 border rounded">Delete</button>
                    <button onClick={() => navigate(`/jobs/${id}/applications`)} className="px-4 py-2 border rounded">Manage Applications</button>
                  </>
                )}
                <button onClick={() => navigate('/jobs')} className="px-4 py-2 border rounded">Back</button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">Title</label>
                  <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" rows={6} />
                </div>
                <div className="flex gap-4">
                  <input name="location" value={form.location} onChange={handleChange} className="flex-1 border p-2 rounded" />
                  <input name="jobType" value={form.jobType} onChange={handleChange} className="w-40 border p-2 rounded" />
                </div>
                <div className="flex gap-4">
                  <input name="salaryMin" value={form.salaryMin} onChange={handleChange} className="flex-1 border p-2 rounded" placeholder="Salary min" />
                  <input name="salaryMax" value={form.salaryMax} onChange={handleChange} className="flex-1 border p-2 rounded" placeholder="Salary max" />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">Save</button>
                  <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetailPage;
