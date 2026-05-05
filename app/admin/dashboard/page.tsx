'use client';

import Link from 'next/link';
import { useBlog } from '@/lib/blog-context';
import { useAuth } from '@/lib/admin-auth';
import { useRouter } from 'next/navigation';
import { AdminProtected } from '@/components/admin-protected';
import { Plus, Edit, Trash2, LogOut, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function DashboardContent() {
  const { posts } = useBlog();
  const { logout } = useAuth();
  const [totalQueries, setTotalQueries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await fetch('/api/queries');
      if (res.ok) {
        const data = await res.json();
        setTotalQueries(data?.length);
      }
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your blog posts</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/queries"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View Queries
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Posts</p>
            <p className="text-3xl font-bold text-foreground">{posts.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Queries</p>
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-primary" /> : <p className="text-3xl font-bold text-foreground">{totalQueries}</p>}
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Recent Posts</p>
            <p className="text-3xl font-bold text-foreground">
              {posts.filter(p => {
                const postDate = new Date(p.date);
                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                return postDate > thirtyDaysAgo;
              }).length}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <Link
            href="/admin/create"
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No posts yet. <Link href="/admin/create" className="text-primary hover:underline">Create one now</Link>
                    </td>
                  </tr>
                ) : (
                  posts
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((post: any, index: number) => (
                      <tr key={post.id || post._id || index} className="border-b border-border hover:bg-muted transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{post.title}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {post.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {post.author}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/edit/${post._id}`}
                              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Link>
                            <Link
                              href={`/admin/delete/${post._id}`}
                              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <AdminProtected>
      <DashboardContent />
    </AdminProtected>
  );
}
