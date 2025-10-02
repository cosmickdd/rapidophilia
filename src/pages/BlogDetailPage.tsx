import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { blogPosts } from '../data/blogData';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <Layout>
        <Section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </Section>
      </Layout>
    );
  }

  // Get related posts (exclude current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="py-20 relative">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-purple-100">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Article Content */}
      <Section className="py-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Article Stats */}
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl mb-8">
              <div className="flex items-center space-x-6 text-gray-600">
                <span>👁️ {post.views} views</span>
                <span>💬 {post.comments} comments</span>
                <span>❤️ {post.likes} likes</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Like
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Share
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                } else if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                } else if (paragraph.startsWith('- **')) {
                  // Handle bulleted list items with bold headers
                  const items = paragraph.split('\n');
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2 mb-6">
                      {items.map((item, itemIdx) => {
                        if (item.startsWith('- **')) {
                          const match = item.match(/- \*\*(.*?)\*\*: (.*)/);
                          if (match) {
                            return (
                              <li key={itemIdx} className="text-gray-700">
                                <strong className="text-gray-900">{match[1]}</strong>: {match[2]}
                              </li>
                            );
                          }
                        }
                        return item.startsWith('- ') ? (
                          <li key={itemIdx} className="text-gray-700">
                            {item.replace('- ', '')}
                          </li>
                        ) : null;
                      })}
                    </ul>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-gray-700 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Ready for Your Next Adventure?</h3>
              <p className="mb-6 text-purple-100">
                Let Rapidophilia Travel help you create unforgettable memories and authentic experiences.
              </p>
              <Link to="/contact">
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Plan Your Journey
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section background="gray" className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, idx) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      to={`/blog/${relatedPost.id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Section>
      )}
    </Layout>
  );
};

export default BlogDetailPage;