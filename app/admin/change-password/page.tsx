'use client';

import { useState } from 'react';

export default function ChangePasswordPage() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (newPassword !== confirm) return setMessage('New passwords do not match');
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });
      const body = await res.json();
      if (res.ok) {
        setMessage('Password updated successfully');
        setEmail(''); setOldPassword(''); setNewPassword(''); setConfirm('');
      } else {
        setMessage(body?.message || 'Update failed');
      }
    } catch (err) {
      setMessage('Error updating password');
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Change Admin Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>
          {message && <div className="text-sm mt-2">{message}</div>}
          <button type="submit" disabled={isLoading} className="w-full bg-primary text-white py-2 rounded">{isLoading ? 'Updating...' : 'Update Password'}</button>
        </form>
      </div>
    </main>
  );
}
