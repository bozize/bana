import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostSlugs } from '../../../lib/posts';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
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
    console.error(`Metadata error for slug ${slug}:`, err);
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function Post({ params }) {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
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
        <div className="prose prose-lg prose-safariGreen max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="text-safariGreen underline hover:text-safariBrown"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt, title }) => (
                <figure className="my-4">
                  <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-md"
                    layout="responsive"
                  />
                  {title && <figcaption className="text-sm text-gray-500 mt-2 text-center">{title}</figcaption>}
                </figure>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering post ${slug}:`, error);
    notFound();
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs;
}

export const dynamic = 'force-static';



