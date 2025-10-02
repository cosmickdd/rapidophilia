import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Section from '../components/common/Section';
import { blogPosts } from '../data/blogData';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All Posts');

  // Get all unique tags
  const allTags = ['All Posts', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  // Filter posts based on search and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All Posts' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <Section background="gradient" className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800"></div>
        <div className="relative z-10 container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            Travel Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
          >
            Discover inspiring stories, travel tips, and adventure guides from our journeys around the world
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <span className="inline-block px-6 py-3 bg-white bg-opacity-20 text-white rounded-full font-medium">
              {blogPosts.length} Articles Available
            </span>
          </motion.div>
        </div>
      </Section>

      {/* Filter Section */}
      <Section className="py-16 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col gap-8">
            {/* Search */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search articles by title, content, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Tag Filter */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Filter by Category</h3>
              <div className="flex flex-wrap gap-3 justify-center max-w-4xl">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {tag}
                    {selectedTag === tag && (
                      <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Summary */}
            {(searchTerm || selectedTag !== 'All Posts') && (
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {selectedTag !== 'All Posts' && (
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Category: {selectedTag}
                    <button
                      onClick={() => setSelectedTag('All Posts')}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('All Posts');
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Blog Posts */}
      <Section className="py-20 bg-gray-50">
        <div className="container-custom">
          {/* Results Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedTag === 'All Posts' ? 'Latest Articles' : `${selectedTag} Articles`}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Articles Found</h3>
              <p className="text-gray-500 text-lg mb-8">
                Try adjusting your search terms or browse all articles.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('All Posts');
                }}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                View All Articles
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="h-56 overflow-hidden relative group flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white bg-opacity-90 text-purple-700 text-xs font-bold rounded-full">
                        {post.tags[0]}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(1, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-purple-600 transition-colors cursor-pointer flex-shrink-0">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      {/* Author and Date */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {post.author.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium truncate">{post.author}</span>
                        </div>
                        <span className="whitespace-nowrap">{post.date}</span>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <span className="font-medium">{post.readTime}</span>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <span>👁️</span>
                            <span>{post.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>{post.comments}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>❤️</span>
                            <span>{post.likes}</span>
                          </span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-block w-full text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300 font-semibold transform hover:scale-105"
                      >
                        Read Full Article →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default BlogPage;