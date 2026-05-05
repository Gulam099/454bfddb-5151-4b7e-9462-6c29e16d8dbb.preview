'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlog } from '@/lib/blog-context';
import { AdminProtected } from '@/components/admin-protected';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

function CreatePostContent() {
  const router = useRouter();
  const { addPost } = useBlog();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: 'General',
    featured: false,
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.title || !formData.content || !formData.author) {
      alert('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const newPost = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        featured: formData.featured,
        image: formData.image || undefined,
        date: new Date().toISOString().split('T')[0],
      };

      addPost(newPost);
      router.push('/admin/dashboard');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create New Post</h1>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter post title"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Author and Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option>General</option>
                <option>Tax Planning</option>
                <option>Business Accounting</option>
                <option>Payroll</option>
                <option>Financial Planning</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Featured */}
          {/* <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-border text-primary cursor-pointer"
            />
            <label className="text-sm font-medium text-foreground cursor-pointer">
              Mark as Featured Post
            </label>
          </div> */}

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here. Use ## for headings, - for bullets, and 1. for numbered lists"
              required
              rows={12}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Markdown support: Use ## for headings, - for bullet points, and 1. for numbered lists
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
            <Link
              href="/admin/dashboard"
              className="flex-1 bg-muted text-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function CreatePostPage() {
  return (
    <AdminProtected>
      <CreatePostContent />
    </AdminProtected>
  );
}
