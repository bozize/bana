import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  content: string; // Raw Markdown content for react-markdown
}

export async function getAllPostSlugs() {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
    console.log('Found Markdown files:', mdFiles); // Debug log
    return mdFiles.map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      content, // Return raw Markdown content
      ...data,
    } as Post;
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    throw error;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
    console.log('Posts found:', mdFiles); // Debug log
    const posts = await Promise.all(
      mdFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return {
          slug,
          ...data,
        } as Post;
      })
    );
    console.log('Generated posts:', posts.map((post) => post.slug)); // Debug log
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error generating posts:', error);
    return [];
  }
}