import { Tag } from './tag';

export interface FeaturedMedia {
  source_url: string;
}

export interface Post {
  _embedded: {
    ['wp:featuredmedia']?: FeaturedMedia[]; 
  };
  author: number;
  categories: number[];
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  id: number;
  link: string;
  tags: number[];
  title: {
    rendered: string;
  };
}

export interface PostWithTagInfo extends Post {
  tagInfo: Tag[];
}