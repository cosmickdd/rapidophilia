import { lazy } from 'react';

// Lazy load pages for better performance
export const HomePage = lazy(() => import('../pages/HomePage'));
export const AboutPage = lazy(() => import('../pages/AboutPage'));
export const TrekPage = lazy(() => import('../pages/TrekPage'));
export const TrekDetailPage = lazy(() => import('../pages/TrekDetailPage'));
export const AdventurePage = lazy(() => import('../pages/AdventurePage'));
export const AdventureDetailPage = lazy(() => import('../pages/AdventureDetailPage'));
export const ExplorePage = lazy(() => import('../pages/ExplorePage'));
export const BlogPage = lazy(() => import('../pages/BlogPage'));
export const BlogDetailPage = lazy(() => import('../pages/BlogDetailPage'));
export const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
export const RefundPolicyPage = lazy(() => import('../pages/RefundPolicyPage'));
export const TermsOfUsePage = lazy(() => import('../pages/TermsOfUsePage'));