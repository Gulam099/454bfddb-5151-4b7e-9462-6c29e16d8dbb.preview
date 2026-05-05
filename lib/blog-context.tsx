'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, BlogContextType } from './blog-types';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from MongoDB on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (newPost: BlogPost) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const createdPost = await response.json();
        setPosts([createdPost, ...posts]);
        return createdPost;
      }
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const updatePost = async (id: string, updatedPost: BlogPost) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const updated = await response.json();
        setPosts(posts.map(post => (post._id === id || post.id === id ? updated : post)));
        return updated;
      }
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== id && post.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const getPostBySlug = (slug: string) => {
    return posts.find(post => post.slug === slug || post._id === slug || post.id === slug);
  };

  const value: BlogContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPostBySlug,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
