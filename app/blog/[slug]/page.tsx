'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useBlog } from '@/lib/blog-context';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);

  // Client component to handle the hook call
  return <BlogPostContent slug={slug} />;
}

const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
};

function BlogPostContent({ slug }: { slug: string }) {
  const { getPostBySlug } = useBlog();
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </nav>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden bg-muted h-96">
            <img 
              src={getImageUrl(post.image)} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta Information */}
        <div className="mb-8 border-b border-border pb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{postDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By {post.author}</span>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                  {paragraph.split('\n').map((item, itemIndex) => (
                    <li key={itemIndex} className="ml-4">
                      {item.replace('- ', '')}
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d+\./)) {
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                  {paragraph.split('\n').map((item, itemIndex) => (
                    <li key={itemIndex} className="ml-4">
                      {item.replace(/^\d+\.\s/, '')}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-card border border-border rounded-lg text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Need Professional Accounting Help?
          </h3>
          <p className="text-muted-foreground mb-6">
            Let us help you with your accounting and tax planning needs.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Accounting Pro. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
