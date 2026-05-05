'use client';

import { useRouter, useParams } from 'next/navigation';
import { useBlog } from '@/lib/blog-context';
import { AdminProtected } from '@/components/admin-protected';
import Link from 'next/link';
import { AlertCircle, Trash2 } from 'lucide-react';

function DeletePostContent() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { posts, deletePost } = useBlog();
  const post = posts.find((p: any) => p.id === postId || p._id === postId);

  if (!post) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Post not found</h1>
          <Link href="/admin/dashboard" className="text-primary hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const handleDelete = () => {
    deletePost(postId);
    router.push('/admin/dashboard');
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-lg mb-4 mx-auto">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>

        <h2 className="text-xl font-bold text-foreground text-center mb-2">
          Delete Post?
        </h2>

        <p className="text-sm text-muted-foreground text-center mb-2">
          Are you sure you want to delete:
        </p>

        <p className="text-lg font-semibold text-foreground text-center mb-6 line-clamp-2">
          "{post.title}"
        </p>

        <p className="text-xs text-muted-foreground text-center mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="flex-1 bg-destructive text-white py-2 rounded-lg font-medium hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <Link
            href="/admin/dashboard"
            className="flex-1 bg-muted text-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function DeletePostPage() {
  return (
    <AdminProtected>
      <DeletePostContent />
    </AdminProtected>
  );
}
