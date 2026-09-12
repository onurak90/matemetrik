export interface Post {
  id: number;
  title: string;
  slug: string;
  old_slug?: string | null;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  category_slug: string;
  tags: string[]; // parsed from JSON
  author: string;
  views: number;
  is_published: number; // 1 or 0
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  post_count?: number;
}

export interface Redirect {
  id: number;
  source_path: string;
  target_path: string;
  status_code: number;
}

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalCategories: number;
  totalRedirects: number;
  pendingCommentsCount?: number;
  recentPosts: Post[];
  categoryBreakdown: { name: string; count: number; slug: string }[];
}

export interface SiteSettings {
  site_name: string;
  site_description: string;
  site_author: string;
  site_url?: string;
}

export interface Comment {
  id: number;
  post_id: number;
  post_title?: string;
  post_slug?: string;
  author_name: string;
  author_email: string;
  author_avatar?: string;
  content: string;
  is_approved: number;
  created_at: string;
}
