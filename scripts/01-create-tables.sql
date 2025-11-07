-- Create the database schema for AIX Influencer Platform

-- Categories/Niches table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Influencers table
CREATE TABLE IF NOT EXISTS influencers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  bio TEXT,
  profile_image_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  
  -- Social Media Metrics
  instagram_followers INTEGER DEFAULT 0,
  instagram_engagement_rate DECIMAL(5,2) DEFAULT 0,
  instagram_handle VARCHAR(100),
  
  tiktok_followers INTEGER DEFAULT 0,
  tiktok_engagement_rate DECIMAL(5,2) DEFAULT 0,
  tiktok_handle VARCHAR(100),
  
  youtube_subscribers INTEGER DEFAULT 0,
  youtube_engagement_rate DECIMAL(5,2) DEFAULT 0,
  youtube_handle VARCHAR(100),
  
  twitter_followers INTEGER DEFAULT 0,
  twitter_engagement_rate DECIMAL(5,2) DEFAULT 0,
  twitter_handle VARCHAR(100),
  
  -- Demographics
  age INTEGER,
  gender VARCHAR(20),
  location VARCHAR(255),
  country VARCHAR(100),
  
  -- Performance Metrics
  avg_views INTEGER DEFAULT 0,
  avg_likes INTEGER DEFAULT 0,
  avg_comments INTEGER DEFAULT 0,
  brand_safety_score DECIMAL(3,1) DEFAULT 0, -- 0-10 scale
  authenticity_score DECIMAL(3,1) DEFAULT 0, -- 0-10 scale
  
  -- Pricing
  post_rate DECIMAL(10,2),
  story_rate DECIMAL(10,2),
  video_rate DECIMAL(10,2),
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands table (for future authentication)
CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  company VARCHAR(255),
  industry VARCHAR(100),
  website VARCHAR(255),
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Influencer tags for better categorization
CREATE TABLE IF NOT EXISTS influencer_tags (
  id SERIAL PRIMARY KEY,
  influencer_id INTEGER REFERENCES influencers(id) ON DELETE CASCADE,
  tag VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_influencers_category ON influencers(category_id);
CREATE INDEX IF NOT EXISTS idx_influencers_followers ON influencers(instagram_followers DESC);
CREATE INDEX IF NOT EXISTS idx_influencers_engagement ON influencers(instagram_engagement_rate DESC);
CREATE INDEX IF NOT EXISTS idx_influencers_location ON influencers(location);
CREATE INDEX IF NOT EXISTS idx_influencer_tags_influencer ON influencer_tags(influencer_id);
CREATE INDEX IF NOT EXISTS idx_influencer_tags_tag ON influencer_tags(tag);
