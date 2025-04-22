import Link from 'next/link';
import { getAllPosts, Post } from '../../lib/posts';

export default async function Blog() {
  const posts: Post[] = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-playfair text-4xl md:text-5xl text-safariBrown text-center mb-4">
        Safari Blog
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Discover tips, guides, and stories about safaris in Kenya and Tanzania.
      </p>
      <ul className="space-y-8">
        {posts.map(({ slug, title, date, description, tags }) => (
          <li key={slug} className="border-b border-gray-200 pb-6">
            <Link href={`/blog/${slug}`} className="no-underline hover:text-safariGreen">
              <h2 className="font-play10 font-playfair text-2xl text-safariBrown mb-2">
                {title}
              </h2>
              <p className="text-gray-600 mb-2">{description}</p>
              <p className="text-sm text-gray-500">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const dynamic = 'force-static';