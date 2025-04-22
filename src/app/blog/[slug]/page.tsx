import { getAllPostSlugs, getPostData } from '../../../lib/posts';
import type { Post } from '../../../lib/posts';

import { notFound } from 'next/navigation';

export default async function Post({ params }: { params: { slug: string } }) {
  try {
    const post: Post = await getPostData(params.slug);

    return (
      <>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-playfair text-4xl md:text-5xl text-safariBrown mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div
            className="prose prose-lg prose-safariGreen max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export const dynamic = 'force-static';