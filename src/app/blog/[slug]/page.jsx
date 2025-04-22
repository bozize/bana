import { getAllPostSlugs, getPostData } from '../../../lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  try {
    const post = await getPostData(params.slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
      },
    };
  } catch (err) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function Post({ params }) {
  try {
    const post = await getPostData(params.slug);

    return (
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
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((item) => ({
    slug: item.params.slug,
  }));
}

export const dynamic = 'force-static';



