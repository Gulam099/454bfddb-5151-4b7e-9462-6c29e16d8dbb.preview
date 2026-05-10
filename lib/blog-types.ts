export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
  image?: string;
}

export interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: BlogPost) => void;
  deletePost: (id: string) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  isLoading: boolean;
}
